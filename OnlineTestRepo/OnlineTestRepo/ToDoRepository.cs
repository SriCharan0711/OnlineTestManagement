using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Cosmos;
namespace OnlineTestRepo.OnlineTestRepo
{
    public class ToDoRepository:IToDoRepository
    {
        private readonly CosmosClient _client;
        private readonly string DataBaseId="ToDoList";
        private readonly string ContainerId="Items";

        public ToDoRepository(CosmosClient cosmosClient) {
            _client = cosmosClient;
        }
        public async Task<List<ToDo>>GetToDo()
        {
           var container=_client.GetContainer(DataBaseId, ContainerId);
            var query = "select * from c";
            var queryDefinition = new QueryDefinition(query);
            var todos = new List<ToDo>();

            var resultSetIterator = container.GetItemQueryIterator<ToDo>(queryDefinition);
            while(resultSetIterator.HasMoreResults)
            {
                var currentResultSet = await resultSetIterator.ReadNextAsync();
                todos.AddRange(currentResultSet);
            }
            return todos;
        }

        public async Task<ToDo> GetToDoById(string id)
        {
            var container = _client.GetContainer(DataBaseId, ContainerId);
            var query = $"SELECT * FROM c WHERE c.id = @id";
            var queryDefinition = new QueryDefinition(query).WithParameter("@id", id);

            var resultSetIterator = container.GetItemQueryIterator<ToDo>(queryDefinition);
            if (resultSetIterator.HasMoreResults)
            {
                var currentResultSet = await resultSetIterator.ReadNextAsync();
                if (currentResultSet.Any())
                {
                    return currentResultSet.First();
                }
            }

            return null; // Or throw an exception if not found
        }

        public async Task<ToDo> PostToDo(ToDo toDoObj)
        {
            var container=_client.GetContainer(DataBaseId, ContainerId);
            
            var response=await container.CreateItemAsync(toDoObj);
            return response.Resource;
          
        }

       
    }
}
