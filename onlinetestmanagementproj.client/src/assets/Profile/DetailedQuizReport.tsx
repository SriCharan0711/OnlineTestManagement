// DetailedQuizReport.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Quiz {
    id: string;
    questions: Question[];
}

interface Question {
    id: string;
    text: string;
    options: string[];
    correctOption: string;
}

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

const DetailedQuizReport: React.FC = () => {
    const { quizID } = useParams<{ quizID: string }>();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
    const studentID = localStorage.getItem('studentID');

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const quizResponse = await axios.get(`https://localhost:7116/api/Quiz/getQuizById/${quizID}`);
                setQuiz(quizResponse.data);
                const resultResponse = await axios.get(`https://localhost:7116/api/Quiz/getQuizResults/${studentID}`);
                const result = resultResponse.data.find((res: QuizResult) => res.quizID === quizID);
                setQuizResult(result);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

        fetchQuizData();
    }, [quizID, studentID]);

    if (!quiz || !quizResult) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Quiz Report: {quizResult.quizName}</h2>
            <ul className="list-group mt-5">
                {quiz.questions.map((question, index) => (
                    <li key={question.id} className="list-group-item">
                        <p><strong>Question {index + 1}:</strong> {question.text}</p>
                        <ul>
                            {question.options.map((option, idx) => {
                                const optionLetter = String.fromCharCode(65 + idx);
                                const isCorrect = option === question.options[question.correctOption.charCodeAt(0) - 65];
                                const isSubmitted = quizResult.submittedAnswers[question.id] === option;
                                const optionClass = isCorrect ? 'text-success' : isSubmitted ? 'text-danger' : '';

                                return (
                                    <li key={idx} className={optionClass}>
                                        {optionLetter}: {option} {isSubmitted && !isCorrect && "(Submitted)"}
                                    </li>
                                );
                            })}
                        </ul>
                        {quizResult.submittedAnswers[question.id] === question.options[question.correctOption.charCodeAt(0) - 65] ? (
                            <p className="text-success">Correct</p>
                        ) : (
                            <p className="text-danger">Incorrect</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DetailedQuizReport;
