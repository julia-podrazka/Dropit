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
                <br/>
                <h3 className="text-center">Insert text here, this isn't finished.</h3>
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a pellentesque tellus. In dapibus pellentesque rutrum. Duis sed elit nec libero tincidunt viverra a in sem. Quisque id blandit nisi. Donec commodo aliquam egestas. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin consequat ipsum vitae finibus iaculis. Nulla tempor ligula tortor, nec faucibus ipsum volutpat non. Suspendisse velit nibh, euismod quis nisl vitae, suscipit mollis ante. Praesent a eros tellus.

                Duis dapibus enim eu justo dictum, eu vestibulum enim commodo. Vivamus rhoncus, diam sit amet congue maximus, arcu justo mollis leo, ut varius justo eros vel ex. Suspendisse porttitor lectus est, at dapibus metus tempus sit amet. Cras luctus, mi sed mollis sagittis, massa dolor imperdiet erat, at laoreet massa enim eu lorem. Etiam non magna mi. Ut ac justo lobortis, ornare ex et, fringilla nulla. Ut blandit leo sapien, nec varius risus dignissim nec. Proin ullamcorper mi in diam sodales, at placerat tortor volutpat.

                Fusce ante neque, egestas vehicula ipsum nec, pharetra fermentum dolor. Integer egestas finibus sapien, vitae auctor urna interdum id. Nulla pulvinar sodales orci, ut elementum diam auctor vel. Maecenas porta odio a nisi aliquam lacinia. Nullam vel nunc vel tortor dignissim volutpat sit amet et massa. Vivamus suscipit, turpis in accumsan porta, tortor sapien convallis felis, eu dignissim eros augue sed mauris. Phasellus faucibus pellentesque nisl, vitae dapibus urna sagittis ut. Fusce eget rhoncus augue. Sed dignissim massa nec ligula porta, in finibus ex tempor. In in vestibulum ipsum. Suspendisse id volutpat sapien. In pulvinar congue dui. Cras posuere vel lacus lacinia ornare. Maecenas mollis commodo arcu id pulvinar. Cras accumsan faucibus viverra.

                Nullam ac mauris massa. Donec sed semper ipsum. Sed convallis tincidunt arcu, vitae imperdiet erat facilisis non. Nunc id lorem id elit luctus auctor. Duis dapibus dolor ac risus sagittis, vitae ornare ipsum tincidunt. Morbi vel magna eget felis vestibulum varius. Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

                Nam porttitor velit ut pellentesque ultrices. Etiam tristique fermentum lacinia. Pellentesque nisi lorem, consectetur eget pharetra dapibus, posuere id libero. Morbi eu porta augue, nec faucibus felis. Sed in dui vel purus lacinia vulputate et quis purus. Phasellus eu diam non neque convallis mattis ac at orci. Proin ac odio et velit pulvinar pretium a a tortor. Quisque ex ipsum, elementum et neque at, laoreet feugiat velit. Pellentesque mollis lacinia eros, et euismod tortor euismod nec.
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
        <div className="main">
            <Navbar/>
            <FirstSection/>
            <SecondSection />
        </div>
    );
}