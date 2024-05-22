/*
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AttemptQuiz.css';

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
}

const AttemptQuiz: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { quiz } = location.state as { quiz: Quiz };

    const [answers, setAnswers] = useState<{ [key: string]: string }>({});

    const handleOptionChange = (questionId: string, selectedOption: string) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: selectedOption
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Submitted answers:', answers);
        // Handle the submission logic here, e.g., send answers to the backend
        navigate('/'); // Navigate back to the main page or show a result page
    };

    return (
        <div className="quiz-attempt ">
            <h2>{quiz.quizName}</h2>
            <p>{quiz.quizDescription}</p>
            <form onSubmit={handleSubmit}>
                {quiz.questions.map((question) => (
                    <div key={question.id} className="question-block">
                        <h3>{question.text}</h3>
                        {question.options.map((option, index) => (
                            <div className="form-check" key={index}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name={question.id}
                                    id={`${question.id}-${index}`}
                                    value={option}
                                    checked={answers[question.id] === option}
                                    onChange={() => handleOptionChange(question.id, option)}
                                />
                                <label className="form-check-label" htmlFor={`${question.id}-${index}`}>
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit Test</button>
            </form>
        </div>
    );
};

export default AttemptQuiz;
*/






import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AttemptQuiz.css';

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
}

const AttemptQuiz: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { quiz } = location.state as { quiz: Quiz };

    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

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

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Submitted answers:', answers);
        // Handle the submission logic here, e.g., send answers to the backend
        navigate('/'); // Navigate back to the main page or show a result page
    };

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

