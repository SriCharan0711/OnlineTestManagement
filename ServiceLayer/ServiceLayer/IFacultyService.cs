using Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.ServiceLayer
{
    public interface IFacultyService
    {
        public Task<Faculty> RegisterFaculty(Faculty faculty);
        public Task<Faculty> GetFacultyByCredentials(string facultyID, string emailID);
    }
}
