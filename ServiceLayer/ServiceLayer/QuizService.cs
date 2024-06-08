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

        public async Task<List<Quiz>>GetQuiz(string facultyID)
        {
            return await _quizRepository.GetQuiz(facultyID);
        }

        public async Task<List<Quiz>>GetQuizByDepartment(string department)
        {
            return await _quizRepository.GetQuizByDepartment(department);
        }
        public async Task DeleteQuiz(Quiz quizObj)
        {
             await _quizRepository.DeleteQuiz(quizObj);
        }

        public async Task<Quiz> UpdateQuiz(Quiz quizObj)
        {
            return await _quizRepository.UpdateQuiz(quizObj);
        }

        public async Task<Quiz> GetQuizById(string quizId)
        {
            return await _quizRepository.GetQuizById(quizId);
        }

        public async Task<List<QuizResult>>GetQuizResultsByStudentID(string studentID)
        {
            return await _quizRepository.GetQuizResultsByStudentID(studentID);
        }
        public async Task<QuizResult>SaveQuizResult(QuizResult quizResult)
        {
            return await _quizRepository.SaveQuizResult(quizResult);
        }
    }
}
