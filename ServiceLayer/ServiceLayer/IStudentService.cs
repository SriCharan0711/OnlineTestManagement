using Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.ServiceLayer
{
    public interface IStudentService
    {
        public Task<Student> RegisterStudent(Student student);
        public Task<Student> GetStudentByCredentials(string rollNo, string emailID);
    }
}
