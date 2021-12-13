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

type IReturn = {
    success?: boolean;
    message?: string;
    [key: string]: any
}


export const checkResponse = (res: CustomResponse<JSON>) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(`Ошибка ${res.status}`));
};

export const URL = 'https://norma.nomoreparties.space/api';

export const fetchIngredients = async (): Promise<IReturn> => {
    const data = await fetch(URL + '/ingredients').then(checkResponse);
    return data
}

export const fetchOrderIngredients = async (orderItems: TItem[]): Promise<IReturn> => {
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

export const resetPasswordRequest = async (email: { email: string }): Promise<IReturn> => {
    const data = await fetch(URL + '/password-reset', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    }).then(checkResponse);

    return data
}


export const saveNewPasswordRequest = async (form: { password: string, token: string }): Promise<IReturn> => {
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

export const createUser = async (form: { email: string, password: string, name: string }): Promise<IReturn> => {
    const data = await fetch(URL + '/auth/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    }).then(checkResponse);


    return data
}

export const loginUser = async (form: { email: string, password: string }): Promise<IReturn> => {
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

    return data
}

export const logoutUser = async (): Promise<IReturn> => {
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


export const getUserInfo = async (): Promise<IReturn> => {
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

export const refreshToken = async (token: string): Promise<IReturn> => {
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

    return data
}


export const updateUser = async (form: { [key: string]: string }): Promise<IReturn> => {

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