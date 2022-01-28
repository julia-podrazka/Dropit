import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import Login from './Login';
import Register from './Register';

ReactDOM.render(
    <Router>
        <div>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/" element={<App/>} />
            </Routes>
        </div>
    </Router>,
    document.getElementById('root')
);

