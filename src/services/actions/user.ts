
import {
    saveNewPasswordRequest,
    createUser,
    loginUser,
    refreshToken,
    getUserInfo
} from '../API';

import { AppThunk, AppDispatch } from '../types/index';

import { setCookie } from '../utils';

import {
    SAVE_PASSWORD_REQUEST,
    SAVE_PASSWORD_SUCCESS,
    SAVE_PASSWORD_ERROR,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    GET_USER_SUCCESS,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_ERROR,
    LOGOUT_SUCCESS,
    GET_USER_REQUEST,
    GET_USER_ERROR
} from '../constants/user';

import { TUser } from '../../components/utils/types';

// Types for Actions
interface ISavePasswordRequestAction {
    readonly type: typeof SAVE_PASSWORD_REQUEST
}

interface ISavePasswordSuccessAction {
    readonly type: typeof SAVE_PASSWORD_SUCCESS
}

interface ISavePasswordErrorAction {
    readonly type: typeof SAVE_PASSWORD_ERROR,
    readonly errorMessage?: string
}

interface ICreateUserRequestAction {
    readonly type: typeof CREATE_USER_REQUEST
}

interface ICreateUserSuccessAction {
    readonly type: typeof CREATE_USER_SUCCESS,
    readonly user: TUser
}

interface ICreateUserErrorAction {
    readonly type: typeof CREATE_USER_ERROR,
    readonly errorMessage?: string
}

interface ILoginUserAction {
    readonly type: typeof LOGIN_USER_REQUEST
}

interface ILoginUserSuccessAction {
    readonly type: typeof LOGIN_USER_SUCCESS,
    readonly user: TUser
}

interface ILoginUserErrorAction {
    readonly type: typeof LOGIN_USER_ERROR,
    readonly errorMessage?: string
}

interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS,
    readonly user: TUser
}

interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST
}

interface IGetUserErrorAction {
    readonly type: typeof GET_USER_ERROR,
    readonly errorMessage?: string
}

interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS,
    readonly user: TUser
}

interface UpdateUserErrorAction {
    readonly type: typeof UPDATE_USER_ERROR,
    readonly errorMessage?: string
}

interface IRefreshTokenRequestAction {
    readonly type: typeof REFRESH_TOKEN_REQUEST
}

interface IRefreshTokenSuccessAction {
    readonly type: typeof REFRESH_TOKEN_SUCCESS,
    readonly user: TUser
}

interface IRefreshTokenErrorAction {
    readonly type: typeof REFRESH_TOKEN_ERROR,
    readonly errorMessage?: string
}

interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS
}

// creating Union TUserProfileActions
export type TUserProfileActions =
    | ISavePasswordRequestAction
    | ISavePasswordSuccessAction
    | ISavePasswordErrorAction
    | ICreateUserRequestAction
    | ICreateUserSuccessAction
    | ICreateUserErrorAction
    | ILoginUserAction
    | ILoginUserSuccessAction
    | ILoginUserErrorAction
    | IGetUserSuccessAction
    | IGetUserRequestAction
    | IGetUserErrorAction
    | IUpdateUserSuccessAction
    | UpdateUserErrorAction
    | IRefreshTokenRequestAction
    | IRefreshTokenSuccessAction
    | IRefreshTokenErrorAction
    | ILogoutSuccessAction


export const savePasswordThunk: AppThunk = (form: { password: string, token: string }) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: SAVE_PASSWORD_REQUEST
        });
        saveNewPasswordRequest(form)
            .then(res => {

                if (res && res.success) {
                    dispatch({
                        type: SAVE_PASSWORD_SUCCESS
                    });
                } else {
                    dispatch({
                        type: SAVE_PASSWORD_ERROR,
                        errorMessage: res.message
                    });
                }
            }).catch((err) => {
                console.log(err)
                dispatch({
                    type: SAVE_PASSWORD_ERROR
                });
            })
    };
}

export const createUserThunk: AppThunk = (form: { email: string, password: string, name: string }) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: CREATE_USER_REQUEST
        });
        createUser(form)
            .then(res => {
                if (res && res.success) {
                    let accessToken = res.accessToken.split('Bearer ')[1];

                    setCookie('accessToken', accessToken);
                    localStorage.setItem('refreshToken', res.refreshToken);

                    (async () => {
                        const data = await getUserInfo();
                        if (data.success === true) {
                            dispatch({
                                type: CREATE_USER_SUCCESS,
                                user: data.user
                            });
                        } else {
                            dispatch({
                                type: CREATE_USER_ERROR,
                                errorMessage: res.message
                            });
                        }
                    })();

                } else {
                    console.log('create user error ', res)
                    dispatch({
                        type: CREATE_USER_ERROR,
                        errorMessage: res.message
                    });
                }
            }).catch((err) => {
                console.log(err)
                dispatch({
                    type: CREATE_USER_ERROR
                });
            })
    };
}

export const loginUserThunk: AppThunk = (form: { email: string, password: string }) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGIN_USER_REQUEST
        });
        console.log('login user ', form)
        loginUser(form)
            .then(res => {
                if (res && res.success) {
                    console.log('success ', res)
                    let accessToken = res.accessToken.split('Bearer ')[1];

                    setCookie('accessToken', accessToken);
                    localStorage.setItem('refreshToken', res.refreshToken);

                    (async () => {
                        const data = await getUserInfo();

                        if (data.success === true) {
                            dispatch({
                                type: LOGIN_USER_SUCCESS,
                                user: data.user
                            });
                        } else {
                            dispatch({
                                type: LOGIN_USER_ERROR,
                                errorMessage: res.message
                            });
                        }
                    })();

                } else {

                    dispatch({
                        type: LOGIN_USER_ERROR,
                        errorMessage: res.message
                    });
                }
            }).catch((err) => {
                console.log(err);
                dispatch({
                    type: LOGIN_USER_ERROR
                });
            })
    };
}

export const refreshTokenThunk: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: REFRESH_TOKEN_REQUEST
        });
        const token = localStorage.getItem('refreshToken');
        refreshToken(token)
            .then(res => {
                console.log('refreshToken ', res)
                if (res && res.success) {
                    let accessToken = res.accessToken.split('Bearer ')[1];

                    setCookie('accessToken', accessToken, { expires: 1200 });
                    localStorage.setItem('refreshToken', res.refreshToken);

                    getUserInfo().then(data => {
                        if (data.success === true) {
                            dispatch({
                                type: REFRESH_TOKEN_SUCCESS,
                                user: data.user
                            });
                        } else {
                            console.log('refreshToken error ', data)
                            dispatch({
                                type: REFRESH_TOKEN_ERROR
                            });
                        }
                    })

                } else {
                    console.log('in error statement', res)
                    dispatch({
                        type: REFRESH_TOKEN_ERROR
                    });
                }
            }).catch((err) => {

                dispatch({
                    type: REFRESH_TOKEN_ERROR
                });
            })
    };
}


export const getUser: AppThunk = () => {
    console.log('get user thunk ')
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_USER_REQUEST
        });
        getUserInfo()
            .then(res => {
                console.log('get user body ', res)
                if (res && res.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        user: res.user
                    })
                } else {
                    console.log('in get user error statement', res)
                    dispatch({
                        type: GET_USER_ERROR
                    });
                }
            }).catch((err) => {
                console.log('in error statement catch get user', err)
                dispatch({
                    type: GET_USER_ERROR
                });
            })
    };
}
