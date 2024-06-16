/*

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentDashboard.css';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

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
    const [showDashboard, setShowDashboard] = useState(false);
    const studentID = localStorage.getItem('studentID');

    useEffect(() => {
        const fetchQuizResults = async () => {
            try {
                const response = await axios.get(`https://localhost:7116/api/Quiz/getQuizResults/${studentID}`);
                setQuizResults(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching quiz results:', error);
            }
        };

        fetchQuizResults();
    }, [studentID]);

    const barChartData = {
        labels: quizResults.map(result => result.quizName),
        datasets: [
            {
                label: 'Correct Answers',
                data: quizResults.map(result => result.correctAnswers),
                backgroundColor: 'green',
            },
            {
                label: 'Total Questions',
                data: quizResults.map(result => result.totalQuestions),
                backgroundColor: 'gold',
            },
        ],
    };

    const lineChartData = {
        labels: quizResults.map(result => new Date(result.attemptDate).toLocaleDateString()),
        datasets: [
            {
                label: 'Score %',
                data: quizResults.map(result => result.score),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const handleViewDashboard = () => {
        setShowDashboard(true);
    };

    return (
        <div className="container mt-5">
            <h2>Student Profile</h2>
            <h3>Quiz Results</h3>
            {!showDashboard && (
                <button className="btn btn-secondary mb-3" onClick={handleViewDashboard}>
                    View Dashboard
                </button>
            )}
            {showDashboard && (
                <>
                    <div className="chart-container">
                        <h4>Correct Answers vs Total Questions</h4>
                        <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                    <div className="chart-container mt-5">
                        <h4>Score Over Time</h4>
                        <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </>
            )}
            <ul className="list-group mt-5">
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







*/


// StudentProfile.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentDashboard.css';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

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
    const [showDashboard, setShowDashboard] = useState(false);
    const studentID = localStorage.getItem('studentID');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizResults = async () => {
            try {
                const response = await axios.get(`https://localhost:7116/api/Quiz/getQuizResults/${studentID}`);
                setQuizResults(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching quiz results:', error);
            }
        };

        fetchQuizResults();
    }, [studentID]);

    const barChartData = {
        labels: quizResults.map(result => result.quizName),
        datasets: [
            {
                label: 'Correct Answers',
                data: quizResults.map(result => result.correctAnswers),
                backgroundColor: 'green',
            },
            {
                label: 'Total Questions',
                data: quizResults.map(result => result.totalQuestions),
                backgroundColor: 'gold',
            },
        ],
    };

    const lineChartData = {
        labels: quizResults.map(result => new Date(result.attemptDate).toLocaleDateString()),
        datasets: [
            {
                label: 'Score %',
                data: quizResults.map(result => result.score),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const handleViewDashboard = () => {
        setShowDashboard(true);
    };

    const handleViewReport = (quizID: string) => {
        navigate(`/student/detailed-report/${quizID}`);
    };

    return (
        <div className="container mt-5">
            <h2>Student Profile</h2>
            <button className="btn btn-primary mt-3" onClick={handleViewDashboard}>
                View Dashboard
            </button>

            {showDashboard && (
                <>
                    <h3 className="mt-5">Quiz Results Dashboard</h3>
                    <div className="chart-container mt-4">
                        <h4>Correct Answers vs Total Questions</h4>
                        <Bar data={barChartData} />
                    </div>
                    <div className="chart-container mt-4">
                        <h4>Score Over Time</h4>
                        <Line data={lineChartData} />
                    </div>
                </>
            )}

            <ul className="list-group mt-5">
                {quizResults.map(result => (
                    <li key={result.id} className="list-group-item">
                        <p><strong>Quiz Name:</strong> {result.quizName}</p>
                        <p><strong>Correct Answers:</strong> {result.correctAnswers} / {result.totalQuestions}</p>
                        <p><strong>Score:</strong> {result.score}%</p>
                        <button className="btn btn-secondary mt-2" onClick={() => handleViewReport(result.quizID)}>
                            View Report
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentProfile;
