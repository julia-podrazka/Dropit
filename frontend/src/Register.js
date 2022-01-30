import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {getCookie} from './utils.js';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const onChangeUsername = e => setUsername(e.target.value);
    const onChangePassword = e => setPassword(e.target.value);

    const handleRegister = async (e, data) => {
        e.preventDefault();
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
        localStorage.setItem('token', json.token);
        localStorage.setItem('username', json.username);
        navigate('/dashboard/');
    }

    return (
        <form onSubmit={e => handleRegister(e, {username, password})}>
            <h4>Register</h4>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                name="username"
                value={username}
                onChange={onChangeUsername}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
            />
            <input type="submit"/>
        </form>
    );
};
