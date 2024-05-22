// src/StudentLoginForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Login.css';

interface LoginCredentials {
    emailID: string;
    password: string;
    studentID: string;
}

const LoginStudent: React.FC = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<LoginCredentials>({
        emailID: '',
        password: '',
        studentID: '',
    });

    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);

        if (credentials.emailID && credentials.password && credentials.studentID) {
            navigate('/student');
        }
    };

    return (
        <div className="form-container" style={{ marginTop: "100px" }}>
            <h2>Student Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Student ID:</label>
                    <input type="text" name="studentID" value={credentials.studentID} onChange={handleChange} />
                    {submitted && !credentials.studentID && <span>Please enter your Student ID</span>}
                </div>
                <div>
                    <label>Email ID:</label>
                    <input type="email" name="emailID" value={credentials.emailID} onChange={handleChange} />
                    {submitted && !credentials.emailID && <span>Please enter your email</span>}
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} />
                    {submitted && !credentials.password && <span>Please enter your password</span>}
                </div>

                <button type="submit" >Login</button>
            </form>
        </div>
    );
};

export default LoginStudent;