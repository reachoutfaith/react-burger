import {
    WS_CONNECTION_START,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_GET_MESSAGE
} from '../constants/socket';

import { ordersReducer } from './orders.ts';

describe('ordersReducer WebSocket on Orders Feed', () => {
    it('ordersReducer initial state', () => {
        expect(ordersReducer(undefined, {})).toEqual({
            total: 0,
            totalToday: 0,
            orders: [],
            wsConnected: false
        });
    });

    it('WS_CONNECTION_START', () => {
        expect(ordersReducer(undefined, { type: WS_CONNECTION_START })).toEqual({
            total: 0,
            totalToday: 0,
            orders: [],
            wsConnected: false
        });
    });

    it('WS_CONNECTION_SUCCESS', () => {
        expect(ordersReducer(undefined, { type: WS_CONNECTION_SUCCESS })).toEqual({
            total: 0,
            totalToday: 0,
            orders: [],
            wsConnected: true,
            error: undefined
        });
    });

    it('WS_CONNECTION_ERROR', () => {
        expect(ordersReducer(undefined, {
            type: WS_CONNECTION_ERROR,
            payload: 'error'
        })).toEqual({
            total: 0,
            totalToday: 0,
            orders: [],
            wsConnected: false,
            error: 'error'
        });
    });

    it('WS_CONNECTION_CLOSED', () => {
        expect(ordersReducer(undefined, { type: WS_CONNECTION_CLOSED })).toEqual({
            total: 0,
            totalToday: 0,
            orders: [],
            wsConnected: false,
            error: undefined
        });
    });

    it('WS_CONNECTION_GET_MESSAGE', () => {
        expect(ordersReducer(undefined, {
            type: WS_CONNECTION_GET_MESSAGE,
            payload: {
                total: 1000,
                totalToday: 1500,
                orders: [
                    { id: 1, name: 'Burger' },
                    { id: 2, name: 'Sauce' }
                ]
            }
        })).toEqual({
            total: 1000,
            totalToday: 1500,
            orders: [
                { id: 1, name: 'Burger' },
                { id: 2, name: 'Sauce' }
            ],
            wsConnected: false,
            error: undefined
        });
    });

});