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

        [HttpGet("getQuiz/{facultyID}")]
        public async Task<ActionResult<List<Quiz>>>GetQuiz(string facultyID)
        {
            var quiz=await _quizService.GetQuiz(facultyID);
            return Ok(quiz);    
        }

        [HttpGet("getQuizByDepartment/{department}")]
        public async Task<ActionResult<List<Quiz>>> GetQuizByDepartment(string department)
        {
            var quiz = await _quizService.GetQuizByDepartment(department);
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

        [HttpPost("submitQuiz")]
        public async Task<ActionResult<QuizResult>> SubmitQuiz([FromBody] QuizSubmission submission)
        {
            if (submission == null || string.IsNullOrEmpty(submission.QuizId) || string.IsNullOrEmpty(submission.StudentID) || submission.Answers == null || !submission.Answers.Any())
            {
                return BadRequest("Invalid submission data");
            }

            var quiz = await _quizService.GetQuizById(submission.QuizId);
            if (quiz == null)
            {
                return NotFound("Quiz not found");
            }

            var result = CalculateResult(quiz, submission);

            await _quizService.SaveQuizResult(result);

            return Ok(result);
        }

        private QuizResult CalculateResult(Quiz quiz, QuizSubmission submission)
        {
            int totalQuestions = quiz.Questions.Count;
            int correctAnswers = 0;

            foreach (var question in quiz.Questions)
            {
                if (submission.Answers.TryGetValue(question.Id, out var submittedAnswer))
                {
                    if (question.Options[question.CorrectOption[0] - 'A'] == submittedAnswer)
                    {
                        correctAnswers++;
                    }
                }
            }

            return new Common.Models.QuizResult
            {
                id = Guid.NewGuid().ToString(),
                StudentID = submission.StudentID,
                QuizID = submission.QuizId,
                QuizName = submission.QuizName,
                TotalQuestions = totalQuestions,
                CorrectAnswers = correctAnswers,
                Score = ((double)correctAnswers / totalQuestions) * 100,
                AttemptDate = DateTime.UtcNow,
                SubmittedAnswers = submission.Answers
            };
        }

        [HttpGet("getQuizResults/{studentID}")]
        public async Task<ActionResult<List<QuizResult>>> GetQuizResults(string studentID)
        {
            var results = await _quizService.GetQuizResultsByStudentID(studentID);
            return Ok(results);
        }

    }
    public class QuizSubmission
    {
        public string QuizId { get; set; }
        public string QuizName {  get; set; }
        public string StudentID { get; set; }
        public Dictionary<string, string> Answers { get; set; }
    }

   

}

