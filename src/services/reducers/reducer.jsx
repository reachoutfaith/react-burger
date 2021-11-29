import { combineReducers } from 'redux';
import {
    GET_BURGER_INGREDIENTS_REQUEST,
    GET_BURGER_INGREDIENTS_SUCCESS,
    GET_BURGER_INGREDIENTS_ERROR,
    SHOW_INGREDIENT,
    DELETE_INGREDIENT,
    SEND_ORDER_ITEMS_REQUEST,
    SEND_ORDER_ITEMS_SUCCESS,
    SEND_ORDER_ITEMS_ERROR,
    ADD_BURGER_INGREDIENT,
    DELETE_BURGER_INGREDIENT,
    ADD_BUN,
    CHANGE_INGREDIENTS_POSITION,
    ADD_ITEM_TO_COUNTER,
    DELETE_ITEM_FROM_COUNTER,
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
} from '../actions/actions';
import store from '../store'


export const ingredientsReducer = (state = store, action) => {
    switch (action.type) {
        case GET_BURGER_INGREDIENTS_REQUEST: {
            return { ...state, ingredientsRequest: true }
        }
        case GET_BURGER_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsSuccess: true,
                ingredientsRequest: false,
                ingredients: [...action.ingredients],
                counterIngredients: [...action.ingredients]
            }
        }
        case GET_BURGER_INGREDIENTS_ERROR: {
            return { ...state, ingredientsFailed: true, ingredientsRequest: false }
        }
        case SHOW_INGREDIENT: {
            return { ...state, ingredient: action.ingredient }
        }
        case DELETE_INGREDIENT: {
            return { ...state, ingredient: {} }
        }
        case ADD_ITEM_TO_COUNTER: {
            return {
                ...state,
                counterIngredients: [...action.copiedCounterArray]
            }
        }
        case DELETE_ITEM_FROM_COUNTER: {
            return {
                ...state,
                counterIngredients: action.copiedCounterArray
            }
        }
        case SEND_ORDER_ITEMS_REQUEST: {
            return { ...state, sendOrderRequest: true }
        }
        case SEND_ORDER_ITEMS_SUCCESS: {
            return {
                ...state, sendOrderSuccess: true, sendOrderRequest: false, order: action.order,
                currentIngredients: [],
                bun: {},
                isBunAdded: false,
                totalPrice: 0,
                counterIngredients: [...state.counterIngredients].map(item => item = { ...item, counter: 0 })
            }
        }
        case SEND_ORDER_ITEMS_ERROR: {
            return { ...state, sendOrderFailed: true, sendOrderRequest: false }
        }
        case ADD_BURGER_INGREDIENT: {
            return {
                ...state,
                currentIngredients: [...state.currentIngredients, action.item],
                totalPrice: state.totalPrice + action.item["price"]
            }
        }
        case DELETE_BURGER_INGREDIENT: {
            return {
                ...state,
                currentIngredients: [...state.currentIngredients.slice(0, action.elemIndex),
                ...state.currentIngredients.slice(action.elemIndex + 1)],
                totalPrice: state.totalPrice - action.item["price"]
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: { ...action.item },
                isBunAdded: true,
                totalPrice: state.totalPrice + action.item["price"] * 2
            }
        }
        case CHANGE_INGREDIENTS_POSITION: {
            return {
                ...state,
                currentIngredients: [...action.newCards]

            }
        }
        default: {
            return state;
        }
    }
}


export const profileReducer = (state = store, action) => {
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

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    profile: profileReducer
});
