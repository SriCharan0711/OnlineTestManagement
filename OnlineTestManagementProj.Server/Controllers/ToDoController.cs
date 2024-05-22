using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineTestRepo.OnlineTestRepo;
using Common.Models;

namespace OnlineTestManagementProj.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly IToDoRepository _ToDoRepository;
        public ToDoController(IToDoRepository ToDoRepository) {
            _ToDoRepository = ToDoRepository;
        }

        [HttpGet("getToDos")]
        public async Task<ActionResult<List<ToDo>>> GetToDo()
        {
          var todo= await _ToDoRepository.GetToDo();
            return Ok(todo);
        }

        [HttpGet("getToDoById/{id}")]
        public async Task<ActionResult<ToDo>>GetToDoById(string id)
        {
            var todo=await _ToDoRepository.GetToDoById(id);
            return Ok(todo);
        }

        [HttpPost("postToDo")]
        public async Task<ActionResult<ToDo>>PostToDo(ToDo toDoObj)
        {
            toDoObj.id=Guid.NewGuid().ToString();
            var createdToDo=await _ToDoRepository.PostToDo(toDoObj);
            return CreatedAtAction(nameof(GetToDoById), new { id = createdToDo.id }, createdToDo);
        }

        

    }
}
