export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export async function httpGet(url) {
    const csrftoken = localStorage.getItem('token');
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${csrftoken}`
        },
    });
}

export async function getUserInfo(callback) {
    const response = await httpGet('/user_information/user_info/');
    const json = await response.json();
    if (JSON.stringify(json) !== '[]' && JSON.stringify(json) !== '{}')
        callback(false);
}

export async function getUserMeals() {
    const response = await httpGet('/user_meal/user_m/');
    return await response.json();
}

export async function getFoods() {
    const response = await httpGet('/user_meal/all_calories/');
    return await response.json();
}

export async function getCategories() {
    const response = await httpGet('/user_meal/all_categories/');
    return await response.json();
}

export async function getUserExercises() {
    const response = await httpGet('/user_exercise/user_ex/')
    return await response.json();
}

export async function getExerciseCalories() {
    const response = await httpGet('/user_exercise/all_calories/')
    return await response.json();
}

export async function getFoodSum() {
    const response = await httpGet('/user_meal/sum_food_calories/')
    return await response.json();
}

export async function getExerciseSum() {
    const response = await httpGet('/user_exercise/sum_calories/')
    return await response.json();
}

export async function getFoodId(food_item) {
    const csrftoken = localStorage.getItem('token');
    const body = new FormData();
    body.append("food_item", food_item);
    const response = await fetch(`/user_meal/calories/`, {
        method: 'POST', // tak naprawde to GET hehe
        headers: {
            'Authorization': `Bearer ${csrftoken}`
        },
        body,
    });
    return await response.json();
}

export async function getExerciseId(exercise) {
    const csrftoken = localStorage.getItem('token');
    const body = new FormData();
    body.append("exercise", exercise);
    const response = await fetch(`/user_exercise/calories/`, {
        method: 'POST', // tak naprawde to GET hehe
        headers: {
            'Authorization': `Bearer ${csrftoken}`
        },
        body,
    });
    return await response.json();
}

export function getTodaysDate() {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}