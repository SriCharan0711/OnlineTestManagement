using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;

namespace ServiceLayer.ServiceLayer
{
    public interface IQuizService
    {
        public Task<Quiz>PostQuiz(Quiz quiz);
        public  Task<List<Quiz>> GetQuiz();
        public Task DeleteQuiz(Quiz quizObj);
        public Task<Quiz> UpdateQuiz(Quiz quizObj);
    }
}
