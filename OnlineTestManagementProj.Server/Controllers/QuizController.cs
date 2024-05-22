using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Common.Models;
using ServiceLayer.ServiceLayer;

namespace OnlineTestManagementProj.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly IQuizService _quizService;

        public QuizController(IQuizService quizService)
        {
            _quizService = quizService;
        }


        [HttpPost("postQuiz")]
        public async Task<ActionResult<Quiz>>PostQuiz([FromBody]Quiz quiz)
        {
            if (quiz == null || string.IsNullOrEmpty(quiz.QuizName) || quiz.Questions == null || !quiz.Questions.Any())
            {
                return BadRequest("Invalid quiz data");
            }
            quiz.QuizId = Guid.NewGuid().ToString();
            quiz.id = Guid.NewGuid().ToString();
            var createdQuiz = await _quizService.PostQuiz(quiz);
           
            return CreatedAtAction(nameof(PostQuiz), new { id = createdQuiz.id }, createdQuiz);
        }

        [HttpGet("getQuiz")]
        public async Task<ActionResult<List<Quiz>>>GetQuiz()
        {
            var quiz=await _quizService.GetQuiz();
            return Ok(quiz);    
        }

        [HttpDelete("deleteQuiz/{id}/{quizId}")]
        public async Task<ActionResult> DeleteQuiz(string id, string quizId)
        {
            if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(quizId))
            {
                return BadRequest("Invalid quiz ID or partition key.");
            }

            var quizObj = new Quiz { id = id, QuizId = quizId };
            await _quizService.DeleteQuiz(quizObj);
            return NoContent();
        }

        [HttpPut("updateQuiz")]
        public async Task<ActionResult<Quiz>>UpdateQuiz(Quiz quizObj)
        {
            var updatedQuiz = await _quizService.UpdateQuiz(quizObj);
            return Ok(updatedQuiz); 
        }
    }
}
