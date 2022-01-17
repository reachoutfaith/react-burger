import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { profileReducer } from './profile';
import { ordersReducer } from './orders';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    profile: profileReducer,
    orders: ordersReducer
});