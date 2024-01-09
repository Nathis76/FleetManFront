import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = ({ setAuth }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const nav = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        fetch('https://localhost:7234/api/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            method: 'POST',
            body: JSON.stringify({ Username: username, Password: password })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            //if (data.success === true) {
                localStorage.setItem('token', data.token)
                // localStorage.setItem('email', data.email)
                // localStorage.setItem('username', data.username)
                // localStorage.setItem('name', data.name)
                // localStorage.setItem('role', data.role)
                setAuth(true)
                nav("/dashboard")              
            // } else {
            //     setAuth(false)
            //     setErrorMessage('Username or password is incorrect.');
            //}
        })
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Submit</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    )
}

export default Login;
