using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Common.Models;
using ServiceLayer.ServiceLayer;

namespace OnlineTestManagementProj.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacultyController : ControllerBase
    {
        private readonly IFacultyService _facultyService;
        public FacultyController(IFacultyService facultyService)
        {
            _facultyService = facultyService;
        }
        [HttpPost("facultyRegister")]
        public async Task<ActionResult<Faculty>>RegisterFaculty(Faculty faculty)
        {
            if (faculty == null || string.IsNullOrEmpty(faculty.name))
            {
                return BadRequest("Invalid student data");
            }
            faculty.id = Guid.NewGuid().ToString();
            faculty.password = BCrypt.Net.BCrypt.HashPassword(faculty.password);
            var createdFaculty = await _facultyService.RegisterFaculty(faculty);

            return CreatedAtAction(nameof(RegisterFaculty), new { id = createdFaculty.id }, createdFaculty);
        }

        [HttpPost("facultyLogin")]
        public async Task<ActionResult<Faculty>> LoginFaculty([FromBody] LoginCredentials loginRequest)
        {
            if (string.IsNullOrEmpty(loginRequest.facultyID) || string.IsNullOrEmpty(loginRequest.emailID) || string.IsNullOrEmpty(loginRequest.password))
            {
                return BadRequest("Invalid login data");
            }

            var faculty = await _facultyService.GetFacultyByCredentials(loginRequest.facultyID, loginRequest.emailID);

            if (faculty == null || !BCrypt.Net.BCrypt.Verify(loginRequest.password, faculty.password))
            {
                return Unauthorized("Invalid credentials");
            }

            return Ok(faculty);
        }
    }
    public class LoginCredentials
    {
        public string facultyID { get; set; }
        public string emailID { get; set; }
        public string password { get; set; }
    }
}
