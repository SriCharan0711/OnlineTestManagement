using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;

namespace OnlineTestRepo.OnlineTestRepo
{
    public interface IQuizRepository
    {
        public Task<Quiz> PostQuiz(Quiz quiz);
        public Task<List<Quiz>> GetQuiz();
        public Task DeleteQuiz(Quiz quizObj);
        public Task<Quiz> UpdateQuiz(Quiz quizObj);
    }
}
