import {
    fetchIngredients,
    fetchOrderIngredients
} from '../API';

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
} from '../constants/ingredients';

import { TItem, TOrder } from '../../components/utils/types';
import { AppThunk, AppDispatch } from '../types/index';

// Types for Actions
interface IGetBurgerIngredientsRequestAction {
    readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST
}

interface IGetBurgerIngredientsSuccessAction {
    readonly type: typeof GET_BURGER_INGREDIENTS_SUCCESS,
    readonly ingredients: TItem[]
}

interface IGetBurgerIngredientsErrorAction {
    readonly type: typeof GET_BURGER_INGREDIENTS_ERROR
}

interface IAddItemToCounterAction {
    readonly type: typeof ADD_ITEM_TO_COUNTER,
    copiedCounterArray: TItem[]
}

interface IDeleteItemFromCounterAction {
    readonly type: typeof DELETE_ITEM_FROM_COUNTER,
    copiedCounterArray: TItem[]
}

interface ISendOrderItemsRequestAction {
    readonly type: typeof SEND_ORDER_ITEMS_REQUEST
}

interface ISendOrderItemsSuccessAction {
    readonly type: typeof SEND_ORDER_ITEMS_SUCCESS,
    readonly order: number
}

interface ISendOrderItemsErrorAction {
    readonly type: typeof SEND_ORDER_ITEMS_ERROR
}

interface IAddBurgerIngredientAction {
    readonly type: typeof ADD_BURGER_INGREDIENT,
    readonly item: TItem,
    readonly price: number
}

interface IDeleteBurgerIngredientAction {
    readonly type: typeof DELETE_BURGER_INGREDIENT,
    readonly elemIndex: number,
    readonly price: number
}

interface IAddBunAction {
    readonly type: typeof ADD_BUN,
    readonly item: TItem,
    readonly price: number
}

interface IChangeIngredientsPositionAction {
    readonly type: typeof CHANGE_INGREDIENTS_POSITION,
    readonly newCards: TItem[]
}


// creating Union TIngredientsActions
export type TIngredientsActions =
    | IGetBurgerIngredientsRequestAction
    | IGetBurgerIngredientsSuccessAction
    | IGetBurgerIngredientsErrorAction
    | IAddItemToCounterAction
    | IDeleteItemFromCounterAction
    | ISendOrderItemsRequestAction
    | ISendOrderItemsSuccessAction
    | ISendOrderItemsErrorAction
    | IAddBurgerIngredientAction
    | IDeleteBurgerIngredientAction
    | IAddBunAction
    | IChangeIngredientsPositionAction


export const getIngredients: AppThunk = () => {
    return function (dispatch: AppDispatch) {
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

export const sendOrderItems: AppThunk = (items: string[]) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: SEND_ORDER_ITEMS_REQUEST
        });
        fetchOrderIngredients(items)
            .then(res => {
                if (res && res.success) {
                    console.log('res order', res.order);
                    console.log('res order number', res.order!.number, typeof res.order!.number)
                    dispatch({
                        type: SEND_ORDER_ITEMS_SUCCESS,
                        order: res.order!.number
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

