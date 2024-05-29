
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Test.css';

interface Question {
    Id: string;
    Text: string;
    Options: string[];
    CorrectOption: string;
}

interface Quiz {
    id: string;
    QuizId: string;
    QuizName: string;
    QuizDescription: string;
    Questions: Question[];
    FacultyID: string;
}

const Test: React.FC = () => {
    const [quiz, setQuiz] = useState<Quiz>({
        id: '',
        QuizId: '',
        QuizName: '',
        QuizDescription: '',
        Questions: [{ Id: '1', Text: '', Options: ['', '', '', ''], CorrectOption: '' }],
        FacultyID:''
    });
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const facultyID = localStorage.getItem('facultyID') || '';
        console.log(facultyID);
        setQuiz(prevQuiz => ({ ...prevQuiz, FacultyID: facultyID }));
    }, []);


    const handleQuizChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setQuiz(prevQuiz => ({ ...prevQuiz, [name]: value }));
    };

    const handleQuestionChange = (index: number, text: string) => {
        const newQuestions: Question[] = [...quiz.Questions];
        newQuestions[index].Text = text;
        setQuiz(prevQuiz => ({ ...prevQuiz, Questions: newQuestions }));
    };

    const handleOptionChange = (index: number, optionIndex: number, text: string) => {
        const newQuestions: Question[] = [...quiz.Questions];
        newQuestions[index].Options[optionIndex] = text;
        setQuiz(prevQuiz => ({ ...prevQuiz, Questions: newQuestions }));
    };

    const handleCorrectOptionChange = (index: number, correctOption: string) => {
        const newQuestions: Question[] = [...quiz.Questions];
        newQuestions[index].CorrectOption = correctOption;
        setQuiz(prevQuiz => ({ ...prevQuiz, Questions: newQuestions }));
    };

    const addQuestion = () => {
        const isValid = quiz.Questions.every(question => question.Text.trim() !== '' && question.Options.every(option => option.trim() !== ''));
        if (isValid) {
            setQuiz(prevQuiz => ({
                ...prevQuiz,
                Questions: [
                    ...prevQuiz.Questions,
                    { Id: (prevQuiz.Questions.length + 1).toString(), Text: '', Options: ['', '', '', ''], CorrectOption: '' }
                ]
            }));
            setErrorMessage('');
        } else {
            const emptyQuestionIndex = quiz.Questions.findIndex(question => question.Text.trim() === '');
            if (emptyQuestionIndex !== -1) {
                setErrorMessage('Enter a valid question.');
            } else {
                const emptyOptionIndex = quiz.Questions.findIndex(question => question.Options.some(option => option.trim() === ''));
                if (emptyOptionIndex !== -1) {
                    setErrorMessage(`Enter a valid option for question ${emptyOptionIndex + 1}.`);
                }
            }
        }
    };

    const removeQuestion = (index: number) => {
        const newQuestions: Question[] = [...quiz.Questions];
        newQuestions.splice(index, 1);
        // Update IDs to maintain sequence
        newQuestions.forEach((question, i) => {
            question.Id = (i + 1).toString();
        });
        setQuiz(prevQuiz => ({ ...prevQuiz, Questions: newQuestions }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            console.log(quiz);
            const response = await axios.post('https://localhost:7116/api/Quiz/postQuiz', quiz);
            console.log('Quiz posted successfully:', response.data);
            toast.success('Quiz posted successfully!', {
                onClose: () => navigate('/faculty'),
                transition: Slide
            });
        } catch (error) {
            setErrorMessage('Error occurred while posting quiz.');
            console.error('Error posting quiz:', error);
            toast.error('Error occurred while posting quiz.');
        }
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <form className="test-form" onSubmit={handleSubmit}>
                <div className="quiz-details ">
                    <label className="quiz-label">Quiz Name</label>
                    <input
                        type="text"
                        name="QuizName"
                        value={quiz.QuizName}
                        onChange={handleQuizChange}
                        required
                    />
                    <label className="quiz-label">Quiz Description</label>
                    <textarea
                        name="QuizDescription"
                        value={quiz.QuizDescription}
                        onChange={handleQuizChange}
                        required
                    />
                </div>
                {quiz.Questions.map((question, index) => (
                    <div className="question-container" key={index}>
                        <label className="question-label">Question {index + 1}</label>
                        <textarea
                            className="question-input"
                            value={question.Text}
                            rows={3}
                            onChange={(e) => handleQuestionChange(index, e.target.value)}
                        />
                        <br />
                        {question.Options.map((option, optionIndex) => (
                            <div className="option-container" key={optionIndex}>
                                <label className="option-label">Option {String.fromCharCode(65 + optionIndex)}</label>
                                <input
                                    className="option-input"
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                />
                                {question.CorrectOption === String.fromCharCode(65 + optionIndex) && <span className="correct-option"> (Correct)</span>}
                                <br />
                            </div>
                        ))}
                        <label className="correct-option-label">Select correct option:</label>
                        <select
                            className="correct-option-select"
                            value={question.CorrectOption}
                            onChange={(e) => handleCorrectOptionChange(index, e.target.value)}
                        >
                            <option value="" disabled>Choose an option</option>
                            {question.Options.map((_option, optionIndex) => (
                                <option key={optionIndex} value={String.fromCharCode(65 + optionIndex)}>
                                    {String.fromCharCode(65 + optionIndex)}
                                </option>
                            ))}
                        </select>
                        <button className="remove-question-btn" type="button" onClick={() => removeQuestion(index)}>
                            Remove Question
                        </button>
                    </div>
                ))}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button className="add-question-btn" type="button" onClick={addQuestion}>
                    Add Question
                </button>
                <button className="submit-btn" type="submit">Create Test</button>
            </form>
        </div>
    );
};

export default Test;
