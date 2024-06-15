import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

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
    facultyID: string;
    facultyName: string;
    facultyDepartment: string;
    testDuration: string;
}

const UpdateQuiz: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`https://localhost:7116/api/Quiz/getQuizById/${id}`);
                setQuiz(response.data);
                console.log(response.data);
            } catch (error) {
                setErrorMessage('Error occurred while fetching quiz details.');
                console.error('Error fetching quiz details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [id]);

    const handleQuizChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setQuiz(prevQuiz => prevQuiz ? { ...prevQuiz, [name]: value } : null);
    };

    const handleQuestionChange = (index: number, text: string) => {
        if (quiz) {
            const newQuestions: Question[] = [...quiz.questions];
            newQuestions[index].text = text;
            setQuiz({ ...quiz, questions: newQuestions });
        }
    };

    const handleOptionChange = (index: number, optionIndex: number, text: string) => {
        if (quiz) {
            const newQuestions: Question[] = [...quiz.questions];
            newQuestions[index].options[optionIndex] = text;
            setQuiz({ ...quiz, questions: newQuestions });
        }
    };

    const handleCorrectOptionChange = (index: number, correctOption: string) => {
        if (quiz) {
            const newQuestions: Question[] = [...quiz.questions];
            newQuestions[index].correctOption = correctOption;
            setQuiz({ ...quiz, questions: newQuestions });
        }
    };

    const addQuestion = () => {
        if (quiz) {
            const isValid = quiz.questions.every(question => question.text.trim() !== '' && question.options.every(option => option.trim() !== ''));
            if (isValid) {
                setQuiz(prevQuiz => prevQuiz ? {
                    ...prevQuiz,
                    Questions: [
                        ...prevQuiz.questions,
                        { Id: (prevQuiz.questions.length + 1).toString(), Text: '', Options: ['', '', '', ''], CorrectOption: '' }
                    ]
                } : null);
                setErrorMessage('');
            } else {
                const emptyQuestionIndex = quiz.questions.findIndex(question => question.text.trim() === '');
                if (emptyQuestionIndex !== -1) {
                    setErrorMessage('Enter a valid question.');
                } else {
                    const emptyOptionIndex = quiz.questions.findIndex(question => question.options.some(option => option.trim() === ''));
                    if (emptyOptionIndex !== -1) {
                        setErrorMessage(`Enter a valid option for question ${emptyOptionIndex + 1}.`);
                    }
                }
            }
        }
    };

    const removeQuestion = (index: number) => {
        if (quiz) {
            const newQuestions: Question[] = [...quiz.questions];
            newQuestions.splice(index, 1);
            newQuestions.forEach((question, i) => {
                question.id = (i + 1).toString();
            });
            setQuiz({ ...quiz, questions: newQuestions });
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (quiz) {
            try {
                await axios.put(`https://localhost:7116/api/Quiz/updateQuiz`, quiz);
                toast.success('Quiz updated successfully!', {
                    onClose: () => navigate('/faculty'),
                    transition: Slide
                });
            } catch (error) {
                setErrorMessage('Error occurred while updating quiz.');
                console.error('Error updating quiz:', error);
                toast.error('Error occurred while updating quiz.');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!quiz) return <div>{errorMessage || 'Quiz not found'}</div>;

    return (
        <div className="container">
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <form className="test-form bg-light" onSubmit={handleSubmit}>
                <div className="quiz-details">
                    <label className="quiz-label">Quiz Name</label>
                    <input
                        type="text"
                        name="quizName"
                        value={quiz.quizName}
                        onChange={handleQuizChange}
                        required
                    />
                    <label className="quiz-label">Quiz Description</label>
                    <textarea
                        name="quizDescription"
                        value={quiz.quizDescription}
                        onChange={handleQuizChange}
                        required
                    />
                    <label className="quiz-label">Test Duration (in minutes)</label>
                    <input
                        type="number"
                        name="testDuration"
                        value={quiz.testDuration}
                        onChange={handleQuizChange}
                        required
                    />
                </div>
                {quiz.questions.map((question, index) => (
                    <div className="question-container" key={index}>
                        <label className="question-label">Question {index + 1}</label>
                        <textarea
                            className="question-input"
                            value={question.text}
                            rows={3}
                            onChange={(e) => handleQuestionChange(index, e.target.value)}
                        />
                        <br />
                        {question.options.map((option, optionIndex) => (
                            <div className="option-container" key={optionIndex}>
                                <label className="option-label">Option {String.fromCharCode(65 + optionIndex)}</label>
                                <input
                                    className="option-input"
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                />
                                {question.correctOption === String.fromCharCode(65 + optionIndex) && <span className="correct-option"> (Correct)</span>}
                                <br />
                            </div>
                        ))}
                        <label className="correct-option-label">Select correct option:</label>
                        <select
                            className="correct-option-select"
                            value={question.correctOption}
                            onChange={(e) => handleCorrectOptionChange(index, e.target.value)}
                        >
                            <option value="" disabled>Choose an option</option>
                            {question.options.map((_option, optionIndex) => (
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
                <button className="submit-btn" type="submit">Update Quiz</button>
            </form>
        </div>
    );
};

export default UpdateQuiz;
