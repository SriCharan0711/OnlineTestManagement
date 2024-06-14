using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Models
{
    public class Quiz
    {
        public string id { get; set; }
        public string QuizId { get; set; }  //partition key
        public string QuizName { get; set; }
        public string QuizDescription { get; set;}
        public List<Question> Questions { get; set; }
        public string FacultyID { get; set; }
        public string FacultyDepartment {  get; set; }
        public string TestDuration {  get; set; }

    }
    public class Question
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public List<string> Options { get; set; }
        public string CorrectOption { get; set; }
    }

}
