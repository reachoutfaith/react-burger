import { getCookie } from './utils';

export const URL = 'https://norma.nomoreparties.space/api';


export async function fetchIngredients() {
    const res = await fetch(URL + '/ingredients');
    const data = await res.json();
    return data
}

export async function fetchOrderIngredients(orderItems) {
    const body = { ingredients: orderItems };
    const res = await fetch(URL + '/orders', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    return data
}

export async function resetPasswordRequest(email) {
    const res = await fetch(URL + '/password-reset', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    });
    const data = await res.json();
    return data
}

export async function saveNewPasswordRequest(form) {
    console.log(form)
    const res = await fetch(URL + '/password-reset/reset', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    });
    console.log('res ', res)
    const data = await res.json();
    console.log('data response ', data)
    return data
}

export async function createUser(form) {
    console.log('form createUser ', form)
    const res = await fetch(URL + '/auth/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    });
    const data = await res.json();
    console.log('createUser API data ', data)
    return data
}

export async function loginUser(form) {
    const res = await fetch(URL + '/auth/login', {
        method: "POST",
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
    const data = await res.json();
    return data
}

export async function logoutUser() {
    const token = localStorage.getItem('refreshToken');
    const body = {
        token: token
    }
    const res = await fetch(URL + '/auth/logout', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    console.log('log out data ', data)
    return data
}


export async function getUserInfo() {
    const res = await fetch(URL + '/auth/user', {
        method: "GET",
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });


    const data = await res.json();
    console.log('fetch User ', data)
    return data;
}

export async function refreshToken(token) {
    const body = {
        token: token
    }

    const res = await fetch(URL + '/auth/token', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    console.log('fetch refreshToken ', data)
    return data
}


export async function updateUser(form) {

    const res = await fetch(URL + '/auth/user', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify(form)
    });

    const data = await res.json();

    return data
}

