import React, {useState} from 'react';

function IntroModal() {
    const questions = ['name', 'age', 'gender', 'weight', 'height', 'vegetarian', 'max_calories'];
    const answers = {};
    const [questionId, setQuestionId] = useState(0);
    const [answer, setAnswer] = useState('');

    const onChangeAnswer = e => {
        setAnswer(e.target.value);
        answers[e.target.name] = e.target.value;
    };

    const handleModalAnswer = async e => {
        e.preventDefault();
        const response = await fetch('/user_information/user_info/', {
            type: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: answers,
        });
        const json = await response.json();
        // TODO finish this branch
    };

    //     name = models.CharField(max_length=30)
    //     age = models.IntegerField()
    //     gender = models.CharField(max_length=1)
    //     weight = models.IntegerField()
    //     height = models.IntegerField()
    //     vegetarian = models.CharField(max_length=1)
    //     max_calories = models.IntegerField()

    return (
        <form onSubmit={e => handleModalAnswer(e)}>
            <div>
                <input className="input-field"
                       type="text"
                       name="name"
                       value={answer}
                       onChange={onChangeAnswer}
                />
            </div>
            <div>
                <input className="input-field"
                       type="text"
                       name="name"
                       value={answer}
                       onChange={onChangeAnswer}
                />
            </div>
            <div>
                <input type="submit"/>
            </div>
        </form>
    );
}