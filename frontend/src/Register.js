import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {getCookie} from './utils.js';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const onChangeUsername = e => setUsername(e.target.value);
    const onChangePassword = e => setPassword(e.target.value);

    const alert = document.getElementById('invalid-input-alert');

    const togglePassword = e => {
        const field = document.getElementById('password-input');
        field.type = field.type === "password" ? "text" : "password";
        e.target.classList.toggle("bi-eye");
    };

    const handleRegister = async (e, data) => {
        e.preventDefault();
        if (!validateUsername(username, alert) || !validatePassword(password, alert))
            return;

        const csrftoken = getCookie('csrftoken');
        const response = await fetch('/accounts/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        console.log(json);
        localStorage.setItem('token', json.token);
        localStorage.setItem('username', json.username);
        navigate('/home/');
    }

    return (
        <form onSubmit={e => handleRegister(e, {username, password})}>
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
                <span id="invalid-input-alert">This is an alert</span>
            </div>
            <div>
                <input
                    className="input-field"
                    type="submit"
                    value="Register"
                />
            </div>
        </form>
    );
}

export default function Register() {
    return (
        <div className="main vertical-center">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <h1 className="text-center">Register</h1>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <RegisterForm />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        Already have an account? <Link to="/login/">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function validateUsername(username, alertElem) {
    if (/^[A-Za-z\d-_]{6,50}$/.test(username)) {
        alertElem.style.opacity = '0';
        alertElem.textContent = '.';
        return true;

    } else {
        alertElem.style.opacity = '1';
        if (username.length < 8 || username.length > 32)
            alertElem.textContent = 'Username must contain 6 to 50 characters.';
        else
            alertElem.textContent = 'Username can contain only alphanumeric characters, hyphens and underscores.';
        return false;
    }
}

function validatePassword(password, alertElem) {
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/.test(password)) {
        alertElem.style.opacity = '0';
        alertElem.textContent = '.';
        return true;

    } else {
        alertElem.style.opacity = '1';
        if (password.length < 8 || password.length > 32)
            alertElem.textContent = 'Password must contain 8 to 32 characters.';
        else
            alertElem.textContent = 'Password must contain at least one letter and at least one number.';
        return false;
    }
}
