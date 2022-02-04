import React, {useState} from 'react';

function InputRow(props) {
    return (
        <div className="input-pack row">
            <div className="col-4 input-label">
                <label htmlFor="name">{props.label}</label>
            </div>
            <div className="col-8 d-flex flex-row">
                {props.children}
            </div>
        </div>
    );
}

export default function IntroModal(props) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [vegetarian, setVegetarian] = useState('');
    const [maxCalories, setMaxCalories] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const answers = {name, age, gender, weight, height, vegetarian, max_calories: maxCalories};

    const handleSubmit = async e => {
        e.preventDefault();

        const csrftoken = localStorage.getItem('token');
        await fetch('/user_information/user_info/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${csrftoken}`
            },
            body: JSON.stringify(answers),
        });

        props.onSubmit();
    };

    return (
        <div className={props.hidden ? "modal hidden" : "modal"}>
            <div className="modal-content">
                <div className="modal-header">
                    <h1>Introduce yourself!</h1>
                </div>
                <form id='lol' onSubmit={e => { setSubmitted(true); handleSubmit(e); }}>
                    <fieldset>
                        <InputRow label="Name">
                            <input
                                className={!submitted || name ? "input-field" : "input-field btn-required"}
                                type="text"
                                id="name"
                                value={name}
                                onChange={e => setName(validateName(e.target.value))}
                            />
                        </InputRow>
                        <InputRow label="Age">
                            <input
                                className={!submitted || age ? "input-field" : "input-field btn-required"}
                                type="text"
                                id="age"
                                value={age}
                                onChange={e => setAge(validateNumber(e.target.value))}
                            />
                        </InputRow>
                        <InputRow label="Gender">
                            <input
                                className={!submitted || gender ? "input-field" : "input-field btn-required"}
                                type="button"
                                id="gender-m"
                                value="Male"
                                onClick={e => {
                                    setGender('M');
                                    chooseOption(e.target, document.getElementById('gender-f'));
                                }}
                            />
                            <input
                                className={!submitted || gender ? "input-field" : "input-field btn-required"}
                                type="button"
                                id="gender-f"
                                value="Female"
                                onClick={e => {
                                    setGender('F');
                                    chooseOption(e.target, document.getElementById('gender-m'));
                                }}
                            />
                        </InputRow>
                        <InputRow label="Weight (in kg)">
                            <input
                                className={!submitted || weight ? "input-field" : "input-field btn-required"}
                                type="text"
                                id="weight"
                                value={weight}
                                onChange={e => setWeight(validateNumber(e.target.value))}
                            />
                        </InputRow>
                        <InputRow label="Height (in cm)">
                            <input
                                className={!submitted || height ? "input-field" : "input-field btn-required"}
                                type="text"
                                id="height"
                                value={height}
                                onChange={e => setHeight(validateNumber(e.target.value))}
                            />
                        </InputRow>
                        <InputRow label="Are you vegetarian?">
                            <input
                                className={!submitted || vegetarian ? "input-field" : "input-field btn-required"}
                                type="button"
                                id="veg-y"
                                value="Yes"
                                onClick={e => {
                                    setVegetarian('Y');
                                    chooseOption(e.target, document.getElementById('veg-n'));
                                }}
                            />
                            <input
                                className={!submitted || vegetarian ? "input-field" : "input-field btn-required"}
                                type="button"
                                id="veg-n"
                                value="No"
                                onClick={e => {
                                    setVegetarian('N');
                                    chooseOption(e.target, document.getElementById('veg-y'));
                                }}
                            />
                        </InputRow>
                        <InputRow label="Maximum calories intake">
                            <input className={!submitted || maxCalories ? "input-field" : "input-field btn-required"}
                                   type="text"
                                   id="max_calories"
                                   value={maxCalories}
                                   onChange={e => setMaxCalories(validateNumber(e.target.value))}
                            />
                        </InputRow>
                        <br/>
                        <div className="input-pack row">
                            <div className="col-3"/>
                            <div className="col-6">
                                <input className="input-field" type="submit" />
                            </div>
                            <div className="col-3"/>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

function validateName(input) {
    return /^[a-zA-Z]{0,30}$/.test(input)
        ? input.substr(0, 1).toUpperCase() + input.substr(1)
        : input.substr(0, input.length - 1);
}

function validateNumber(input) {
    return /^([1-9][\d]{0,3})$/.test(input)
        ? parseInt(input)
        : input.substr(0, input.length - 1);
}

function chooseOption(btn, other) {
    btn.className = "btn-chosen input-field";
    other.className = "input-field";
}