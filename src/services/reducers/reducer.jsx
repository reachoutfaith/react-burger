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
    DELETE_ITEM_FROM_COUNTER
} from '../actions/actions';

const initialStore = {
    ingredients: [],
    currentIngredients: [],
    ingredient: {},
    order: {},
    ingredientsRequest: false,
    ingredientsSuccess: false,
    ingredientsFailed: false,
    totalPrice: 0,
    bun: {},
    isBunAdded: false,
    sendOrderRequest: false,
    sendOrderSuccess: false,
    sendOrderFailed: false,
    counterIngredients: []
}


export const ingredientsReducer = (state = initialStore, action) => {
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
        case SEND_ORDER_ITEMS_REQUEST: {
            return { ...state, sendOrderRequest: true }
        }
        case SEND_ORDER_ITEMS_SUCCESS: {
            return { ...state, sendOrderSuccess: true, sendOrderRequest: false, order: action.order }
        }
        case SEND_ORDER_ITEMS_ERROR: {
            return { ...state, sendOrderFailed: true, sendOrderRequest: false }
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
        default: {
            return state;
        }
    }
}

export const currentIngredientsReducer = (state = initialStore, action) => {

    switch (action.type) {
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
                currentIngredients: action.ingredients

            }
        }
        default: {
            return state;
        }
    }
}

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    currentIngredients: currentIngredientsReducer

});
