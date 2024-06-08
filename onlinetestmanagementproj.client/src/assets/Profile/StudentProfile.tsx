import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface QuizResult {
    id: string;
    quizID: string;
    quizName: string;
    totalQuestions: number;
    correctAnswers: number;
    score: number;
    attemptDate: string;
    submittedAnswers: { [key: string]: string };
}

const StudentProfile: React.FC = () => {
    const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
    const studentID = localStorage.getItem('studentID'); 

    useEffect(() => {
        const fetchQuizResults = async () => {
            try {
                const response = await axios.get(`https://localhost:7116/api/Quiz/getQuizResults/${studentID}`);
                setQuizResults(response.data);
            } catch (error) {
                console.error('Error fetching quiz results:', error);
            }
        };

        fetchQuizResults();
    }, [studentID]);

    return (
        <div className="container mt-5">
            <h2>Student Profile</h2>
            <h3>Quiz Results</h3>
            <ul className="list-group">
                {quizResults.map(result => (
                    <li key={result.id} className="list-group-item">
                        <p>Quiz Name: {result.quizName}</p>
                        <p>Total Questions: {result.totalQuestions}</p>
                        <p>Correct Answers: {result.correctAnswers}</p>
                        <p>Score: {result.score}%</p>
                        <p>Attempted Date: {new Date(result.attemptDate).toLocaleString()}</p>
                        <button className="btn btn-primary" onClick={() => console.log(`Viewing report for quiz ID: ${result.quizID}`)}>
                            View Report
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentProfile;
