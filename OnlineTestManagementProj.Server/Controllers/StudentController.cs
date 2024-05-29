using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Common.Models;
using ServiceLayer.ServiceLayer;

namespace OnlineTestManagementProj.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;
        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }
        [HttpPost("studentRegister")]
        public async Task<ActionResult<Student>> RegisterStudent([FromBody] Student student)
        {
            if (student == null || string.IsNullOrEmpty(student.name))
            {
                return BadRequest("Invalid student data");
            }
            student.id = Guid.NewGuid().ToString();
            student.studentID = Guid.NewGuid().ToString();
            student.password = BCrypt.Net.BCrypt.HashPassword(student.password);
            var createdStudent = await _studentService.RegisterStudent(student);

            return CreatedAtAction(nameof(RegisterStudent), new { id = createdStudent.id }, createdStudent);
        }

        [HttpPost("studentLogin")]
        public async Task<ActionResult<Student>> LoginStudent([FromBody] StudentLoginRequest loginRequest)
        {
            if (string.IsNullOrEmpty(loginRequest.rollNo) || string.IsNullOrEmpty(loginRequest.emailID) || string.IsNullOrEmpty(loginRequest.password))
            {
                return BadRequest("Invalid login data");
            }

            var student = await _studentService.GetStudentByCredentials(loginRequest.rollNo, loginRequest.emailID);

            if (student == null || !BCrypt.Net.BCrypt.Verify(loginRequest.password, student.password))
            {
                return Unauthorized("Invalid credentials");
            }

            return Ok(student);
        }
    }
    public class StudentLoginRequest
    {
        public string rollNo { get; set; }
        public string emailID { get; set; }
        public string password { get; set; }
    }
}




