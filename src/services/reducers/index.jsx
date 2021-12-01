import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { profileReducer } from '../reducers/profile';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    profile: profileReducer
});