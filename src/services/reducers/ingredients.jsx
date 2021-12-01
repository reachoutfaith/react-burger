import {
    GET_BURGER_INGREDIENTS_REQUEST,
    GET_BURGER_INGREDIENTS_SUCCESS,
    GET_BURGER_INGREDIENTS_ERROR,
    SEND_ORDER_ITEMS_REQUEST,
    SEND_ORDER_ITEMS_SUCCESS,
    SEND_ORDER_ITEMS_ERROR,
    ADD_BURGER_INGREDIENT,
    DELETE_BURGER_INGREDIENT,
    ADD_BUN,
    CHANGE_INGREDIENTS_POSITION,
    ADD_ITEM_TO_COUNTER,
    DELETE_ITEM_FROM_COUNTER
} from '../actions/ingredients';

import initialState from '../store';


export const ingredientsReducer = (state = initialState, action) => {
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




