using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using Common.Models;

namespace OnlineTestRepo.OnlineTestRepo
{
    public interface IToDoRepository
    {
        public Task<List<ToDo>> GetToDo();
        public Task<ToDo> GetToDoById(string id);
        public Task<ToDo> PostToDo(ToDo toDoObj);

        

    }
}
