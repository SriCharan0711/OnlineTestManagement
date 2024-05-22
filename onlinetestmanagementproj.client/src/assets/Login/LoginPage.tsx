import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
function LoginPage() {
    const navigate = useNavigate();

    const toStudentLogin = () => {
        navigate('/studentlogin')
    }
    const toFacultyLogin = () => {
        navigate('/facultylogin')
    }
    const toStudentRegister = () => {
        navigate('/studentreg')
    }
    const toFacultyRegister = () => {
        navigate('/facultyreg')
    }
    return (
        <div className="loginpage">
            <h1 style={{ textAlign: "center", marginBottom: "25px" }}>
                HELLO ,WELCOME!!!
            </h1>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
                <button onClick={toStudentLogin} style={{ backgroundColor: "lightgreen", padding: "10px", color: "blue" }}>Login as Student</button>
            </div>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
                <button onClick={toFacultyLogin} style={{ backgroundColor: "lightgreen", padding: "10px", color: "blue" }}>Login as Faculty</button>
            </div>

            <div style={{ textAlign: "center", marginTop: "100px" }}>
                <div style={{ textAlign: "center", marginTop: "10px", color: "red" }}> <h3>Didn't SignUp?</h3></div>
                <div style={{ textAlign: "center", marginTop: "10px" }}></div> <button onClick={toStudentRegister} style={{ backgroundColor: "lightgreen", padding: "10px", color: "blue" }}>Register as Student</button>
                <div style={{ textAlign: "center", marginTop: "10px" }}></div>  <button onClick={toFacultyRegister} style={{ backgroundColor: "lightgreen", padding: "10px", color: "blue" }}>Register as Faculty</button>
            </div>
        </div>


    );
}

export default LoginPage;