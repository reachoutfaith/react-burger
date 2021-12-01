import {
    fetchIngredients,
    fetchOrderIngredients
} from '../API';



export const GET_BURGER_INGREDIENTS_REQUEST = "GET_BURGER_INGREDIENTS_REQUEST";
export const GET_BURGER_INGREDIENTS_SUCCESS = "GET_BURGER_INGREDIENTS_SUCCESS";
export const GET_BURGER_INGREDIENTS_ERROR = "GET_BURGER_INGREDIENTS_ERROR";

export const SEND_ORDER_ITEMS_REQUEST = "SEND_ORDER_ITEMS_REQUEST";
export const SEND_ORDER_ITEMS_SUCCESS = "SEND_ORDER_ITEMS_SUCCESS";
export const SEND_ORDER_ITEMS_ERROR = "SEND_ORDER_ITEMS_ERROR";

export const ADD_BURGER_INGREDIENT = "ADD_BURGER_INGREDIENT";
export const DELETE_BURGER_INGREDIENT = 'DELETE_BURGER_INGREDIENT';
export const ADD_BUN = "ADD_BUN";
export const CHANGE_INGREDIENTS_POSITION = "CHANGE_INGREDIENTS_POSITION";

export const ADD_ITEM_TO_COUNTER = "ADD_ITEM_TO_COUNTER";
export const DELETE_ITEM_FROM_COUNTER = "DELETE_ITEM_FROM_COUNTER";


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
                    type: GET_BURGER_INGREDIENTS_ERROR
                });
            })
    };
}

