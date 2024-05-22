using Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OnlineTestRepo.OnlineTestRepo;
namespace ServiceLayer.ServiceLayer
{
    public class QuizService:IQuizService
    {
        private readonly IQuizRepository _quizRepository;

        public QuizService(IQuizRepository quizRepository)
        {
            _quizRepository = quizRepository;
        }
        public async Task<Quiz> PostQuiz(Quiz quiz)
        {
           return await _quizRepository.PostQuiz(quiz);
        }

        public async Task<List<Quiz>>GetQuiz()
        {
            return await _quizRepository.GetQuiz();
        }
        public async Task DeleteQuiz(Quiz quizObj)
        {
             await _quizRepository.DeleteQuiz(quizObj);
        }

        public async Task<Quiz> UpdateQuiz(Quiz quizObj)
        {
            return await _quizRepository.UpdateQuiz(quizObj);
        }
    }
}
