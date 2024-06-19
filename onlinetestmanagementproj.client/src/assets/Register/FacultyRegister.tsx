import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
interface Faculty {
    id: string;
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
        id:'',
        name: '',
        emailID: '',
        facultyID: '',
        password: '',
        collegeName: '',
        department: '',
        phoneNumber: '',
        address: '',
       
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement |HTMLSelectElement >) => {
        const { name, value } = e.target;
        setFaculty({ ...faculty, [name]: value });
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      

        if (faculty.name && faculty.emailID && faculty.password && faculty.collegeName && faculty.department && faculty.phoneNumber && faculty.address && faculty.facultyID) {
            console.log('Faculty Registered:', faculty);
            try {
                const response = await axios.post('https://localhost:7116/api/Faculty/facultyRegister', faculty);
                if (response.status === 201) {
                    setSuccess("Registration Successful...Redirecting to Login");
                    setError(null);
                    console.log(response.data);
                    setTimeout(() => {
                        navigate('/facultylogin');
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
            {error && <h2 className="text-center text-error">{error}</h2>}
            {success && <h2 className="text-center text-success">{success}</h2>}
            <div className="form w-50 mx-auto p-4 bg-light shadow" style={{ marginTop: "30px" }}>
                <h2>Faculty Registration Form</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input className="form-control" type="text" name="name" value={faculty.name} onChange={handleChange} />
                        {error && !faculty.name && <span>Please enter your name</span>}
                    </div>
                    <div>
                        <label>Email ID:</label>
                        <input className="form-control" type="email" name="emailID" value={faculty.emailID} onChange={handleChange} />
                        {error && !faculty.emailID && <span>Please enter a valid email</span>}
                    </div>
                    <div>
                        <label>Faculty ID:</label>
                        <input className="form-control" type="text" name="facultyID" value={faculty.facultyID} onChange={handleChange} />
                        {error && !faculty.facultyID && <span>Please enter your Faculty ID</span>}
                    </div>
                    <div>
                        <label>Create Password:</label>
                        <input className="form-control" type="password" name="password" value={faculty.password} onChange={handleChange} />
                        {error && !faculty.password && <span>Please enter a password</span>}
                    </div>
                    <div>
                        <label>College Name:</label>
                        <input className="form-control" type="text" name="collegeName" value={faculty.collegeName} onChange={handleChange} />
                        {error && !faculty.collegeName && <span>Please enter your college name</span>}
                    </div>
                    <div>
                        <label>Department:</label>
                        <select className="form-select" name="department" value={faculty.department} onChange={handleChange}>
                            <option value="" disabled>Choose your department</option>
                            <option value="Computer Science Engineering & CSBS">Computer Science Engineering & CSBS</option>
                            <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                            <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
                            <option value="Electronics and Instrumentation Engineering">Electronics and Instrumentation Engineering</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Automobile Engineering">Automobile Engineering</option>
                        </select>
                        {error && !faculty.department && <span>Please select your department</span>}
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <input type="tel" name="phoneNumber" value={faculty.phoneNumber} onChange={handleChange} />
                        {error && !faculty.phoneNumber && <span>Please enter your phone number</span>}
                    </div>
                    <div>
                        <label>Address:</label>
                        <textarea name="address" value={faculty.address} onChange={handleChange}></textarea>
                        {error && !faculty.address && <span>Please enter your address</span>}
                    </div>

                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
      
    );
};

export default FacultyRegister;