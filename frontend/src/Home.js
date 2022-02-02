import React, {useState} from 'react';
import {ReactComponent as LogoSVG} from "./logo.svg";
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning, faUtensils, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import Login from './Login';
import Register from './Register';

Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});

function Sidebar(props) {
    return (
        <div
            className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
            style={{width: "200px", minHeight: "100vh"}}
        >
            <LogoSVG/>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto bg-dark">
                {
                    props.options.map(item =>
                        <li
                            className="sidebar-item" key={item}>
                            <button
                                className=""
                                onClick={() => props.switchContent(item[0])}
                            >
                                <FontAwesomeIcon icon={item[1]}/>
                                {item[0].capitalize()}
                            </button>
                        </li>
                    )
                }
            </ul>
            <hr/>
            <div>
                <span>TODO add log out</span>
            </div>
        </div>
    );
}

function Meals() {
    return (
        <div/>
    );
}

function Exercises() {
    return (
        <div/>
    );
}

function Personal() {
    return (
        <div/>
    );
}

function Settings() {
    return (
        <div/>
    );
}

function Content(props) {
    switch (props.content) {
        case 'meals':
            return <Login />;
        case 'exercises':
            return <Register />;
        case 'personal':
            return <Personal />;
        case 'settings':
            return <Settings />;
        default:
            return <></>;
    }
}

export default function Home() {
    const [content, setContent] = useState('meals');
    const options = [
        ['meals', 'utensils'],
        ['exercises', 'running'],
        ['personal', 'user'],
        ['settings', 'cog']
    ];
    fontawesome.library.add(faUtensils, faRunning, faUser, faCog);

    return (
        <div className="main d-flex flex-row">
            <Sidebar switchContent={setContent.bind(this)} options={options}/>
            <div className="container">
                <Content content={content}/>
            </div>
        </div>
    );
};
