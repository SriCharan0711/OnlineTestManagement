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
    
    return (
        <div className="container ">
            <div className="shadow-lg d-flex flex-row ">
                <img src="https://i.pinimg.com/564x/c5/94/b1/c594b11290587d26c51f64bbf27a6f99.jpg" />
                <div className="d-flex flex-column">
                    <h1 className="mt-5" style={{ marginLeft:"200px" }} >Login </h1>
                    <div className="d-flex flex-row  " style={{ marginTop: "70px",marginLeft:"100px" }}>

                        <div>
                            <img onClick={toStudentLogin} className="rounded-circle p-2 shadow me-5" height="150px" src="https://static.thenounproject.com/png/35785-200.png"></img>
                            <p className="ms-5 mt-3">Student</p>
                        </div>
                        <div>
                            <img onClick={toFacultyLogin} className=" d-inline shadow rounded-circle p-2" height="150px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuiTdi_RMnhHsEbSEZtTcd43yNi5AFzEtDhBDzsQtIShGxeo_W4Vwpk1k9QPyyV_J4bhw&usqp=CAU"></img>
                            <p className="ms-5 mt-3">Faculty</p>
                        </div>

                    </div>

                </div>
                
                       
                    
                
               

            </div>
           
            
        </div>


    );
}

export default LoginPage;