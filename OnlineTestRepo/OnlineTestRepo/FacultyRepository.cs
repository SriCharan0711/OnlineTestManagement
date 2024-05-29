using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;
using Microsoft.Azure.Cosmos;

namespace OnlineTestRepo.OnlineTestRepo
{
    public class FacultyRepository:IFacultyRepository
    {
        private readonly CosmosClient _client;
        private readonly string DataBaseId = "OnlineTestDatabase";
        private readonly string ContainerId = "Faculty";
        public FacultyRepository(CosmosClient client)
        {
            _client = client;

        }
        public async Task<Faculty>RegisterFaculty(Faculty faculty)
        {
            var container = _client.GetContainer(DataBaseId, ContainerId);

            var response = await container.CreateItemAsync(faculty); //
            return response.Resource;
        }
        public async Task<Faculty> GetFacultyByCredentials(string facultyID, string emailID)
        {
            var container = _client.GetContainer(DataBaseId, ContainerId);

            var query = new QueryDefinition("SELECT * FROM c WHERE c.facultyID = @facultyID AND c.emailID = @EmailID")
                .WithParameter("@facultyID", facultyID)
                .WithParameter("@EmailID", emailID);

            var iterator = container.GetItemQueryIterator<Faculty>(query);

            while (iterator.HasMoreResults)
            {
                var response = await iterator.ReadNextAsync();
                var faculty = response.FirstOrDefault();
                if (faculty != null)
                {
                    return faculty;
                }
            }

            return null;
        }
    }
}
