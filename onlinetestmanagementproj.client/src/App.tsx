

import React from 'react';
import CodeEditor from './assets/CodeEditor/CodeEditor';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './assets/RootLayout';
import Test from './assets/Test/Test';
import LoginPage from './assets/Login/LoginPage';
import StudentRegister from './assets/Register/StudentRegister';
import LoginStudent from './assets/Login/LoginStudent';
import LoginFaculty from './assets/Login/LoginFaculty';
import FacultyRegister from './assets/Register/FacultyRegister';

import TakeTest from './assets/TakeTest/TakeTest';
import DashBoard from './assets/DashBoard/DashBoard';
import FacultyProfile from './assets/Profile/FacultyProfile';
import StudentProfile from './assets/Profile/StudentProfile';
import Header from './assets/Header/Header';
import AttemptQuiz from './assets/AttemptQuiz/AttemptQuiz';


const App: React.FC = () => {
    const router = createBrowserRouter([{
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <LoginPage />
            },

            {
                path: "/student",
                element: <Header />,
                children: [
                    {
                        path: "taketest",
                        element: <TakeTest />,
                    },
                    {
                        path: "profile",
                        element: <StudentProfile />,
                    },
                    {
                        path: "codeeditor",
                        element: <CodeEditor />
                    },
                   
                ]
            },
            {
                path: "/student/attempt-quiz",
                element: <AttemptQuiz />
            },
            {
                path: "/faculty",
                element: <Header />,
                children: [
                    {
                        path: "createtest",
                        element: <Test />,
                    },
                    {
                        path: "profile",
                        element: <FacultyProfile />
                    },
                    {
                        path: "dashboard",
                        element: <DashBoard />
                    }
                ]
            },
            {
                path: "/facultylogin",
                element: <LoginFaculty />
            },
            {
                path: "/studentreg",
                element: <StudentRegister />
            },
            {
                path: "/facultyreg",
                element: <FacultyRegister />
            },
            {
                path: "/studentlogin",
                element: <LoginStudent />,
            }
          

        ]
    }]);
    return (

        <div>
            <RouterProvider router={router}></RouterProvider>
        </div>




    );
};
export default App;