import { ingredientsReducer } from './ingredients';
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


describe('ingredientsReducer for BurgerConstructor and BurgerIngredients', () => {
    it('ingredientsReducer initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual({
            ingredients: [],
            currentIngredients: [],
            ingredient: {},
            order: 0,
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
        });
    });

    it('GET_BURGER_INGREDIENTS_REQUEST - should send Burger Ingredients Request', () => {
        expect(ingredientsReducer(undefined, { type: GET_BURGER_INGREDIENTS_REQUEST })).toEqual({
            ingredients: [],
            currentIngredients: [],
            ingredient: {},
            order: 0,
            ingredientsRequest: true,
            ingredientsSuccess: false,
            ingredientsFailed: false,
            totalPrice: 0,
            bun: {},
            isBunAdded: false,
            sendOrderRequest: false,
            sendOrderSuccess: false,
            sendOrderFailed: false,
            counterIngredients: []
        });
    });

    it('GET_BURGER_INGREDIENTS_SUCCESS - gets success on Burger Ingredients request', () => {
        expect(ingredientsReducer(undefined, {
            type: GET_BURGER_INGREDIENTS_SUCCESS,
            ingredients: [
                {
                    _id: '60d3b41abdacab0026a733c6',
                    name: 'Краторная булка N-200i',
                    type: 'bun',
                    proteins: 80,
                    fat: 24,
                    carbohydrates: 53,
                    calories: 420,
                    price: 1255
                }
            ]
        })).toEqual({
            ingredients: [
                {
                    _id: '60d3b41abdacab0026a733c6',
                    name: 'Краторная булка N-200i',
                    type: 'bun',
                    proteins: 80,
                    fat: 24,
                    carbohydrates: 53,
                    calories: 420,
                    price: 1255
                }
            ],
            currentIngredients: [],
            ingredient: {},
            order: 0,
            ingredientsRequest: false,
            ingredientsSuccess: true,
            ingredientsFailed: false,
            totalPrice: 0,
            bun: {},
            isBunAdded: false,
            sendOrderRequest: false,
            sendOrderSuccess: false,
            sendOrderFailed: false,
            counterIngredients: [{
                _id: '60d3b41abdacab0026a733c6',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255
            }]
        });
    });

    it('GET_BURGER_INGREDIENTS_ERROR - gets error on Burger Ingredients request', () => {
        expect(ingredientsReducer(undefined, { type: GET_BURGER_INGREDIENTS_ERROR })).toEqual({
            ingredients: [],
            currentIngredients: [],
            ingredient: {},
            order: 0,
            ingredientsRequest: false,
            ingredientsSuccess: false,
            ingredientsFailed: true,
            totalPrice: 0,
            bun: {},
            isBunAdded: false,
            sendOrderRequest: false,
            sendOrderSuccess: false,
            sendOrderFailed: false,
            counterIngredients: []
        });
    });

    it('SEND_ORDER_ITEMS_REQUEST - should send request with a created Burger Constructor order', () => {
        expect(ingredientsReducer(undefined, { type: SEND_ORDER_ITEMS_REQUEST })).toEqual({
            ingredients: [],
            currentIngredients: [],
            ingredient: {},
            order: 0,
            ingredientsRequest: false,
            ingredientsSuccess: false,
            ingredientsFailed: false,
            totalPrice: 0,
            bun: {},
            isBunAdded: false,
            sendOrderRequest: true,
            sendOrderSuccess: false,
            sendOrderFailed: false,
            counterIngredients: []
        });
    });

    it('SEND_ORDER_ITEMS_SUCCESS - gets success on a created Burger Constructor order request', () => {
        expect(ingredientsReducer(undefined, {
            type: SEND_ORDER_ITEMS_SUCCESS, order: 1000
        })).toEqual({
            ingredients: [],
            currentIngredients: [],
            ingredient: {},
            order: 1000,
            ingredientsRequest: false,
            ingredientsSuccess: false,
            ingredientsFailed: false,
            totalPrice: 0,
            bun: {},
            isBunAdded: false,
            sendOrderRequest: false,
            sendOrderSuccess: true,
            sendOrderFailed: false,
            counterIngredients: []
        });
    });

    it('SEND_ORDER_ITEMS_ERROR - gets error on a created Burger Constructor order request', () => {
        expect(ingredientsReducer(undefined, { type: SEND_ORDER_ITEMS_ERROR })).toEqual({
            ingredients: [],
            currentIngredients: [],
            ingredient: {},
            order: 0,
            ingredientsRequest: false,
            ingredientsSuccess: false,
            ingredientsFailed: false,
            totalPrice: 0,
            bun: {},
            isBunAdded: false,
            sendOrderRequest: false,
            sendOrderSuccess: false,
            sendOrderFailed: true,
            counterIngredients: []
        });
    });

    it('ADD_BURGER_INGREDIENT - add burger Ingredient to Burger Constructor', () => {
        expect(ingredientsReducer(undefined, {
            type: ADD_BURGER_INGREDIENT,
            item: {
                id: '1',
                name: 'Соус фирменный Space Sauce',
                type: 'sauce',
                price: 1000
            },
            price: 100
        })).toEqual({
            ingredients: [],
            currentIngredients: [{
                id: '1',
                name: 'Соус фирменный Space Sauce',
                type: 'sauce',
                price: 1000
            }],
            ingredient: {},
            order: 0,
            ingredientsRequest: false,
            ingredientsSuccess: false,
            ingredientsFailed: false,
            totalPrice: 100,
            bun: {},
            isBunAdded: false,
            sendOrderRequest: false,
            sendOrderSuccess: false,
            sendOrderFailed: false,
            counterIngredients: []
        });
    });

    it('DELETE_BURGER_INGREDIENT - remove burger Ingredient to Burger Constructor', () => {
        expect(ingredientsReducer({
            ingredients: [],
            currentIngredients: [
                {
                    id: '1',
                    name: 'Соус фирменный Space Sauce',
                    type: 'sauce', price: 1000,
                    key: '1'
                },
                {
                    id: '2',
                    name: 'Соус фирменный Space Sauce',
                    type: 'sauce', price: 1000,
                    key: '2'
                }
            ],
            ingredient: {},
            order: 0,
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
        }, {
            type: DELETE_BURGER_INGREDIENT,
            elemIndex: 0,
            price: 100
        })).toEqual({
            ingredients: [],
            currentIngredients: [
                {
                    id: '2',
                    name: 'Соус фирменный Space Sauce',
                    type: 'sauce',
                    price: 1000,
                    key: '2'
                }
            ],
            ingredient: {},
            order: 0,
            ingredientsRequest: false,
            ingredientsSuccess: false,
            ingredientsFailed: false,
            totalPrice: -100,
            bun: {},
            isBunAdded: false,
            sendOrderRequest: false,
            sendOrderSuccess: false,
            sendOrderFailed: false,
            counterIngredients: []
        });
    });

    it('ADD_BUN - bun is added to Burger Constructor', () => {
        expect(ingredientsReducer(undefined, {
            type: ADD_BUN,
            item: {
                _id: '60d3b41abdacab0026a733c6',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255
            },
            price: 1255
        })).toEqual({
            ingredients: [],
            currentIngredients: [],
            ingredient: {},
            order: 0,
            ingredientsRequest: false,
            ingredientsSuccess: false,
            ingredientsFailed: false,
            totalPrice: 1255 * 2,
            bun: {
                _id: '60d3b41abdacab0026a733c6',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255
            },
            isBunAdded: true,
            sendOrderRequest: false,
            sendOrderSuccess: false,
            sendOrderFailed: false,
            counterIngredients: []
        });
    });

    it('CHANGE_INGREDIENTS_POSITION - change elements positions in Burger Constructor', () => {
        expect(ingredientsReducer({
            ingredients: [],
            currentIngredients: [
                {
                    id: '1',
                    name: 'Соус фирменный Space Sauce',
                    type: 'sauce', price: 1000,
                    key: '1'
                },
                {
                    id: '2',
                    name: 'Соус фирменный Space Sauce',
                    type: 'sauce', price: 1000,
                    key: '2'
                }
            ],
            ingredient: {},
            order: 0,
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
        }, {
            type: CHANGE_INGREDIENTS_POSITION,
            newCards: [
                {
                    id: '2',
                    name: 'Соус фирменный Space Sauce',
                    type: 'sauce', price: 1000,
                    key: '2'
                },
                {
                    id: '1',
                    name: 'Соус фирменный Space Sauce',
                    type: 'sauce', price: 1000,
                    key: '1'
                }
            ]
        })).toEqual({
            ingredients: [],
            currentIngredients: [{
                id: '2',
                name: 'Соус фирменный Space Sauce',
                type: 'sauce', price: 1000,
                key: '2'
            },
            {
                id: '1',
                name: 'Соус фирменный Space Sauce',
                type: 'sauce', price: 1000,
                key: '1'
            }],
            ingredient: {},
            order: 0,
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
        });
    });

    it('ADD_ITEM_TO_COUNTER - increase Burger Ingredient counter +1', () => {
        expect(ingredientsReducer({
            ingredients: [],
            currentIngredients: [],
            ingredient: {},
            order: 0,
            ingredientsRequest: false,
            ingredientsSuccess: false,
            ingredientsFailed: false,
            totalPrice: 0,
            bun: {},
            isBunAdded: false,
            sendOrderRequest: false,
            sendOrderSuccess: false,
            sendOrderFailed: false,
            counterIngredients: [{
                _id: '60d3b41abdacab0026a733c6',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255
            }]
        }, {
            type: ADD_ITEM_TO_COUNTER,
            copiedCounterArray: [
                {
                    _id: '60d3b41abdacab0026a733c6',
                    name: 'Краторная булка N-200i',
                    type: 'bun',
                    proteins: 80,
                    fat: 24,
                    carbohydrates: 53,
                    calories: 420,
                    price: 1255,
                    count: 1
                }
            ]
        })).toEqual({
            ingredients: [],
            currentIngredients: [],
            ingredient: {},
            order: 0,
            ingredientsRequest: false,
            ingredientsSuccess: false,
            ingredientsFailed: false,
            totalPrice: 0,
            bun: {},
            isBunAdded: false,
            sendOrderRequest: false,
            sendOrderSuccess: false,
            sendOrderFailed: false,
            counterIngredients: [{
                _id: '60d3b41abdacab0026a733c6',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                count: 1
            }]
        });
    });

    it('DELETE_ITEM_FROM_COUNTER - increase Burger Ingredient counter -1', () => {
        expect(ingredientsReducer({
            ingredients: [],
            currentIngredients: [],
            ingredient: {},
            order: 0,
            ingredientsRequest: false,
            ingredientsSuccess: false,
            ingredientsFailed: false,
            totalPrice: 0,
            bun: {},
            isBunAdded: false,
            sendOrderRequest: false,
            sendOrderSuccess: false,
            sendOrderFailed: false,
            counterIngredients: [{
                _id: '60d3b41abdacab0026a733c6',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                count: 2
            }]
        }, {
            type: DELETE_ITEM_FROM_COUNTER,
            copiedCounterArray: [
                {
                    _id: '60d3b41abdacab0026a733c6',
                    name: 'Краторная булка N-200i',
                    type: 'bun',
                    proteins: 80,
                    fat: 24,
                    carbohydrates: 53,
                    calories: 420,
                    price: 1255,
                    count: 1
                }
            ]
        })).toEqual({
            ingredients: [],
            currentIngredients: [],
            ingredient: {},
            order: 0,
            ingredientsRequest: false,
            ingredientsSuccess: false,
            ingredientsFailed: false,
            totalPrice: 0,
            bun: {},
            isBunAdded: false,
            sendOrderRequest: false,
            sendOrderSuccess: false,
            sendOrderFailed: false,
            counterIngredients: [{
                _id: '60d3b41abdacab0026a733c6',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                count: 1
            }]
        });
    });

});