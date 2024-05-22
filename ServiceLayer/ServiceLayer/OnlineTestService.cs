using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceLayer;
using Common.Models;
using OnlineTestRepo.OnlineTestRepo;
namespace ServiceLayer.ServiceLayer
{
    public class OnlineTestService : IOnlineTestService
    {
        private readonly IOnlineTestRepo _userRepo;

        public OnlineTestService(IOnlineTestRepo userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<List<users>> GetUsers()
        {
            try
            {
                return await _userRepo.GetUsers();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occured in GetAllStudents Method:{ex.Message}");
                throw;
            }
        }

       /* public async Task PostToDo(ToDo obj)
        {
            try {
                await _userRepo.PostToDo(obj);
            }
            catch(Exception ex)
            {
                Console.WriteLine($"An error occurred in PostToDo method: {ex.Message}");
                throw;
            }
            
        }*/
        /*public async Task<Student> GetStudentById(int id)
        {
            try
            {
                return await _studentRepo.GetStudentById(id);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occured in GetStudentById method: {ex.Message}");
                throw;
            }
        }
        public async Task<string> DeleteStudentById(int id)
        {
            try
            {
                int rowsDeleted = await _studentRepo.DeleteStudentById(id);
                if (rowsDeleted > 0)
                {
                    return $"Student With Id={id} is deleted";
                }
                else
                {
                    return $"There is no Student with Id={id}";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occured in GetStudentById method: {ex.Message}");
                throw;
            }
        }

        public async Task<string> UpdateStudentById(Student std)
        {
            try
            {
                int rowsUpdated = await _studentRepo.UpdateStudentById(std);
                return $"Rows updated are {rowsUpdated}";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occured in UpdateStudentById: {ex.Message} ");
                throw;
            }
        }*/
    }
}