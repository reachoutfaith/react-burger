import { getCookie } from './utils';
import { TItem } from '../components/utils/types';


interface CustomResponse<T> extends Body {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly trailer?: Promise<Headers>;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
    json(): Promise<T>;
};


export const checkResponse = (res: CustomResponse<JSON>) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(`Ошибка ${res.status}`));
};

export const URL = 'https://norma.nomoreparties.space/api';

export async function fetchIngredients() {
    const data = await fetch(URL + '/ingredients').then(checkResponse);
    return data
}

export async function fetchOrderIngredients(orderItems: TItem[]) {
    const body = { ingredients: orderItems };
    const data = await fetch(URL + '/orders', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(checkResponse);

    return data
}

export async function resetPasswordRequest(email: { email: string }) {
    const data = await fetch(URL + '/password-reset', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    }).then(checkResponse);

    return data
}


export async function saveNewPasswordRequest(form: { password: string, token: string }) {
    const data = await fetch(URL + '/password-reset/reset', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    }).then(checkResponse);

    console.log('data response ', data)
    return data
}

export async function createUser(form: { email: string, password: string, name: string }) {
    const data = await fetch(URL + '/auth/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    }).then(checkResponse);

    console.log('createUser API data ', data)
    return data
}

export async function loginUser(form: { email: string, password: string }) {
    const data = await fetch(URL + '/auth/login', {
        method: "POST",
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    }).then(checkResponse)
    console.log('login ', data)
    return data
}

export async function logoutUser() {
    const token = localStorage.getItem('refreshToken');
    const body = {
        token: token
    }
    const data = await fetch(URL + '/auth/logout', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(checkResponse);

    return data
}


export async function getUserInfo() {
    const data = await fetch(URL + '/auth/user', {
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
    }).then(checkResponse);

    return data;
}

export async function refreshToken(token: string) {
    const body = {
        token: token
    }

    const data = await fetch(URL + '/auth/token', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(checkResponse);
    //console.log('fetch refreshToken ', data)
    return data
}


export async function updateUser(form: { [key: string]: any }) {

    const data = await fetch(URL + '/auth/user', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify(form)
    }).then(checkResponse);

    return data
}