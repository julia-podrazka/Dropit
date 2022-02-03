import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {getCookie} from './utils.js';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const alert = document.getElementById('invalid-input-alert');

    const togglePassword = e => {
        const field = document.getElementById('password-input');
        field.type = field.type === "password" ? "text" : "password";
        e.target.classList.toggle("bi-eye");
    };

    const onChangeUsername = e => setUsername(e.target.value);
    const onChangePassword = e => setPassword(e.target.value);

    const handleLogin = async (e, data) => {
        e.preventDefault();

        const csrftoken = getCookie('csrftoken');
        const response = await fetch('/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();

        localStorage.setItem('token', json.token);
        localStorage.setItem('username', json.user.username);

        navigate('/home/');
    }

    return (
        <form onSubmit={e => handleLogin(e, {username, password})}>
            <div>
                <input className="input-field"
                    type="text"
                    name="username"
                    placeholder="username"
                    value={username}
                    onChange={onChangeUsername}
                />
            </div>
            <div>
                <input className="input-field"
                    type="password"
                    name="password"
                    id="password-input"
                    placeholder="password"
                    value={password}
                    onChange={onChangePassword}
                />
                <i className="bi bi-eye-slash" id="toggle-password" onClick={togglePassword}/>
            </div>
            <div>
                <span id="invalid-input-alert">TODO add credential validation</span>
            </div>
            <div>
                <input
                    className="input-field"
                    type="submit"
                    value="Log in"
                />
            </div>
        </form>
    );
}

export default function Login() {
    return (
        <div className="main vertical-center">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <h1 className="text-center">Log in</h1>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <LoginForm/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        Don't have an account? <Link to="/register/">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
