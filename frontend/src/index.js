import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Main from './Main';
import Login from './Login';
import Register from './Register';

ReactDOM.render(
    <Router>
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Main />} />
            </Routes>
        </div>
    </Router>,
    document.getElementById('root')
);

