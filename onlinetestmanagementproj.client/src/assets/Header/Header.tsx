import { Link, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './HeaderStyles.css';
import Student from '../Student';
import Faculty from '../Faculty';

function Header() {
    const location = useLocation();

    return (
        <div className="header">
            <header className="header-container">
                <div className="header1">
                    <img
                        className="img1"
                        src="https://thumbs.dreamstime.com/b/letter-sp-logo-design-template-letter-sp-logo-design-template-vector-illustration-231547759.jpg"
                        width="50px"
                        height="50px"
                        alt="logo"
                    />
                    <h1 className="header-title">Spark Test</h1>
                </div>

                <nav>
                    <ul className="nav-list">
                        {location.pathname.startsWith('/student') && (
                            <>
                                <Link className="nav-item" to="taketest">
                                    Tests
                                </Link>
                                <Link className="nav-item" to="codeeditor">
                                    CodeNow
                                </Link>
                                <Link className="nav-item" to="profile">
                                    Profile
                                </Link>
                            </>
                        )}
                        {location.pathname.startsWith('/faculty') && (
                            <>
                                <Link className="nav-item" to="createtest">
                                    Create Test
                                </Link>
                                <Link className="nav-item" to="profile">
                                    Profile
                                </Link>
                                <Link className="nav-item" to="dashboard">
                                    Dashboard
                                </Link>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
            {location.pathname === "/student" && <Student />}
            {location.pathname === "/faculty" && <Faculty />}
            <Outlet />
        </div>
    );
}

export default Header;