import {
    fetchIngredients,
    fetchOrderIngredients,
    //resetPasswordRequest,
    saveNewPasswordRequest,
    createUser,
    loginUser,
    //getUserInfo,
    refreshToken,
    getUserInfo,
    signOut
} from '../API';

import { setCookie, deleteCookie } from '../utils';

export const GET_BURGER_INGREDIENTS_REQUEST = "GET_BURGER_INGREDIENTS_REQUEST";
export const GET_BURGER_INGREDIENTS_SUCCESS = "GET_BURGER_INGREDIENTS_SUCCESS";
export const GET_BURGER_INGREDIENTS_ERROR = "GET_BURGER_INGREDIENTS_ERROR";

export const SHOW_INGREDIENT = "SHOW_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";

export const SEND_ORDER_ITEMS_REQUEST = "SEND_ORDER_ITEMS_REQUEST";
export const SEND_ORDER_ITEMS_SUCCESS = "SEND_ORDER_ITEMS_SUCCESS";
export const SEND_ORDER_ITEMS_ERROR = "SEND_ORDER_ITEMS_ERROR";

export const ADD_BURGER_INGREDIENT = "ADD_BURGER_INGREDIENT";
export const DELETE_BURGER_INGREDIENT = 'DELETE_BURGER_INGREDIENT';
export const ADD_BUN = "ADD_BUN";
export const CHANGE_INGREDIENTS_POSITION = "CHANGE_INGREDIENTS_POSITION";

export const ADD_ITEM_TO_COUNTER = "ADD_ITEM_TO_COUNTER";
export const DELETE_ITEM_FROM_COUNTER = "DELETE_ITEM_FROM_COUNTER";

export const SAVE_PASSWORD_REQUEST = "SAVE_PASSWORD_REQUEST";
export const SAVE_PASSWORD_SUCCESS = "SAVE_PASSWORD_SUCCESS";
export const SAVE_PASSWORD_ERROR = "SAVE_PASSWORD_ERROR";

export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_ERROR = "CREATE_USER_ERROR";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";

// export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
// export const GET_USER_ERROR = "GET_USER_ERROR";

export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_ERROR = "REFRESH_TOKEN_ERROR";


// export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
// export const LOGOUT_ERROR = "LOGOUT_ERROR";

export function getIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_BURGER_INGREDIENTS_REQUEST
        });
        fetchIngredients()
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_BURGER_INGREDIENTS_SUCCESS,
                        ingredients: res.data
                    });
                } else {
                    dispatch({
                        type: GET_BURGER_INGREDIENTS_ERROR
                    });
                }
            }).catch((err) => {
                console.log(err)
                dispatch({
                    type: GET_BURGER_INGREDIENTS_ERROR
                });
            })
    };
}

export function sendOrderItems(items) {
    return function (dispatch) {
        dispatch({
            type: SEND_ORDER_ITEMS_REQUEST
        });
        fetchOrderIngredients(items)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: SEND_ORDER_ITEMS_SUCCESS,
                        order: res.order
                    });
                } else {
                    dispatch({
                        type: SEND_ORDER_ITEMS_ERROR
                    });
                }
            }).catch((err) => {
                console.log(err)
                dispatch({
                    type: SEND_ORDER_ITEMS_ERROR
                });
            })
    };
}


// export function resetPasswordThunk(email) {
//     return function (dispatch) {
//         dispatch({
//             type: RESET_PASSWORD_REQUEST
//         });
//         resetPasswordRequest(email)
//             .then(res => {
//                 if (res && res.success) {
//                     dispatch({
//                         type: RESET_PASSWORD_SUCCESS
//                     });
//                 } else {
//                     dispatch({
//                         type: RESET_PASSWORD_ERROR
//                     });
//                 }
//             }).catch((err) => {
//                 console.log(err)
//                 dispatch({
//                     type: RESET_PASSWORD_ERROR
//                 });
//             })
//     };
// }



export function savePasswordThunk(form) {
    return function (dispatch) {
        dispatch({
            type: SAVE_PASSWORD_REQUEST
        });
        saveNewPasswordRequest(form)
            .then(res => {

                if (res && res.success) {
                    dispatch({
                        type: SAVE_PASSWORD_SUCCESS,
                        password: form.password
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

export function createUserThunk(form) {
    return function (dispatch) {
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

export function loginUserThunk(form) {
    return function (dispatch) {
        dispatch({
            type: LOGIN_USER_REQUEST
        });
        loginUser(form)
            .then(res => {
                if (res && res.success) {
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
                console.log(err)
                dispatch({
                    type: LOGIN_USER_ERROR
                });
            })
    };
}

export function refreshTokenThunk() {
    return function (dispatch) {
        dispatch({
            type: REFRESH_TOKEN_REQUEST
        });
        const token = localStorage.getItem('refreshToken');
        refreshToken(token)
            .then(res => {

                if (res && res.success) {
                    let accessToken = res.accessToken.split('Bearer ')[1];

                    setCookie('accessToken', accessToken, { expires: 1200 });
                    localStorage.setItem('refreshToken', res.refreshToken);

                    const data = getUserInfo().then(data => {
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
                //console.log(err)
                dispatch({
                    type: REFRESH_TOKEN_ERROR
                });
            })
    };
}

// export function logoutThunk() {
//     return function (dispatch) {
//         dispatch({
//             type: LOGOUT_REQUEST
//         });
//         const token = localStorage.getItem('refreshToken');
//         signOut(token)
//             .then(res => {

//                 if (res && res.success) {
//                     deleteCookie('accessToken');

//                     dispatch({
//                         type: LOGOUT_SUCCESS
//                     });

//                 } else {
//                     dispatch({
//                         type: LOGOUT_ERROR,
//                         errorMessage: data.message
//                     });
//                 }
//             }).catch((err) => {
//                 console.log(err)
//                 dispatch({
//                     type: LOGOUT_ERROR
//                 });
//             })
//     };
// }
