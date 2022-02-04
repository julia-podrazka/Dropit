import React, {useEffect, useState} from 'react';
import {ReactComponent as LogoSVG} from "./logo.svg";
import fontawesome from '@fortawesome/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRunning, faUtensils, faUser, faCog} from '@fortawesome/free-solid-svg-icons';
import Register from './Register';
import IntroModal from './IntroModal';
import {Link} from "react-router-dom";
import {
    getCategories,
    getExerciseCalories, getExerciseId, getExerciseSum, getFoodId,
    getFoods, getFoodSum,
    getTodaysDate,
    getUserExercises,
    getUserInfo,
    getUserMeals
} from "./utils";

Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
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
    const [removed, setRemoved] = useState(false);

    if (removed)
        return (<></>);
    else
        return (
            <div className="row d-flex flex-row">
                <div className="col-3 meal-col">
                    <span>{props.values[0]}</span>
                </div>
                <div className="col-3 meal-col">
                    <span>{props.values[1]}</span>
                </div>
                <div className="col-3 meal-col">
                    <span>{props.values[2]}</span>
                </div>
                <div className="col-3">
                    <button
                        className="input-field remove-btn"
                        onClick={() => {
                            props.onclick();
                            setRemoved(true);
                        }}
                    >
                        Remove element
                    </button>
                </div>
            </div>
        )
}

function ExerciseRow(props) {
    const [removed, setRemoved] = useState(false);

    if (removed)
        return (<></>);
    else
        return (
            <div className="row d-flex flex-row">
                <div className="col-4 ex-col">
                    <span>{props.values[0]}</span>
                </div>
                <div className="col-4 ex-col">
                    <span>{props.values[1]}</span>
                </div>
                <div className="col-4">
                    <button
                        className="input-field remove-btn"
                        onClick={() => {
                            props.onclick();
                            setRemoved(true);
                        }}
                    >
                        Remove element
                    </button>
                </div>
            </div>
        );
}

function Meals() {
    const [updated, setUpdated] = useState(true);
    const [meals, setMeals] = useState([]);
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);

    const [foodItem, setFoodItem] = useState('');
    const [category, setCategory] = useState('');
    const date = getTodaysDate();
    const [size, setSize] = useState('');
    const [calSum, setCalSum] = useState(0);

    async function fetchData() {
        const mealsJson = await getUserMeals();
        setMeals(mealsJson);
        const foodsJson = await getFoods();
        setFoods([...new Set(foodsJson.map(x => x['food_item']))]);
        const categoriesJson = await getCategories();
        setCategories([...new Set(categoriesJson.map(x => x['food_category']))]);
        setCalSum(await getFoodSum());
    }

    useEffect(() => {
        fetchData();
    }, [updated]);

    async function handleSubmit(e) {
        e.preventDefault();

        console.log(JSON.stringify({
            'food_item': await getFoodId(foodItem),
            date, category, size
        }))

        const csrftoken = localStorage.getItem('token');
        const body = new FormData();
        body.append("food_item", await getFoodId(foodItem));
        body.append("date", date);
        body.append("category", category);
        body.append("size", size);

        const response = await fetch('/user_meal/user_m/', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${csrftoken}`
            },
            body,
        });
        const json = await response.json();
        setUpdated(!updated);
    }

    function removeRow(row) {
        // TODO request to remove
        setUpdated(!updated);
    }

    return (
        <div className="container">
            <br/>
            <form className="row" onSubmit={e => handleSubmit(e)}>
                <div className="col-3">
                    <input
                        name="food_type"
                        className="input-field"
                        type="text"
                        list="foods"
                        placeholder="Food type"
                        onChange={e => setFoodItem(e.target.value)}
                    />
                    <datalist id="foods">
                        {foods.map(x => <option value={x}/>)}
                    </datalist>
                </div>
                <div className="col-3">
                    <input
                        name="category"
                        className="input-field"
                        type="text"
                        list="categories"
                        placeholder="Category"
                        onChange={e => setCategory(e.target.value)}
                    />
                    <datalist id="categories">
                        {categories.map(x => <option value={x}/>)}
                    </datalist>
                </div>
                <div className="col-3">
                    <input
                        name="size"
                        className="input-field"
                        type="number"
                        placeholder="Portion size"
                        value={size}
                        onChange={e => setSize(e.target.value)}
                    />
                </div>
                <div className="col-3">
                    <input className="input-field btn-chosen" type="submit" value="Add to list"/>
                </div>
            </form>
            {meals.map(row => {
                console.log(JSON.stringify(row));
                    return <MealRow
                        row={row}
                        values={[ row['food_item_detail']['food_item'], row['category'], row['size'] ]}
                        onclick={removeRow.bind(this)}
                    />
            }
            )}
            <div className="row d-flex flex-row">
                <div className="col-3 ex-col" />
                <div className="col-3 ex-col" />
                <div className="col-3 ex-col" />
                <div className="col-3">
                    Sum: {calSum.toFixed(0)} calories
                </div>
            </div>
        </div>
    );
}

function Exercises() {
    const [updated, setUpdated] = useState(true);
    const [calories, setCalories] = useState([]);
    const [exercises, setExercises] = useState([]);

    const [exercise, setExercise] = useState('');
    const date = getTodaysDate();
    const [duration, setDuration] = useState('');
    const [calSum, setCalSum] = useState(0);

    async function fetchData() {
        const exercisesJson = await getUserExercises();
        setExercises(exercisesJson);
        const caloriesJson = await getExerciseCalories();
        setCalories(caloriesJson.map(ex => ex['exercise']));
        setCalSum(await getExerciseSum());
    }

    useEffect(() => {
        fetchData();
    }, [updated]);

    async function handleSubmit(e) {
        e.preventDefault();

        const csrftoken = localStorage.getItem('token');
        const body = new FormData;
        body.append("exercise", await getExerciseId(exercise));
        body.append("date", date);
        body.append("duration", duration);
        const response = await fetch('/user_exercise/user_ex/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${csrftoken}`
            },
            body
        });
        const json = await response.json();
        setUpdated(!updated);
    }

    function removeRow(row) {


        setUpdated(!updated);
    }

    return (
        <div className="container">
            <br/>
            <form className="row" onSubmit={e => handleSubmit(e)}>
                <div className="col-4">
                    <input
                        name="exercise"
                        className="input-field"
                        type="text"
                        list="exercises"
                        placeholder="Exercise type"
                        onChange={e => setExercise(e.target.value)}
                    />
                    <datalist id="exercises">
                        {calories.map(x => <option value={x} />)}
                    </datalist>
                </div>
                <div className="col-4">
                    <input
                        name="duration"
                        className="input-field"
                        type="number"
                        placeholder="Exercise duration"
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                    />
                </div>
                <div className="col-4">
                    <input className="input-field btn-chosen" type="submit" value="Add to list"/>
                </div>
            </form>
            {exercises.map(row =>
                <ExerciseRow
                    row={row}
                    values={[row['exercise_detail']['exercise'], row['duration']]}
                    onclick={removeRow.bind(this)}
                />
            )}
            <div className="row d-flex flex-row">
                <div className="col-4 ex-col" />
                <div className="col-4 ex-col" />
                <div className="col-4">
                    Sum: {calSum.toFixed(0)} calories
                </div>
            </div>
        </div>
    );
}

function Content(props) {
    switch (props.content) {
        case 'meals':
            return <Meals/>;
        case 'exercises':
            return <Exercises/>;
        // case 'personal':
        //     return <Personal />;
        // case 'settings':
        //     return <Settings />;
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
        // ['personal', 'user'],
        // ['settings', 'cog'],
    ];
    fontawesome.library.add(faUtensils, faRunning, faUser, faCog);
    getUserInfo(setShowModal.bind(this));

    return (
        <div className="main d-flex flex-row">
            <Sidebar switchContent={setContent.bind(this)} options={options}/>
            <div className="container">
                <Content content={content}/>
            </div>
            {showModal && <IntroModal onSubmit={setShowModal.bind(this, false)}/>}
        </div>
    );
};
