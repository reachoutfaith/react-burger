import { TItem } from '../components/utils/types';

// Types for Initial State of the Store
export type TInitialState = {
    ingredients: TItem[];
    currentIngredients: TItem[];
    ingredient: TItem | {};
    order: number;
    ingredientsRequest: boolean;
    ingredientsSuccess: boolean;
    ingredientsFailed: boolean;
    totalPrice: number;
    bun: TItem | {};
    isBunAdded: boolean;
    sendOrderRequest: boolean;
    sendOrderSuccess: boolean;
    sendOrderFailed: boolean;
    counterIngredients: TItem[];
}


const initialState: TInitialState = {
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
};


export default initialState;