using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OnlineTestRepo.OnlineTestRepo;
using Common.Models;

namespace ServiceLayer.ServiceLayer
{
    public class StudentService:IStudentService
    {
        private readonly IStudentRepository _studentRepository;
        public StudentService(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }   
        public async Task<Student>RegisterStudent(Student student)
        {
            return await _studentRepository.RegisterStudent(student);
        }
        public async Task<Student> GetStudentByCredentials(string rollNo, string emailID)
        {
            return await _studentRepository.GetStudentByCredentials(rollNo, emailID);
        }
    }
}
