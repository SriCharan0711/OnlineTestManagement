import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
interface Student {
    id: string;
    studentID: string;
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
        id: '',
        studentID:'',
        name: '',
        emailID: '',
        password: '',
        collegeName: '',
        rollNo: '',
        department: '',
        address: '',
        phoneNumber: '',
    });
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       

        if (student.name && student.emailID && student.password && student.collegeName && student.rollNo && student.department && student.address && student.phoneNumber) {
            console.log('Student Registered:', student);
            try {
                const response = await axios.post('https://localhost:7116/api/Student/studentRegister', student);
                if (response.status === 201) {
                    setSuccess("Registration Successful...Redirecting to Login");
                    setError(null);
                    console.log(response.data);
                    setTimeout(() => {
                        navigate('/studentlogin');
                    }, 2000);
                }
            } catch (err) {
                setError('Registration failed. Please check your credentials and try again.');
                setSuccess("");
            }
        }
    };

    return (
        <div>
            {error && <h2 className="text-danger text-center">{error}</h2>}
            {success && <h2 className="text-success text-center">{success}</h2>}
            <div className="form-container" style={{ marginTop: "30px" }}>
                <h2>Student Registration Form</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={student.name} onChange={handleChange} />
                        {error && !student.name && <span>Please enter your name</span>}
                    </div>
                    <div>
                        <label>Email ID:</label>
                        <input type="email" name="emailID" value={student.emailID} onChange={handleChange} />
                        {error && !student.emailID && <span>Please enter a valid email</span>}
                    </div>
                    <div>
                        <label>Create Password:</label>
                        <input type="password" name="password" value={student.password} onChange={handleChange} />
                        {error && !student.password && <span>Please enter a password</span>}
                    </div>
                    <div>
                        <label>College Name:</label>
                        <input type="text" name="collegeName" value={student.collegeName} onChange={handleChange} />
                        {error && !student.collegeName && <span>Please enter your college name</span>}
                    </div>
                    <div>
                        <label>Roll No:</label>
                        <input type="text" name="rollNo" value={student.rollNo} onChange={handleChange} />
                        {error && !student.rollNo && <span>Please enter your StudentID</span>}
                    </div>
                    <div>
                        <label>Department:</label>
                        <input type="text" name="department" value={student.department} onChange={handleChange} />
                        {error && !student.department && <span>Please enter your department</span>}
                    </div>
                    <div>
                        <label>Address:</label>
                        <textarea name="address" value={student.address} onChange={handleChange}></textarea>
                        {error && !student.address && <span>Please enter your address</span>}
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <input type="tel" name="phoneNumber" value={student.phoneNumber} onChange={handleChange} />
                        {error && !student.phoneNumber && <span>Please enter your phone number</span>}
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div></div>
       
    );
};

export default StudentRegister;