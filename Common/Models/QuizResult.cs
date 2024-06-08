using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Models
{
    public class QuizResult
    {
        public string id { get; set; }
        public string StudentID { get; set; }
        public string QuizID { get; set; }
        public string QuizName {  get; set; }
        public int TotalQuestions { get; set; }
        public int CorrectAnswers { get; set; }
        public double Score { get; set; }
        public DateTime AttemptDate { get; set; }
        public Dictionary<string, string> SubmittedAnswers { get; set; }
    }
}
