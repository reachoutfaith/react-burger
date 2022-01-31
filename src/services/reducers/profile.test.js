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
    GET_USER_REQUEST,
    GET_USER_ERROR,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_ERROR,
    LOGOUT_SUCCESS
} from '../constants/user';
import { profileReducer } from './profile.ts';

describe('profileReducer for BurgerConstructor and BurgerIngredients', () => {
    it('profileReducer initial state', () => {
        expect(profileReducer(undefined, {})).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: false,
            savePasswordFailed: false,
            createUserRequest: false,
            createUserSuccess: false,
            createUserFailed: false,
            loginUserRequest: false,
            loginUserSuccess: false,
            loginUserFailed: false,
            user: {},
            isAuthenticated: false,
            errorMessage: '',
            getUserRequest: false,
            getUserSuccess: false,
            getUserError: false,
            updateUserSuccess: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenFailed: false,
            logoutSuccess: false
        });
    });

    it('SAVE_PASSWORD_REQUEST - sends request to get a resolution to change password', () => {
        expect(profileReducer(undefined, { type: SAVE_PASSWORD_REQUEST })).toEqual({
            savePasswordRequest: true,
            savePasswordSuccess: false,
            savePasswordFailed: false,
            createUserRequest: false,
            createUserSuccess: false,
            createUserFailed: false,
            loginUserRequest: false,
            loginUserSuccess: false,
            loginUserFailed: false,
            user: {},
            isAuthenticated: false,
            errorMessage: '',
            getUserRequest: false,
            getUserSuccess: false,
            getUserError: false,
            updateUserSuccess: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenFailed: false,
            logoutSuccess: false
        });
    });

    it('SAVE_PASSWORD_SUCCESS - gets success when tries to get a resolution to change password', () => {
        expect(profileReducer(undefined, { type: SAVE_PASSWORD_SUCCESS })).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: true,
            savePasswordFailed: false,
            createUserRequest: false,
            createUserSuccess: false,
            createUserFailed: false,
            loginUserRequest: false,
            loginUserSuccess: false,
            loginUserFailed: false,
            user: {},
            isAuthenticated: false,
            errorMessage: '',
            getUserRequest: false,
            getUserSuccess: false,
            getUserError: false,
            updateUserSuccess: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenFailed: false,
            logoutSuccess: false
        });
    });

    it(' SAVE_PASSWORD_ERROR - gets error when tries to get a resolution to change password', () => {
        expect(profileReducer(undefined, {
            type: SAVE_PASSWORD_ERROR,
            errorMessage: 'access denied, try to login'
        })).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: false,
            savePasswordFailed: true,
            createUserRequest: false,
            createUserSuccess: false,
            createUserFailed: false,
            loginUserRequest: false,
            loginUserSuccess: false,
            loginUserFailed: false,
            user: {},
            isAuthenticated: false,
            errorMessage: 'access denied, try to login',
            getUserRequest: false,
            getUserSuccess: false,
            getUserError: false,
            updateUserSuccess: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenFailed: false,
            logoutSuccess: false
        });
    });

    it('CREATE_USER_REQUEST - sends request to create a new user', () => {
        expect(profileReducer(undefined, { type: CREATE_USER_REQUEST })).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: false,
            savePasswordFailed: false,
            createUserRequest: true,
            createUserSuccess: false,
            createUserFailed: false,
            loginUserRequest: false,
            loginUserSuccess: false,
            loginUserFailed: false,
            user: {},
            isAuthenticated: false,
            errorMessage: '',
            getUserRequest: false,
            getUserSuccess: false,
            getUserError: false,
            updateUserSuccess: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenFailed: false,
            logoutSuccess: false
        });
    });

    it('CREATE_USER_SUCCESS - gets success when tries to create a new user', () => {
        expect(profileReducer(undefined, {
            type: CREATE_USER_SUCCESS,
            user: {
                email: '123@gmail.com',
                name: 'nastya'
            }
        })).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: false,
            savePasswordFailed: false,
            createUserRequest: false,
            createUserSuccess: true,
            createUserFailed: false,
            loginUserRequest: false,
            loginUserSuccess: false,
            loginUserFailed: false,
            user: {
                email: '123@gmail.com',
                name: 'nastya'
            },
            isAuthenticated: true,
            errorMessage: '',
            getUserRequest: false,
            getUserSuccess: false,
            getUserError: false,
            updateUserSuccess: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenFailed: false,
            logoutSuccess: false
        });
    });

    it('CREATE_USER_ERROR - gets error when tries to create a new user', () => {
        expect(profileReducer(undefined, {
            type: CREATE_USER_ERROR,
            errorMessage: 'user already exists'
        })).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: false,
            savePasswordFailed: false,
            createUserRequest: false,
            createUserSuccess: false,
            createUserFailed: true,
            loginUserRequest: false,
            loginUserSuccess: false,
            loginUserFailed: false,
            user: {},
            isAuthenticated: false,
            errorMessage: 'user already exists',
            getUserRequest: false,
            getUserSuccess: false,
            getUserError: false,
            updateUserSuccess: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenFailed: false,
            logoutSuccess: false
        });
    });

    it('LOGIN_USER_REQUEST - sends request to login a user', () => {
        expect(profileReducer(undefined, {
            type: LOGIN_USER_REQUEST,
        })).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: false,
            savePasswordFailed: false,
            createUserRequest: false,
            createUserSuccess: false,
            createUserFailed: false,
            loginUserRequest: true,
            loginUserSuccess: false,
            loginUserFailed: false,
            user: {},
            isAuthenticated: false,
            errorMessage: '',
            getUserRequest: false,
            getUserSuccess: false,
            getUserError: false,
            updateUserSuccess: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenFailed: false,
            logoutSuccess: false
        });
    });

    it('LOGIN_USER_SUCCESS - gets success on login a user', () => {
        expect(profileReducer(undefined, {
            type: LOGIN_USER_SUCCESS,
            user: {
                email: '123@gmail.com',
                name: 'nastya'
            }
        })).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: false,
            savePasswordFailed: false,
            createUserRequest: false,
            createUserSuccess: false,
            createUserFailed: false,
            loginUserRequest: false,
            loginUserSuccess: true,
            loginUserFailed: false,
            user: {
                email: '123@gmail.com',
                name: 'nastya'
            },
            isAuthenticated: true,
            errorMessage: '',
            getUserRequest: false,
            getUserSuccess: false,
            getUserError: false,
            updateUserSuccess: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenFailed: false,
            logoutSuccess: false
        });
    });

    it('LOGIN_USER_ERROR - gets error on login a user', () => {
        expect(profileReducer(undefined, {
            type: LOGIN_USER_ERROR,
            errorMessage: 'wrong password'
        })).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: false,
            savePasswordFailed: false,
            createUserRequest: false,
            createUserSuccess: false,
            createUserFailed: false,
            loginUserRequest: false,
            loginUserSuccess: false,
            loginUserFailed: true,
            user: {},
            isAuthenticated: false,
            errorMessage: 'wrong password',
            getUserRequest: false,
            getUserSuccess: false,
            getUserError: false,
            updateUserSuccess: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenFailed: false,
            logoutSuccess: false
        });
    });

    it('GET_USER_REQUEST - sends request to get user info from server', () => {
        expect(profileReducer(undefined, { type: GET_USER_REQUEST })).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: false,
            savePasswordFailed: false,
            createUserRequest: false,
            createUserSuccess: false,
            createUserFailed: false,
            loginUserRequest: false,
            loginUserSuccess: false,
            loginUserFailed: false,
            user: {},
            isAuthenticated: false,
            errorMessage: '',
            getUserRequest: true,
            getUserSuccess: false,
            getUserError: false,
            updateUserSuccess: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenFailed: false,
            logoutSuccess: false
        });
    });

    it('GET_USER_SUCCESS - gets success when tries to get user info from server', () => {
        expect(profileReducer(undefined, {
            type: GET_USER_SUCCESS,
            user: {
                email: '123@gmail.com',
                name: 'nastya'
            }
        })).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: false,
            savePasswordFailed: false,
            createUserRequest: false,
            createUserSuccess: false,
            createUserFailed: false,
            loginUserRequest: false,
            loginUserSuccess: false,
            loginUserFailed: false,
            user: {
                email: '123@gmail.com',
                name: 'nastya'
            },
            isAuthenticated: true,
            errorMessage: '',
            getUserRequest: false,
            getUserSuccess: true,
            getUserError: false,
            updateUserSuccess: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenFailed: false,
            logoutSuccess: false
        });
    });

    it('GET_USER_ERROR - gets error when tries to get user info from server', () => {
        expect(profileReducer(undefined, {
            type: GET_USER_ERROR
        })).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: false,
            savePasswordFailed: false,
            createUserRequest: false,
            createUserSuccess: false,
            createUserFailed: false,
            loginUserRequest: false,
            loginUserSuccess: false,
            loginUserFailed: false,
            user: {},
            isAuthenticated: false,
            errorMessage: '',
            getUserRequest: false,
            getUserSuccess: false,
            getUserError: true,
            updateUserSuccess: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenFailed: false,
            logoutSuccess: false
        });
    });

    it('UPDATE_USER_SUCCESS - gets success on update user info', () => {
        expect(profileReducer(undefined, {
            type: UPDATE_USER_SUCCESS,
            user: {
                email: '123@gmail.com',
                name: 'nastya1'
            }
        })).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: false,
            savePasswordFailed: false,
            createUserRequest: false,
            createUserSuccess: false,
            createUserFailed: false,
            loginUserRequest: false,
            loginUserSuccess: false,
            loginUserFailed: false,
            user: {
                email: '123@gmail.com',
                name: 'nastya1'
            },
            isAuthenticated: false,
            errorMessage: '',
            getUserRequest: false,
            getUserSuccess: false,
            getUserError: false,
            updateUserSuccess: true,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenFailed: false,
            logoutSuccess: false
        });
    });


    it('UPDATE_USER_ERROR - gets error on update user info', () => {
        expect(profileReducer(undefined, {
            type: UPDATE_USER_ERROR,
            errorMessage: 'try again later'
        })).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: false,
            savePasswordFailed: false,
            createUserRequest: false,
            createUserSuccess: false,
            createUserFailed: false,
            loginUserRequest: false,
            loginUserSuccess: false,
            loginUserFailed: false,
            user: {},
            isAuthenticated: false,
            errorMessage: 'try again later',
            getUserRequest: false,
            getUserSuccess: false,
            getUserError: false,
            updateUserSuccess: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenFailed: false,
            logoutSuccess: false
        });
    });

    it('REFRESH_TOKEN_REQUEST - sends request to refresh cookie', () => {
        expect(profileReducer(undefined, { type: REFRESH_TOKEN_REQUEST })).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: false,
            savePasswordFailed: false,
            createUserRequest: false,
            createUserSuccess: false,
            createUserFailed: false,
            loginUserRequest: false,
            loginUserSuccess: false,
            loginUserFailed: false,
            user: {},
            isAuthenticated: false,
            errorMessage: '',
            getUserRequest: false,
            getUserSuccess: false,
            getUserError: false,
            updateUserSuccess: false,
            refreshTokenRequest: true,
            refreshTokenSuccess: false,
            refreshTokenFailed: false,
            logoutSuccess: false
        });
    });

    it('REFRESH_TOKEN_SUCCESS - success on refreshing the cookie', () => {
        expect(profileReducer(undefined, {
            type: REFRESH_TOKEN_SUCCESS,
            user: {
                email: '123@gmail.com',
                name: 'nastya'
            }
        })).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: false,
            savePasswordFailed: false,
            createUserRequest: false,
            createUserSuccess: false,
            createUserFailed: false,
            loginUserRequest: false,
            loginUserSuccess: false,
            loginUserFailed: false,
            user: {
                email: '123@gmail.com',
                name: 'nastya'
            },
            isAuthenticated: true,
            errorMessage: '',
            getUserRequest: false,
            getUserSuccess: false,
            getUserError: false,
            updateUserSuccess: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: true,
            refreshTokenFailed: false,
            logoutSuccess: false
        });
    });

    it('REFRESH_TOKEN_ERROR - error on refreshing the cookie', () => {
        expect(profileReducer(undefined, {
            type: REFRESH_TOKEN_ERROR,
            errorMessage: 'access denied'
        })).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: false,
            savePasswordFailed: false,
            createUserRequest: false,
            createUserSuccess: false,
            createUserFailed: false,
            loginUserRequest: false,
            loginUserSuccess: false,
            loginUserFailed: false,
            user: {},
            isAuthenticated: false,
            errorMessage: 'access denied',
            getUserRequest: false,
            getUserSuccess: false,
            getUserError: false,
            updateUserSuccess: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenFailed: true,
            logoutSuccess: false
        });
    });

    it('LOGOUT_SUCCESS - success on logout', () => {
        expect(profileReducer(undefined, { type: LOGOUT_SUCCESS })).toEqual({
            savePasswordRequest: false,
            savePasswordSuccess: false,
            savePasswordFailed: false,
            createUserRequest: false,
            createUserSuccess: false,
            createUserFailed: false,
            loginUserRequest: false,
            loginUserSuccess: false,
            loginUserFailed: false,
            user: {},
            isAuthenticated: false,
            errorMessage: '',
            getUserRequest: false,
            getUserSuccess: false,
            getUserError: false,
            updateUserSuccess: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenFailed: false,
            logoutSuccess: true
        });
    });

});