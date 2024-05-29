using Common.Models;
using Microsoft.Azure.Cosmos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineTestRepo.OnlineTestRepo
{
    public class QuizRepository:IQuizRepository
    {
        private readonly CosmosClient _client;
        private readonly string DataBaseId = "OnlineTestDatabase";
        private readonly string ContainerId = "Quiz";

        public QuizRepository(CosmosClient cosmosClient)
        {
            _client = cosmosClient;
        }
        public async Task<Quiz> PostQuiz(Quiz quiz)
        {
            var container = _client.GetContainer(DataBaseId, ContainerId);

            var response = await container.CreateItemAsync(quiz); //
            return response.Resource;
        }

        public async Task<List<Quiz>> GetQuiz(string facultyID)
        {
            var container = _client.GetContainer(DataBaseId, ContainerId);
            var query = $"select * from c where c.FacultyID=@facultyID";
            var queryDefinition = new QueryDefinition(query).WithParameter("@facultyID",facultyID);
            var quizes = new List<Quiz>();

            var resultSetIterator = container.GetItemQueryIterator<Quiz>(queryDefinition);
            while (resultSetIterator.HasMoreResults)
            {
                var currentResultSet = await resultSetIterator.ReadNextAsync();
                quizes.AddRange(currentResultSet);
            }
            return quizes;
        }

        public async Task<List<Quiz>> GetQuizByDepartment(string department)
        {
            var container = _client.GetContainer(DataBaseId, ContainerId);
            var query = $"select * from c where c.FacultyDepartment=@department";
            var queryDefinition = new QueryDefinition(query).WithParameter("@department", department);
            var quizes = new List<Quiz>();

            var resultSetIterator = container.GetItemQueryIterator<Quiz>(queryDefinition);
            while (resultSetIterator.HasMoreResults)
            {
                var currentResultSet = await resultSetIterator.ReadNextAsync();
                quizes.AddRange(currentResultSet);
            }
            return quizes;
        }

        public async Task DeleteQuiz(Quiz quizObj)
        {
            var container = _client.GetContainer(DataBaseId, ContainerId);
            await container.DeleteItemAsync<Quiz>(quizObj.id, new PartitionKey(quizObj.QuizId));
        }

        public async Task<Quiz> UpdateQuiz(Quiz quizObj)
        {
            var container = _client.GetContainer(DataBaseId, ContainerId);
            var response = await container.ReplaceItemAsync(quizObj, quizObj.id);
            return response.Resource;
        }

    }
}
