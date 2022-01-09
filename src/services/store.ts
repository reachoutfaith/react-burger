import { TItem, TFetchOrderIngredients, TUser, TOrder, TFetchResponse } from '../components/utils/types';

// Types for Initial State of the Store
export type TInitialState = {
    ingredients: TItem[];
    currentIngredients: TItem[];
    ingredient: TItem | {};
    order: string | number | undefined;
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
    savePasswordRequest: boolean;
    savePasswordSuccess: boolean;
    savePasswordFailed: boolean;
    createUserRequest: boolean;
    createUserSuccess: boolean;
    createUserFailed: boolean;
    loginUserRequest: boolean;
    loginUserSuccess: boolean;
    loginUserFailed: boolean;
    user: TUser | {},
    isAuthenticated: boolean;
    errorMessage: string | undefined;
    getUserRequest: boolean;
    getUserSuccess: boolean;
    getUserFailed: boolean;
    updateUserSuccess: boolean;
    refreshTokenRequest: boolean;
    refreshTokenSuccess: boolean;
    refreshTokenFailed: boolean;
    logoutSuccess: boolean;
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
    counterIngredients: [],
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
    getUserFailed: false,
    updateUserSuccess: false,
    refreshTokenRequest: false,
    refreshTokenSuccess: false,
    refreshTokenFailed: false,
    logoutSuccess: false
};


export default initialState;