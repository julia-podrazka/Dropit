import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

ReactDOM.render(
    <Router>
        <div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    </Router>,
    document.getElementById('root')
);

