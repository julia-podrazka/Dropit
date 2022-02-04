import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './index.css';
import Main from './Main';
import LoginForm from './Login';
import Register from './Register';
import Home from './Home';

ReactDOM.render(
    <Router>
        <div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login/" element={<LoginForm />} />
                <Route path="/register/" element={<Register />} />
                <Route path="/home/" element={<Home />} />
            </Routes>
        </div>
    </Router>,
    document.getElementById('root')
);

