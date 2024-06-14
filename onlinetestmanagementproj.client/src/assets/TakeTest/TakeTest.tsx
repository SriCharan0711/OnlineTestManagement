import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TakeTest.css';

interface Question {
    id: string;
    text: string;
    options: string[];
    correctOption: string;

}

interface Quiz {
    id: string;
    quizId: string;
    quizName: string;
    quizDescription: string;
    questions: Question[];
    FacultyID: string;
    facultyName: string;
    FacultyDepartment: string;
    TestDuration: string;
}

const TakeTest: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            const department =localStorage.getItem('department')
            try {
                const response = await axios.get(`https://localhost:7116/api/Quiz/getQuizByDepartment/${department}`);
                setQuizzes(response.data);
                console.log(response.data);
            } catch (error) {
                setErrorMessage('Error occurred while fetching quizzes.');
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    const handleAttemptQuiz = (quiz: Quiz) => {
        navigate('/student/attempt-quiz', { state: { quiz } });
    };

    return (
        <div className="quiz-list">
            <h2>Available Quizzes</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                    <div className="quiz-card" key={quiz.quizId}>
                        <h3>{quiz.quizName}</h3>
                        <p>{quiz.quizDescription}</p>
                        <button onClick={() => handleAttemptQuiz(quiz)} >Attempt Quiz</button>
                        <p>Posted By: {quiz.facultyName}</p>
                    </div>
                ))
            ) : (
                <p>No quizzes available.</p>
            )}
        </div>
    );
};

export default TakeTest;
