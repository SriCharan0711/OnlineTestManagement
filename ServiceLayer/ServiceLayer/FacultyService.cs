using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;
using OnlineTestRepo.OnlineTestRepo;

namespace ServiceLayer.ServiceLayer
{
    public class FacultyService:IFacultyService
    {
        private readonly IFacultyRepository _facultyRepository;
        public FacultyService(IFacultyRepository facultyRepository)
        {
            _facultyRepository = facultyRepository;
        }
        public async Task<Faculty>RegisterFaculty(Faculty faculty)
        {
            return await _facultyRepository.RegisterFaculty(faculty);
        }
        public async Task<Faculty> GetFacultyByCredentials(string facultyID, string emailID)
        {
            return await _facultyRepository.GetFacultyByCredentials(facultyID, emailID);
        }
    }
}
