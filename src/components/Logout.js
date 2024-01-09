import React from "react";
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuth }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            setAuth(false);
            navigate('/');
          } else {
            console.error("User is not authenticated. Logout not performed.");
          }
    }

    return (
        <div>
            <p>Are you sure you want to log out?</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;
