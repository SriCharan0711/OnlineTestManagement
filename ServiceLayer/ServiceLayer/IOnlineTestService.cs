using Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.ServiceLayer
{
    public interface IOnlineTestService
    {
        public Task<List<users>> GetUsers();
      /*  public Task PostToDo(ToDo obj);*/
    }
}