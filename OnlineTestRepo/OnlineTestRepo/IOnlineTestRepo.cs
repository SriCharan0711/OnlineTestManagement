using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;
namespace OnlineTestRepo.OnlineTestRepo
{
    public interface IOnlineTestRepo
    {
        public Task<List<users>> GetUsers();
       /* public Task PostToDo(ToDo obj);*/
    }
}