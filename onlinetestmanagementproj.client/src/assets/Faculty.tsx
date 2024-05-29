/*
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import './Faculty.css'; // Optional: For any custom styling

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

const Faculty: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [quizToUpdate, setQuizToUpdate] = useState<Quiz | null>(null);
    const [quizToDelete, setQuizToDelete] = useState<{ id: string; quizId: string } | null>(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('https://localhost:7116/api/Quiz/getQuiz'); // Adjust the URL as needed
                setQuizzes(response.data);
            } catch (error) {
                setErrorMessage('Error occurred while fetching quizzes.');
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    const openUpdateModal = (quiz: Quiz) => {
        setQuizToUpdate({ ...quiz });
        setShowUpdateModal(true);
    };

    const handleUpdateQuiz = async () => {
        if (quizToUpdate) {
            try {
                await axios.put('https://localhost:7116/api/Quiz/updateQuiz', quizToUpdate);
                setQuizzes(quizzes.map(q => (q.id === quizToUpdate.id ? quizToUpdate : q)));
                setShowUpdateModal(false);
            } catch (error) {
                setErrorMessage('Error occurred while updating quiz.');
                console.error('Error updating quiz:', error);
            }
        }
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        questionIndex?: number,
        optionIndex?: number
    ) => {
        const { name, value } = e.target;

        if (questionIndex !== undefined && quizToUpdate && quizToUpdate.questions[questionIndex]) {
            const updatedQuestions = [...quizToUpdate.questions];
            if (optionIndex !== undefined) {
                const updatedOptions = [...updatedQuestions[questionIndex].options];
                updatedOptions[optionIndex] = value;
                updatedQuestions[questionIndex] = {
                    ...updatedQuestions[questionIndex],
                    options: updatedOptions
                };
            } else {
                updatedQuestions[questionIndex] = {
                    ...updatedQuestions[questionIndex],
                    [name]: value
                };
            }
            setQuizToUpdate(prevState => ({
                ...prevState!,
                questions: updatedQuestions
            }));
        } else {
            setQuizToUpdate(prevState => ({
                ...prevState!,
                [name]: value
            }));
        }
    };

    const openDeleteModal = (id: string, quizId: string) => {
        setQuizToDelete({ id, quizId });
        setShowDeleteModal(true);
    };

    const handleDeleteQuiz = async () => {
        if (quizToDelete) {
            try {
                await axios.delete(`https://localhost:7116/api/Quiz/deleteQuiz/${quizToDelete.id}/${quizToDelete.quizId}`);
                setQuizzes(quizzes.filter(quiz => quiz.id !== quizToDelete.id));
                setShowDeleteModal(false);
            } catch (error) {
                setErrorMessage('Error occurred while deleting quiz.');
                console.error('Error deleting quiz:', error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Quizzes Added</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="row">
                {quizzes.length > 0 ? (
                    quizzes.map(quiz => (
                        <div className="col-md-4 mb-4" key={quiz.id}>
                            <div className="card h-100 shadow">
                                <div className="card-body">
                                    <h5 className="card-title">{quiz.quizName}</h5>
                                    <p className="card-text">{quiz.quizDescription}</p>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => openUpdateModal(quiz)}
                                    >
                                        Update Quiz
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => openDeleteModal(quiz.id, quiz.quizId)}
                                    >
                                        Delete Quiz
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p>No tests available.</p>
                    </div>
                )}
            </div>

            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formQuizName">
                            <Form.Label>Quiz Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="quizName"
                                value={quizToUpdate?.quizName || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formQuizDescription">
                            <Form.Label>Quiz Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="quizDescription"
                                value={quizToUpdate?.quizDescription || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        {quizToUpdate?.questions.map((question, qIndex) => (
                            <div key={qIndex}>
                                <Form.Group controlId={`formQuestionText${qIndex}`}>
                                    <Form.Label>Question {qIndex + 1}</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="text"
                                        value={question.text}
                                        onChange={(e) => handleInputChange(e, qIndex)}
                                    />
                                </Form.Group>
                                {question.options.map((option, oIndex) => (
                                    <Form.Group controlId={`formQuestion${qIndex}Option${oIndex}`} key={oIndex}>
                                        <Form.Label>Option {oIndex + 1}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="options"
                                            value={option}
                                            onChange={(e) => handleInputChange(e, qIndex, oIndex)}
                                        />
                                    </Form.Group>
                                ))}
                                <Form.Group controlId={`formCorrectOption${qIndex}`}>
                                    <Form.Label>Correct Option</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="correctOption"
                                        value={question.correctOption}
                                        onChange={(e) => handleInputChange(e, qIndex)}
                                    />
                                </Form.Group>
                            </div>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateQuiz}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteQuiz}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Faculty;
*/
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Faculty.css'; // Optional: For any custom styling

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

const Faculty: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [quizToUpdate, setQuizToUpdate] = useState<Quiz | null>(null);
    const [quizToDelete, setQuizToDelete] = useState<{ id: string; quizId: string } | null>(null);

    useEffect(() => {
        const fetchQuizzes = async () => {

            const facultyID = localStorage.getItem('facultyID');
            try {
                const response = await axios.get(`https://localhost:7116/api/Quiz/getQuiz/${facultyID}`); // Adjust the URL as needed
                setQuizzes(response.data);
            } catch (error) {
                setErrorMessage('Error occurred while fetching quizzes.');
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    const openUpdateModal = (quiz: Quiz) => {
        setQuizToUpdate({ ...quiz });
        setShowUpdateModal(true);
    };

    const handleUpdateQuiz = async () => {
        if (quizToUpdate) {
            try {
                await axios.put('https://localhost:7116/api/Quiz/updateQuiz', quizToUpdate);
                setQuizzes(quizzes.map(q => (q.id === quizToUpdate.id ? quizToUpdate : q)));
                setShowUpdateModal(false);
                toast.success('Quiz updated successfully!');
            } catch (error) {
                setErrorMessage('Error occurred while updating quiz.');
                console.error('Error updating quiz:', error);
            }
        }
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        questionIndex?: number,
        optionIndex?: number
    ) => {
        const { name, value } = e.target;

        if (questionIndex !== undefined && quizToUpdate && quizToUpdate.questions[questionIndex]) {
            const updatedQuestions = [...quizToUpdate.questions];
            if (optionIndex !== undefined) {
                const updatedOptions = [...updatedQuestions[questionIndex].options];
                updatedOptions[optionIndex] = value;
                updatedQuestions[questionIndex] = {
                    ...updatedQuestions[questionIndex],
                    options: updatedOptions
                };
            } else {
                updatedQuestions[questionIndex] = {
                    ...updatedQuestions[questionIndex],
                    [name]: value
                };
            }
            setQuizToUpdate(prevState => ({
                ...prevState!,
                questions: updatedQuestions
            }));
        } else {
            setQuizToUpdate(prevState => ({
                ...prevState!,
                [name]: value
            }));
        }
    };

    const openDeleteModal = (id: string, quizId: string) => {
        setQuizToDelete({ id, quizId });
        setShowDeleteModal(true);
    };

    const handleDeleteQuiz = async () => {
        if (quizToDelete) {
            try {
                await axios.delete(`https://localhost:7116/api/Quiz/deleteQuiz/${quizToDelete.id}/${quizToDelete.quizId}`);
                setQuizzes(quizzes.filter(quiz => quiz.id !== quizToDelete.id));
                setShowDeleteModal(false);
                toast.success('Quiz deleted successfully!');
            } catch (error) {
                setErrorMessage('Error occurred while deleting quiz.');
                console.error('Error deleting quiz:', error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <ToastContainer autoClose={2000} />
            <h2>Quizzes Added</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="row">
                {quizzes.length > 0 ? (
                    quizzes.map(quiz => (
                        <div className="col-md-4 mb-4" key={quiz.id}>
                            <div className="card h-100 shadow">
                                <div className="card-body">
                                    <h5 className="card-title">{quiz.quizName}</h5>
                                    <p className="card-text">{quiz.quizDescription}</p>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => openUpdateModal(quiz)}
                                    >
                                        Update Quiz
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => openDeleteModal(quiz.id, quiz.quizId)}
                                    >
                                        Delete Quiz
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p>No tests available.</p>
                    </div>
                )}
            </div>

            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formQuizName">
                            <Form.Label>Quiz Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="quizName"
                                value={quizToUpdate?.quizName || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formQuizDescription">
                            <Form.Label>Quiz Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="quizDescription"
                                value={quizToUpdate?.quizDescription || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        {quizToUpdate?.questions.map((question, qIndex) => (
                            <div key={qIndex}>
                                <Form.Group controlId={`formQuestionText${qIndex}`}>
                                    <Form.Label>Question {qIndex + 1}</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="text"
                                        value={question.text}
                                        onChange={(e) => handleInputChange(e, qIndex)}
                                    />
                                </Form.Group>
                                {question.options.map((option, oIndex) => (
                                    <Form.Group controlId={`formQuestion${qIndex}Option${oIndex}`} key={oIndex}>
                                        <Form.Label>Option {oIndex + 1}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="options"
                                            value={option}
                                            onChange={(e) => handleInputChange(e, qIndex, oIndex)}
                                        />
                                    </Form.Group>
                                ))}
                                <Form.Group controlId={`formCorrectOption${qIndex}`}>
                                    <Form.Label>Correct Option</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="correctOption"
                                        value={question.correctOption}
                                        onChange={(e) => handleInputChange(e, qIndex)}
                                    />
                                </Form.Group>
                            </div>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateQuiz}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteQuiz}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Faculty;
