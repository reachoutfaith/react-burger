import type { Middleware, MiddlewareAPI } from 'redux';
import { TWSActions } from '../actions/orders';
import { AppDispatch, RootState } from '../types/index';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_GET_MESSAGE
} from '../constants/socket';

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        return next => (action: TWSActions) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;

            if (type === WS_CONNECTION_START) socket = new WebSocket(payload);
            if (socket) {
                socket.onopen = event => dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
                socket.onerror = event => dispatch({ type: WS_CONNECTION_ERROR, payload: event });
                socket.onclose = event => dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
                socket.onmessage = event => dispatch({ type: WS_CONNECTION_GET_MESSAGE, payload: JSON.parse(event.data) });
            }
            next(action);
        };
    }) as Middleware;
};