import React, { useState } from 'react';
import './Register.css';

interface Student {
    name: string;
    emailID: string;
    password: string;
    collegeName: string;
    rollNo: string;
    department: string;
    address: string;
    phoneNumber: string;
}

const StudentRegister: React.FC = () => {
    const [student, setStudent] = useState<Student>({
        name: '',
        emailID: '',
        password: '',
        collegeName: '',
        rollNo: '',
        department: '',
        address: '',
        phoneNumber: '',
    });

    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);

        if (student.name && student.emailID && student.password && student.collegeName && student.rollNo && student.department && student.address && student.phoneNumber) {
            console.log('Student Registered:', student);
            // You can send the data to a server here.
            // For now, we'll just log it to the console.
        }
    };

    return (
        <div className="form-container" style={{ marginTop: "30px" }}>
            <h2>Student Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={student.name} onChange={handleChange} />
                    {submitted && !student.name && <span>Please enter your name</span>}
                </div>
                <div>
                    <label>Email ID:</label>
                    <input type="email" name="emailID" value={student.emailID} onChange={handleChange} />
                    {submitted && !student.emailID && <span>Please enter a valid email</span>}
                </div>
                <div>
                    <label>Create Password:</label>
                    <input type="password" name="password" value={student.password} onChange={handleChange} />
                    {submitted && !student.password && <span>Please enter a password</span>}
                </div>
                <div>
                    <label>College Name:</label>
                    <input type="text" name="collegeName" value={student.collegeName} onChange={handleChange} />
                    {submitted && !student.collegeName && <span>Please enter your college name</span>}
                </div>
                <div>
                    <label>Roll No:</label>
                    <input type="text" name="rollNo" value={student.rollNo} onChange={handleChange} />
                    {submitted && !student.rollNo && <span>Please enter your StudentID</span>}
                </div>
                <div>
                    <label>Department:</label>
                    <input type="text" name="department" value={student.department} onChange={handleChange} />
                    {submitted && !student.department && <span>Please enter your department</span>}
                </div>
                <div>
                    <label>Address:</label>
                    <textarea name="address" value={student.address} onChange={handleChange}></textarea>
                    {submitted && !student.address && <span>Please enter your address</span>}
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="tel" name="phoneNumber" value={student.phoneNumber} onChange={handleChange} />
                    {submitted && !student.phoneNumber && <span>Please enter your phone number</span>}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default StudentRegister;