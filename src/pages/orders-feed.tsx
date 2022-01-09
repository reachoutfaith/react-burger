import React, { useEffect, useMemo, FC } from 'react';
import style from './orders-feed.module.css';
import OrderCutMode from '../components/orders-feed/order-cut-mode';
import { useSelector, useDispatch } from '../services/hooks';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/constants/socket';
import { WS_URL } from '../services/API';


const OrdersFeedPage: FC = () => {
    const dispatch = useDispatch();
    const total = useSelector((store) => store.orders.total);
    const totalToday = useSelector((store) => store.orders.totalToday);
    const orders = useSelector((store) => store.orders.orders);

    const ordersDone = useMemo(() => {
        return orders.filter(item => item.status === 'done').slice(0, 5);
    }, [orders]);

    const ordersInProgress = useMemo(() => {
        return orders.filter(item => item.status === 'pending').slice(0, 10);
    }, [orders]);

    // web socket connection on load
    useEffect(() => {

        dispatch({ type: WS_CONNECTION_START, payload: `${WS_URL}/all` });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        };
    }, []);


    return (
        <div className={`${style.wrapper}`}>
            <h1 className="mt-10 text text_type_main-large">Лента заказов</h1>
            <div className={`${style.feed__wrapper}`}>
                <ul className={`${style.feed__list}`}>
                    {orders.map((item, index) => {
                        return <li className={`${style.feed__listItem} mb-4`} key={item._id + index}>
                            <OrderCutMode
                                _id={item._id}
                                createdAt={item.createdAt}
                                updatedAt={item.updatedAt}
                                status={item.status}
                                number={item.number}
                                name={item.name}
                                ingredients={item.ingredients} />
                        </li>
                    })}
                </ul>
                <div className={`${style.tracker} ml-15`}>
                    <div className={`${style.tracker__ordersWrapper}`}>
                        <div className={`${style.tracker__orders} mr-9`}>
                            <span className={`text text_type_main-medium ${style.tracker__orderTitle} mb-6 `}>Готовы:</span>
                            <ul className={`${style.tracker__orderList}`}>
                                {ordersDone.map((item, index) => (
                                    <li key={item._id + index} className={`text text_type_main-default ${style.tracker__orderListItem} ${style.tracker__orderListItemDone} mb-2`}>{item.number}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={`${style.tracker__orders}`}>
                            <span className={`text text_type_main-medium ${style.tracker__orderTitle} mb-6`}>В работе:</span>
                            <ul className={`${style.tracker__orderList}`}>
                                {ordersInProgress.map((item, index) => (
                                    <li key={item._id + index} className={`text text_type_main-default ${style.tracker__orderListItem} mb-2`}>{item.number}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={`${style.tracker__info} mt-15`}>
                        <span className={`text text_type_main-medium ${style.tracker__infoTitle}`}>Выполенено за все время:</span>
                        <span className={` text text_type_digits-large ${style.tracker__infoText}`}>{total}</span>
                    </div>
                    <div className={`${style.tracker__info} mt-15`}>
                        <span className={`text text_type_main-medium ${style.tracker__infoTitle}`}>Выполнено за сегодня:</span>
                        <span className={`text text_type_digits-large ${style.tracker__infoText}`}>{totalToday}</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default OrdersFeedPage;