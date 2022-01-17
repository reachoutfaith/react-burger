import {
    WS_CONNECTION_START,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_GET_MESSAGE,
    WS_CONNECTION_SEND_MESSAGE
} from '../constants/socket';

import { TCreatedOrder } from '../../components/utils/types';

// Types for Actions
interface IWSConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START,
    readonly payload: string
}

interface IWSConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED,
    readonly payload?: any
}

interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS,
    readonly payload?: any
}

interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR,
    readonly payload: Event
}

interface IWSConnectionGetMessageAction {
    readonly type: typeof WS_CONNECTION_GET_MESSAGE,
    readonly payload: {
        orders: TCreatedOrder[],
        total: number,
        totalToday: number
    }
}

interface IWSConnectionSendMessageAction {
    readonly type: typeof WS_CONNECTION_SEND_MESSAGE,
    readonly payload?: any
}



// creating Union TGetOrdersActions
export type TWSActions =
    | IWSConnectionStartAction
    | IWSConnectionClosedAction
    | IWSConnectionSuccessAction
    | IWSConnectionErrorAction
    | IWSConnectionSendMessageAction
    | IWSConnectionGetMessageAction

