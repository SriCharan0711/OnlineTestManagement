// src/StudentLoginForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Login.css';
import axios from 'axios';

interface LoginCredentials {
    emailID: string;
    password: string;
    rollNo: string;
}

const LoginStudent: React.FC = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<LoginCredentials>({
        emailID: '',
        password: '',
        rollNo: '',
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const toStudentRegister = () => {
        navigate('/studentreg')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      

        if (credentials.emailID && credentials.password && credentials.rollNo) {
            try {
                const response = await axios.post('https://localhost:7116/api/Student/studentLogin', credentials);
                if (response.status === 200) {
                    setSuccess("Login Successful...");
                    setError(null);
                    console.log(response.data.department);
                    localStorage.setItem('department', response.data.department);
                    localStorage.setItem('studentID', response.data.studentID);
                    setTimeout(() => {
                        navigate('/student');
                    }, 2000);
                }
            } catch (err) {
                setError('Login failed. Please check your credentials and try again.');
                setSuccess("");
            }
            
        }
    };

    return (
        <div className="container">
            {error && <h2 className="text-danger text-center">{error}</h2>}
            {success && <h2 className="text-success text-center">{ success}</h2>}
            <div className="form w-50 mx-auto p-4 bg-light shadow" style={{ marginTop: "50px" }}>
                <h2>Student Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Roll No:</label>
                        <input className="form-control" type="text" name="rollNo" value={credentials.rollNo} onChange={handleChange} />
                        {error && !credentials.rollNo && <span>Please enter your Student ID</span>}
                    </div>
                    <div>
                        <label>Email ID:</label>
                        <input className="form-control" type="email" name="emailID" value={credentials.emailID} onChange={handleChange} />
                        {error && !credentials.emailID && <span>Please enter your email</span>}
                    </div>
                    <div>
                        <label>Password:</label>
                        <input className="form-control" type="password" name="password" value={credentials.password} onChange={handleChange} />
                        {error && !credentials.password && <span>Please enter your password</span>}
                    </div>
                    <a onClick={toStudentRegister} style={{ textDecoration: "underline", color:"blue" }}>Didn't Register? Click Here</a>
                    <button className="btn btn-primary d-block" type="submit" >Login</button>
                </form>
            </div>
        </div>
       
    );
};

export default LoginStudent;

