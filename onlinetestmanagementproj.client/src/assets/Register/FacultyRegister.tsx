import React, { useState } from 'react';
import './Register.css';

interface Faculty {
    name: string;
    emailID: string;
    password: string;
    collegeName: string;
    department: string;
    phoneNumber: string;
    address: string;
    facultyID: string;
}

const FacultyRegister: React.FC = () => {
    const [faculty, setFaculty] = useState<Faculty>({
        name: '',
        emailID: '',
        password: '',
        collegeName: '',
        department: '',
        phoneNumber: '',
        address: '',
        facultyID: '',
    });

    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFaculty({ ...faculty, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);

        if (faculty.name && faculty.emailID && faculty.password && faculty.collegeName && faculty.department && faculty.phoneNumber && faculty.address && faculty.facultyID) {
            console.log('Faculty Registered:', faculty);
            // You can send the data to a server here.
            // For now, we'll just log it to the console.
        }
    };

    return (
        <div className="form-container" style={{ marginTop: "30px" }}>
            <h2>Faculty Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={faculty.name} onChange={handleChange} />
                    {submitted && !faculty.name && <span>Please enter your name</span>}
                </div>
                <div>
                    <label>Email ID:</label>
                    <input type="email" name="emailID" value={faculty.emailID} onChange={handleChange} />
                    {submitted && !faculty.emailID && <span>Please enter a valid email</span>}
                </div>
                <div>
                    <label>Faculty ID:</label>
                    <input type="text" name="facultyID" value={faculty.facultyID} onChange={handleChange} />
                    {submitted && !faculty.facultyID && <span>Please enter your Faculty ID</span>}
                </div>
                <div>
                    <label>Create Password:</label>
                    <input type="password" name="password" value={faculty.password} onChange={handleChange} />
                    {submitted && !faculty.password && <span>Please enter a password</span>}
                </div>
                <div>
                    <label>College Name:</label>
                    <input type="text" name="collegeName" value={faculty.collegeName} onChange={handleChange} />
                    {submitted && !faculty.collegeName && <span>Please enter your college name</span>}
                </div>
                <div>
                    <label>Department:</label>
                    <input type="text" name="department" value={faculty.department} onChange={handleChange} />
                    {submitted && !faculty.department && <span>Please enter your department</span>}
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="tel" name="phoneNumber" value={faculty.phoneNumber} onChange={handleChange} />
                    {submitted && !faculty.phoneNumber && <span>Please enter your phone number</span>}
                </div>
                <div>
                    <label>Address:</label>
                    <textarea name="address" value={faculty.address} onChange={handleChange}></textarea>
                    {submitted && !faculty.address && <span>Please enter your address</span>}
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default FacultyRegister;