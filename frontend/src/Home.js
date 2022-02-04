import React, {useEffect, useState} from 'react';
import {ReactComponent as LogoSVG} from "./logo.svg";
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning, faUtensils, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import Register from './Register';
import IntroModal from './IntroModal';
import {Link} from "react-router-dom";

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
                            <button onClick={() => props.switchContent(item[0])}>
                                <FontAwesomeIcon icon={item[1]}/>
                                {item[0].capitalize()}
                            </button>
                        </li>
                    )
                }
            </ul>
            <hr/>
            <div>
                <Link to="/">Log out</Link>
            </div>
        </div>
    );
}

function MealRow(props) {

}

function Meals() {
    const [updated, setUpdated] = useState(true);
    const [meals, setMeals] = useState([]);
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);

    const [foodItem, setFoodItem] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [size, setSize] = useState('');

    async function fetchData() {
        const mealsJson = await getUserMeals();
        setMeals(mealsJson);
        const foodsJson = await getFoods();
        setFoods([...new Set(foodsJson.map(x => x['food_item']))]);
        const categoriesJson = await getCategories();
        setCategories([...new Set(categoriesJson.map(x => x['food_category']))]);
    }

    useEffect(() => { fetchData(); }, [updated]);

    async function handleSubmit(e) {
        e.preventDefault();

        const csrftoken = localStorage.getItem('token');
        const body = new FormData;
        body.append("food_item", '2'); // (await getFoodId(foodItem))[0].id
        body.append("date", date);
        body.append("category", category);
        body.append("size", size);
        const response = await fetch('/user_meal/user_m/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${csrftoken}`
            },
            body
        });
        const json = await response.json();
        setUpdated(!updated);
    }

    return (
        <div>
            <ul>
                {
                    meals.map(row =>
                        <li key={row}>
                            {JSON.stringify(row)}
                        </li>
                    )
                }
            </ul>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" list="foods" onChange={e => setFoodItem(e.target.value)} />
                <datalist id="foods">
                    {foods.map(x => <option value={x} />) }
                </datalist>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                <input type="text" list="categories" onChange={e => setCategory(e.target.value)} />
                <datalist id="categories">
                    {categories.map(x => <option value={x} />) }
                </datalist>
                <input type="number" value={size} onChange={e => setSize(e.target.value)} />
                <input type="submit" />
            </form>
        </div>
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
            return <Meals />;
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
    const [showModal, setShowModal] = useState(false); ///////////////////////////////////////// CHANGE TO TRUE
    const options = [
        ['meals', 'utensils'],
        ['exercises', 'running'],
        ['personal', 'user'],
        ['settings', 'cog'],
    ];
    fontawesome.library.add(faUtensils, faRunning, faUser, faCog);
    getUserInfo(setShowModal.bind(this));

    return (
        <div className="main d-flex flex-row">
            <Sidebar switchContent={setContent.bind(this)} options={options}/>
            <div className="container">
                <Content content={content}/>
            </div>
            {showModal && <IntroModal onSubmit={setShowModal.bind(this, false)} />}
        </div>
    );
};

async function httpGet(url) {
    const csrftoken = localStorage.getItem('token');
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${csrftoken}`
        },
    });
}

// Checks whether additional info about the user has been filled already.
async function getUserInfo(callback) {
    const response = await httpGet('/user_information/user_info/');
    const json = await response.json();
    if (JSON.stringify(json) !== '[]' && JSON.stringify(json) !== '{}')
        callback(false);
}

async function getUserMeals() {
    const response = await httpGet('/user_meal/user_m/');
    return await response.json();
}

async function getFoods() {
    const response = await httpGet('/user_meal/all_calories/');
    return await response.json();
}

async function getCategories() {
    const response = await httpGet('/user_meal/all_categories/');
    return await response.json();
}

async function getFoodId(food_item) {
    const csrftoken = localStorage.getItem('token');
    const response = await fetch('/user_meal/calories/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${csrftoken}`
        },
        body: {food_item}
    });
    return await response.json();
}
