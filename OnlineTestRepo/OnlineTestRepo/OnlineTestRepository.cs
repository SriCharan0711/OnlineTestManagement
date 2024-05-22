using Common.Models;
using Microsoft.Azure.Cosmos;


namespace OnlineTestRepo.OnlineTestRepo
{
    public class OnlineTestRepository : IOnlineTestRepo
    {
        private readonly CosmosClient _cosmosclient;
        private const string DatabaseId = "ToDoList";
        private const string ContainerId = "Items";
        public OnlineTestRepository(CosmosClient cosmosClient)
        {
            _cosmosclient = cosmosClient;
        }
        public async Task<List<users>> GetUsers()
        {
            var container = _cosmosclient.GetContainer(DatabaseId, ContainerId);

            var query = "SELECT * FROM c";
            var queryDefinition = new QueryDefinition(query);
            var students = new List<users>();

            var resultSetIterator = container.GetItemQueryIterator<users>(queryDefinition);

            while (resultSetIterator.HasMoreResults)
            {
                var currentResultSet = await resultSetIterator.ReadNextAsync();
                students.AddRange(currentResultSet);
            }

            return students;
        }

       /* public async Task PostToDo(ToDo obj)
        {
            var container = _cosmosclient.GetContainer(DatabaseId, ContainerId);
            try
            {
                await container.CreateItemAsync(obj, new PartitionKey(obj.Id));
            }
            catch (CosmosException ex)
            {
                Console.WriteLine($"Error occurred: {ex.StatusCode} - {ex.Message}");
                // Handle exception as needed
            } 
        }*/



        /* public async Task<List<Student>> getstudentbyid(int id)
         {
             var container = _cosmosclient.GetContainer(DatabaseId, ContainerId);

             var query = "SELECT * FROM c WHERE c.sno = @StudentId";
             var queryDefinition = new QueryDefinition(query).WithParameter("@StudentId", id);
             var students = new List<Student>();

             var resultSetIterator = container.GetItemQueryIterator<Student>(queryDefinition);

             while (resultSetIterator.HasMoreResults)
             {
                 var currentResultSet = await resultSetIterator.ReadNextAsync();
                 students.AddRange(currentResultSet);
             }

             return students;
         }*/

    }

}