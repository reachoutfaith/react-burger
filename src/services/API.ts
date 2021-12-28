import { getCookie } from './utils';
import {
    TItem,
    TFetchResponse,
    TFetchOrderIngredients,
    TFetchSignUser,
    TRefreshToken,
    TGetUserInfo,
    TUpdateUserInfo,
    CustomResponse
} from '../components/utils/types';


export const checkResponse = (res: CustomResponse<JSON>) => {
    try {
        if (res.ok) {
            return res.json()
        } else {
            return res.json().then((err) => Promise.reject(`Ошибка ${res.status}`));
        }
    } catch (err) {
        console.log(err)
    }

    //previous solution
    // return res.ok ? res.json() : res.json().then((err) => Promise.reject(`Ошибка ${res.status}`));
};

export const URL = 'https://norma.nomoreparties.space/api';

export const fetchIngredients = async () => {
    const data = await fetch(URL + '/ingredients').then(checkResponse) as TItem[];
    return data

}

export const fetchOrderIngredients = async (orderItems: TItem[]) => {
    const body = { ingredients: orderItems };
    const data = await fetch(URL + '/orders', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(checkResponse) as TFetchOrderIngredients;

    console.log('fetch order items ', data)
    return data

}

export const resetPasswordRequest = async (email: { email: string }) => {
    const data = await fetch(URL + '/password-reset', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    }).then(checkResponse) as TFetchResponse;

    console.log('resetpassword ', data)
    return data
}


export const saveNewPasswordRequest = async (form: { password: string, token: string }) => {
    const data = await fetch(URL + '/password-reset/reset', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    }).then(checkResponse) as TFetchResponse;

    console.log('saveNewPassword ', data)
    return data
}

export const createUser = async (form: { email: string, password: string, name: string }) => {
    const data = await fetch(URL + '/auth/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    }).then(checkResponse) as TFetchSignUser;

    console.log('create User ', data)
    return data
}

export const loginUser = async (form: { email: string, password: string }) => {
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
    }).then(checkResponse) as TFetchSignUser;

    console.log('login ', data)
    return data
}

export const logoutUser = async () => {
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
    }).then(checkResponse) as TFetchResponse;

    console.log('logout user ', data)
    return data
}


export const getUserInfo = async () => {
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
    }).then(checkResponse) as TGetUserInfo;

    console.log('get user info ', data)
    return data;
}

export const refreshToken = async (token: string) => {
    const body = {
        token: token
    }

    const data = await fetch(URL + '/auth/token', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(checkResponse) as TRefreshToken;

    console.log('refreshToken ', data)
    return data
}


export const updateUser = async (form: TUpdateUserInfo) => {

    const data = await fetch(URL + '/auth/user', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify(form)
    }).then(checkResponse) as TGetUserInfo;

    console.log('update user data ', data)
    return data
}