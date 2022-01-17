import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../types/index';
import { TWSActions } from '../actions/orders';

export const socketMiddleware = (wsActions: any): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        return next => (action: TWSActions) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { WSStart, WSSend, WSonOpen, WSonClose, WSonError, WSonMessage } = wsActions;

            if (type === WSStart) socket = new WebSocket(payload);

            if (socket) {
                socket.onopen = event => dispatch({ type: WSonOpen, payload: event });
                socket.onerror = event => dispatch({ type: WSonError, payload: event });
                socket.onclose = event => dispatch({ type: WSonClose, payload: event });
                socket.onmessage = event => dispatch({ type: WSonMessage, payload: JSON.parse(event.data) });
            }
            next(action);
        };
    }) as Middleware;
};