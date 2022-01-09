// types/index.ts
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../../index';
import { TIngredientsActions } from '../actions/ingredients';
import { TUserProfileActions } from '../actions/user';
import { TWSActions } from '../actions/orders';

type TApplicationActions =
    | TIngredientsActions
    | TUserProfileActions
    | TWSActions

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
