import React, { FC, useEffect, useMemo } from 'react';
import style from './orders-feed.module.css';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/constants/socket';
import { WS_URL } from '../../services/API';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/hooks';
import { TItem } from '../utils/types';
import { getDate } from '../../services/utils';

const OrderFullMode: FC = () => {
    const location = useLocation<any>();
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const orders = useSelector((store) => store.orders.orders);
    const ingredients = useSelector((store) => store.ingredients.ingredients);
    const order = useMemo(() => {
        return orders.find(item => item._id === id);
    }, [id, orders]);

    // function creates an arr of exisiting ingredients of this order
    const orderIngredients = (ingredients: TItem[]) => {
        let arr: TItem[] = [];
        if (order !== undefined) {
            order.ingredients.map((item) => {
                ingredients.forEach((elem) => {
                    if (elem._id === item) {
                        arr.push(elem)
                    }
                })
            })
        }
        return arr
    }

    const ingredientsOfCurrentOrder = orderIngredients(ingredients);
    const orderTotalPrice = useMemo(() => {
        let totalPrice: number = 0;
        ingredientsOfCurrentOrder.forEach((item) => totalPrice += item.price);
        return totalPrice;
    }, [ingredientsOfCurrentOrder])


    // web socket connection on load
    useEffect(() => {
        if (!location.state) dispatch({ type: WS_CONNECTION_START, payload: `${WS_URL}/all` });

        return () => {
            if (!location.state) dispatch({ type: WS_CONNECTION_CLOSED });
        };
    }, []);


    if (!order) return null;
    return (
        <div className={`${style.wrapper} ${style.wrapper__fullMode}`}>
            <span className={`text text_type_main-medium ${style.order__number} ${style.order__numberFM}`}>{`#${order?.number}`}</span>
            <span className={`text text_type_main-medium ${style.order__name} ${style.order__nameFM} mt-10`}>{order?.name}</span>
            {order?.status === 'done' && <span className={`text text_type_main-default ${style.order__statusDone} mt-3`}>Выполнен</span>}
            {order?.status !== 'done' && <span className={`text text_type_main-default ${style.order__status} mt-3`}>{order?.status}</span>}
            <span className={`text text_type_main-medium ${style.title} mt-15 mb-6`}>Состав:</span>
            <div className={`${style.order__list} ${style.order__listFM} mt-6 mb-6 pr-4`}>
                {ingredientsOfCurrentOrder.map((item, index) => {
                    return (<div key={item._id + index} className={`mb-6 ${style.order__listItem} ${style.order__listItemFM}`}>
                        <img src={item.image_mobile} className={`${style.burgerItem__icon}`} />
                        <span className={`ml-4 text text_type_main-default ${style.burgerItem__name}`}>{item.name}</span>
                        <div className={`${style.burgerItem__priceCard} mt-10 `}>
                            <span className={`text text_type_main-medium ${style.burgerItem__price} ml-2 mr-2`}>{item.price}</span>
                            <CurrencyIcon type='primary' />
                        </div>
                    </div >)
                })}
            </div >
            <span className={`mt-10 text text_type_main-default text_color_inactive ${style.order__date} ${style.order__dateFM}`}>{getDate(order!.createdAt)}</span>
            <div className={`${style.order__price} ${style.order__priceFM} mt-10 `}>
                <span className={`text text_type_main-medium ${style.order__priceNumber}`}>{orderTotalPrice}</span>
                <CurrencyIcon type="primary" />
            </div >
        </div >
    )
}


export default OrderFullMode;