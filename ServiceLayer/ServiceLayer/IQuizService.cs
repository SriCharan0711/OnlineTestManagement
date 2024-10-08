﻿using System;
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
        public Task<List<Quiz>> GetQuiz(string facultyID);
        public Task<List<Quiz>> GetQuizByDepartment(string department);
        public Task DeleteQuiz(Quiz quizObj);
        public Task<Quiz> UpdateQuiz(Quiz quizObj);
        public Task<Quiz> GetQuizById(string quizId);
        public Task<List<QuizResult>> GetQuizResultsByStudentID(string studentID);
        public Task<QuizResult> SaveQuizResult(QuizResult quizResult);

    }
}
