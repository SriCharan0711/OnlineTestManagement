/*
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AttemptQuiz.css';
import axios from 'axios';

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
    FacultyDepartment: string;
}

interface QuizResult {
    id: string;
    studentID: string;
    quizID: string;
    quizName: string;
    totalQuestions: number;
    correctAnswers: number;
    score: number;
    attemptdate: string;
}

const AttemptQuiz: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { quiz } = location.state as { quiz: Quiz };

    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

    const handleOptionChange = (questionId: string, selectedOption: string) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: selectedOption
        }));
    };

    const handleSaveAndNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

    const handleQuestionNavigation = (index: number) => {
        setCurrentQuestionIndex(index);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Submitted answers:', answers);

        try {
            const response = await axios.post('https://localhost:7116/api/Quiz/submitQuiz', {
                quizId: quiz.quizId,
                quizName: quiz.quizName,
                studentID: localStorage.getItem('studentID'),
                answers: answers
            });
            
            setQuizResult(response.data);
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    if (quizResult) {
        return (
            <div className="quiz-result container mt-5">
                <h2>Quiz Result</h2>
                <p>Total Questions: {quizResult.totalQuestions}</p>
                <p>Correct Answers: {quizResult.correctAnswers}</p>
                <p>Score: {quizResult.score}%</p>
                <button className="btn btn-primary" onClick={() => navigate('/student/taketest')}>Back to Tests</button>
            </div>
        );
    }

    return (
        <div className="quiz-attempt container mt-5">
            <h2>{quiz.quizName}</h2>
            <p>{quiz.quizDescription}</p>
            <div className="row">
                <div className="col-md-9 question-content p-3">
                    <form onSubmit={handleSubmit}>
                        <div className="question-block">
                            <h3>{currentQuestionIndex + 1}: {quiz.questions[currentQuestionIndex].text}</h3>
                            {quiz.questions[currentQuestionIndex].options.map((option, index) => (
                                <div className="form-check" key={index}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={quiz.questions[currentQuestionIndex].id}
                                        id={`${quiz.questions[currentQuestionIndex].id}-${index}`}
                                        value={option}
                                        checked={answers[quiz.questions[currentQuestionIndex].id] === option}
                                        onChange={() => handleOptionChange(quiz.questions[currentQuestionIndex].id, option)}
                                    />
                                    <label className="form-check-label" htmlFor={`${quiz.questions[currentQuestionIndex].id}-${index}`}>
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="navigation-buttons mt-3">
                            {currentQuestionIndex < quiz.questions.length - 1 && (
                                <button className="btn btn-primary" type="button" onClick={handleSaveAndNext}>Save and Next</button>
                            )}
                            {currentQuestionIndex === quiz.questions.length - 1 && (
                                <button className="btn btn-success" type="submit">Submit Test</button>
                            )}
                        </div>
                    </form>
                </div>
                <div className="col-md-3 question-navigation">
                    <h3>Questions</h3>
                    <ul className="list-group">
                        {quiz.questions.map((_, index) => (
                            <li key={index} className="list-group-item">
                                <button
                                    className={`btn btn-link question-nav-button ${index === currentQuestionIndex ? 'active' : ''}`}
                                    onClick={() => handleQuestionNavigation(index)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AttemptQuiz;
*/
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AttemptQuiz.css';
import axios from 'axios';

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
    FacultyDepartment: string;
}

interface QuizResult {
    id: string;
    studentID: string;
    quizID: string;
    quizName: string;
    totalQuestions: number;
    correctAnswers: number;
    score: number;
    attemptdate: string;
}

const AttemptQuiz: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { quiz } = location.state as { quiz: Quiz };

    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(60 * 5); // 5 minutes timer
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

    useEffect(() => {
        if (timeLeft === 0) {
            handleSubmit();
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(document.fullscreenElement !== null);
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);

    const handleOptionChange = (questionId: string, selectedOption: string) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: selectedOption
        }));
    };

    const handleSaveAndNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

    const handleQuestionNavigation = (index: number) => {
        setCurrentQuestionIndex(index);
    };

    const handleSubmit = async (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        console.log('Submitted answers:', answers);

        try {
            const response = await axios.post('https://localhost:7116/api/Quiz/submitQuiz', {
                quizId: quiz.quizId,
                quizName: quiz.quizName,
                studentID: localStorage.getItem('studentID'),
                answers: answers
            });

            setQuizResult(response.data);
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    const handleEnableFullScreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
            elem.msRequestFullscreen();
        }
    };

    if (quizResult) {
        return (
            <div className="quiz-result container mt-5">
                <h2>Quiz Result</h2>
                <p>Total Questions: {quizResult.totalQuestions}</p>
                <p>Correct Answers: {quizResult.correctAnswers}</p>
                <p>Score: {quizResult.score}%</p>
                <button className="btn btn-primary" onClick={() => navigate('/student/taketest')}>Back to Tests</button>
            </div>
        );
    }

    if (!isFullScreen) {
        return (
            <div className="enable-fullscreen container mt-5">
                <h2>Please enable full screen mode to start the quiz</h2>
                <button className="btn btn-primary" onClick={handleEnableFullScreen}>Enable Full Screen</button>
            </div>
        );
    }

    return (
        <div className="quiz-attempt container mt-5">
            <h2>{quiz.quizName}</h2>
            <p>{quiz.quizDescription}</p>
            <div className="timer">
                Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
            </div>
            <div className="row">
                <div className="col-md-9 question-content p-3">
                    <form onSubmit={handleSubmit}>
                        <div className="question-block">
                            <h3>{currentQuestionIndex + 1}: {quiz.questions[currentQuestionIndex].text}</h3>
                            {quiz.questions[currentQuestionIndex].options.map((option, index) => (
                                <div className="form-check" key={index}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={quiz.questions[currentQuestionIndex].id}
                                        id={`${quiz.questions[currentQuestionIndex].id}-${index}`}
                                        value={option}
                                        checked={answers[quiz.questions[currentQuestionIndex].id] === option}
                                        onChange={() => handleOptionChange(quiz.questions[currentQuestionIndex].id, option)}
                                    />
                                    <label className="form-check-label" htmlFor={`${quiz.questions[currentQuestionIndex].id}-${index}`}>
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="navigation-buttons mt-3">
                            {currentQuestionIndex < quiz.questions.length - 1 && (
                                <button className="btn btn-primary" type="button" onClick={handleSaveAndNext}>Save and Next</button>
                            )}
                            {currentQuestionIndex === quiz.questions.length - 1 && (
                                <button className="btn btn-success" type="submit">Submit Test</button>
                            )}
                        </div>
                    </form>
                </div>
                <div className="col-md-3 question-navigation">
                    <h3>Questions</h3>
                    <ul className="list-group">
                        {quiz.questions.map((_, index) => (
                            <li key={index} className="list-group-item">
                                <button
                                    className={`btn btn-link question-nav-button ${index === currentQuestionIndex ? 'active' : ''}`}
                                    onClick={() => handleQuestionNavigation(index)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AttemptQuiz;
