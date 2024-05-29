using Microsoft.Azure.Cosmos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;

namespace OnlineTestRepo.OnlineTestRepo
{
    public class StudentRepository:IStudentRepository
    {
        private readonly CosmosClient _client;
        private readonly string DataBaseId = "OnlineTestDatabase";
        private readonly string ContainerId = "Student";
        public StudentRepository(CosmosClient client)
        {
            _client = client;
            
        }
        public async Task<Student> RegisterStudent(Student student)
        {
            var container = _client.GetContainer(DataBaseId, ContainerId);

            var response = await container.CreateItemAsync(student); //
            return response.Resource;
        }

        public async Task<Student> GetStudentByCredentials(string rollNo, string emailID)
        {
            var container = _client.GetContainer(DataBaseId, ContainerId);

            var query = new QueryDefinition("SELECT * FROM c WHERE c.rollNo = @RollNo AND c.emailID = @EmailID")
                .WithParameter("@RollNo", rollNo)
                .WithParameter("@EmailID", emailID);

            var iterator = container.GetItemQueryIterator<Student>(query);

            while (iterator.HasMoreResults)
            {
                var response = await iterator.ReadNextAsync();
                var student = response.FirstOrDefault();
                if (student != null)
                {
                    return student;
                }
            }

            return null;
        }
    }
}
