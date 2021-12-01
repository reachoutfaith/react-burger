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
    LOGOUT_SUCCESS
} from '../actions/user';

import initialState from '../store';

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_PASSWORD_REQUEST: {
            return {
                ...state,
                savePasswordRequest: true
            }
        }
        case SAVE_PASSWORD_SUCCESS: {
            return {
                ...state,
                savePasswordRequest: false,
                savePasswordSuccess: true,
                user: { ...state.user, password: action.password }
            }
        }
        case SAVE_PASSWORD_ERROR: {
            return {
                ...state,
                savePasswordRequest: false,
                savePasswordFailed: true,
                errorMessage: action.errorMessage

            }
        }
        case CREATE_USER_REQUEST: {
            return {
                ...state,
                createUserRequest: true,
                isAuthenticated: false
            }
        }
        case CREATE_USER_SUCCESS: {
            return {
                ...state,
                createUserRequest: false,
                createUserSuccess: true,
                user: action.user,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                isAuthenticated: true

            }
        }
        case CREATE_USER_ERROR: {
            return {
                ...state,
                createUserRequest: false,
                createUserFailed: true,
                isAuthenticated: false,
                errorMessage: action.errorMessage
            }
        }
        case LOGIN_USER_REQUEST: {
            return {
                ...state,
                loginUserRequest: true,
                isAuthenticated: false
            }
        }
        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                loginUserRequest: false,
                loginUserSuccess: true,
                isAuthenticated: true,
                user: action.user

            }
        }
        case LOGIN_USER_ERROR: {
            return {
                ...state,
                loginUserRequest: false,
                loginUserFailed: true,
                isAuthenticated: false,
                errorMessage: action.errorMessage
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserSuccess: true,
                user: { ...action.user },
                isAuthenticated: true
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                updateUserSuccess: true,
                user: { ...action.user }
            }
        }
        case UPDATE_USER_ERROR: {
            return {
                ...state,
                updateUserSuccess: false,
                errorMessage: action.errorMessage
            }
        }
        case REFRESH_TOKEN_REQUEST: {
            return {
                ...state,
                refreshTokenRequest: true
            }
        }
        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenSuccess: true,
                isAuthenticated: true,
                user: { ...action.user }
            }
        }
        case REFRESH_TOKEN_ERROR: {
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenFailed: true,
                isAuthenticated: false,
                errorMessage: action.errorMessage
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutSuccess: true,
                isAuthenticated: false,
                user: {}
            }
        }
        default: {
            return state;
        }
    }
}
