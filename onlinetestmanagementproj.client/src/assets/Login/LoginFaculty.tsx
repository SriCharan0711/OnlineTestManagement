import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

interface LoginCredentials {
    facultyID: string;
    emailID: string;
    password: string;
}

const LoginFaculty: React.FC = () => {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        facultyID: '',
        emailID: '',
        password: '',
    });
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string|null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (credentials.emailID && credentials.password && credentials.facultyID) {
            try {
                const response = await axios.post('https://localhost:7116/api/Faculty/facultyLogin', credentials);
                if (response.status === 200) {
                    setSuccess("Login Successful...");
                    setError(null);
                    console.log(response.data);
                    localStorage.setItem('facultyID', credentials.facultyID);
                    setTimeout(() => {
                        navigate('/faculty');
                    }, 2000);
                }
            } catch (err) {
                setError('Login failed. Please check your credentials and try again.');
                setSuccess("");
            }
        } else {
            setError('Please fill in all fields.');
        }
    };

    return (
        <div className="container mt-3">
            {error && <h2 className="text-danger text-center">{error}</h2>}
            {success && <h2 className="text-success text-center">{success}</h2>}
            <div className="form-container" style={{ marginTop: "50px" }}>
                <h2>Faculty Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Faculty ID:</label>
                        <input type="text" name="facultyID" value={credentials.facultyID} onChange={handleChange} />
                        {error && !credentials.facultyID && <span className="text-danger">Please enter your Faculty ID</span>}
                    </div>
                    <div>
                        <label>Email ID:</label>
                        <input type="email" name="emailID" value={credentials.emailID} onChange={handleChange} />
                        {error && !credentials.emailID && <span className="text-danger">Please enter your email</span>}
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" value={credentials.password} onChange={handleChange} />
                        {error && !credentials.password && <span className="text-danger">Please enter your password</span>}
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginFaculty;
