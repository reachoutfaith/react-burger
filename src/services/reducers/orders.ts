import {
    WS_CONNECTION_START,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_GET_MESSAGE,
    WS_CONNECTION_SEND_MESSAGE
} from '../constants/socket';

import { TCreatedOrder } from '../../components/utils/types';

import { TWSActions } from '../actions/orders';


type TInitialState = {
    total: number;
    totalToday: number;
    orders: TCreatedOrder[];
    wsConnected: boolean;
    error?: Event;
};

const initialState: TInitialState = {
    total: 0,
    totalToday: 0,
    orders: [],
    wsConnected: false
};

export const ordersReducer = (state = initialState, action: TWSActions): TInitialState => {
    switch (action.type) {
        case WS_CONNECTION_START: {
            return {
                ...state,
                wsConnected: false
            };
        }
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };
        }
        case WS_CONNECTION_GET_MESSAGE: {
            return {
                ...state,
                error: undefined,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
                orders: action.payload.orders
            };
        }
        default: {
            return state;
        }
    }
};