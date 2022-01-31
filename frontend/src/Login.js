import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {getCookie} from './utils.js';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

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
        navigate('/dashboard/');
    }

    return (
        <form onSubmit={e => handleLogin(e, {username, password})}>
            <h4>Log In</h4>
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
