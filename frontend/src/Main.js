import React, {Component} from "react";
import {ReactComponent as LogoSVG} from "./logo.svg";
import './Main.css';
import {Link} from "react-router-dom";

// should remove if doesn't come to use
function NavbarItem(props) {
    return (
        <li className="nav-item">
            <a className="nav-item-link">{props.text}</a>
        </li>
    );
}

function Navbar() {
    return (
        <div id="top-navbar" className="navbar navbar-expand-md">
            <div className="container-fluid">
                <div className="col-1"/>
                <div className="col-2">
                    <a className="navbar-brand">
                        <LogoSVG/>
                    </a>
                </div>
                <div className="col-6"/>
                <form className="form col">
                    <Link className="btn btn-block register-btn" to='/register/'>
                        Register
                    </Link>
                </form>
                <form className="form col">
                    <Link className="btn btn-block log-in-btn" to='/login/'>
                        Log in
                    </Link>
                </form>
                <div className="col-1"/>
            </div>
        </div>
    );
}

function FirstSection() {
    return (
        <div id="section-1" className="row">
            <div className="col-3 side-column"/>
            <div className="col-6 main-column">
                Will add some shit here
            </div>
            <div className="col-3 side-column"/>
        </div>
    );
}

function SecondSection() {
    return (
        <div/>
    );
}

export default function Main() {
    return (
        <main>
            <Navbar/>
            <FirstSection/>
            <SecondSection />
        </main>
    );
}