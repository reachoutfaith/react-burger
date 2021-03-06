import React, { FC, useMemo } from 'react';
import style from './orders-feed.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getDate } from '../../services/utils';
import { useSelector } from '../../services/hooks';
import { useHistory, useLocation } from 'react-router-dom';

type TProps = {
    _id: string,
    createdAt: string,
    updatedAt: string,
    status: string,
    number: number,
    name: string,
    ingredients: string[]
}

const OrderCutMode: FC<TProps> = (props) => {
    const number = props.number;
    const createdAt = getDate(props.createdAt);
    const name = props.name;
    const status = props.status;
    const ingredients = useSelector((store) => store.ingredients.ingredients);
    const propsIngredients = props.ingredients;
    const history = useHistory();
    const location = useLocation<any>();

    //Get Total Sum
    const orderTotalSum = useMemo(() => {
        let totalSum = 0;
        ingredients!.forEach(item => {
            for (let i = 0; i < propsIngredients.length; i++) {
                if (item._id === propsIngredients[i]) {
                    totalSum += item.price
                };
            }
        });
        return totalSum;
    }, [ingredients, propsIngredients]);

    // Get All Orders Images
    const orderIngredientsImages = useMemo(() => {
        let images = [] as string[];
        ingredients!.forEach(item => {
            for (let i = 0; i < propsIngredients.length; i++) {
                if (item._id === propsIngredients[i]) {
                    const src = item['image_mobile'] as string;
                    if (!images.includes(src)) {
                        images.push(src)
                    }
                }
            }
        });

        if (images.length > 5) {
            return images.splice(0, 5)
        }

        return images;

    }, [ingredients, propsIngredients])

    const handleClick = () => {

        console.log('location.pathname order ', location.pathname)

        if (location.pathname === '/feed') {
            history.replace({
                pathname: `/feed/${props._id}`,
                state: {
                    backgroundFeed: location,
                    prevPath: location.pathname
                }
            })
        };

        if (location.pathname === '/profile/orders') {

            history.replace({
                pathname: `/profile/orders/${props._id}`,
                state: {
                    backgroundProfile: location,
                    prevPath: location.pathname,
                    from: location
                }
            });
        }
    };


    return (
        <div className={`${style.wrapper} ${style.wrapper__listMode} pr-6 pl-6`} onClick={handleClick}>
            <span className={`text text_type_main-medium ${style.order__number} mt-6`}>{`#${number}`}</span>
            <span className={`text text_type_main-default text_color_inactive ${style.order__date} mt-6`}>{createdAt}</span>
            <span className={`text text_type_main-medium ${style.order__name} mt-6`}>{name}</span>
            {location.pathname === '/profile/orders' && status === 'done' && (
                <span className={`text text_type_main-default ${style.order__statusDone} mt-2`}>????????????????</span>
            )}
            {location.pathname === '/profile/orders' && status !== 'done' && (
                <span className={`text text_type_main-default ${style.order__status} mt-2`}>{status}</span>
            )}
            <div className={`${style.order__list} mt-6 mb-6`}>
                <div className={`${style.order__listItem} ${style.order__listItemCM}`}>

                    {orderIngredientsImages.map((item, index) => <img alt="ingredient" key={index} src={item} className={`${style.burgerItem__icon} ${style.burgerItem__iconCM}`} />)}
                </div >
                <div className={`${style.order__price} ml-6 mt-6 mb-6 pt-11 pb-11`}>
                    <span className={`text text_type_main-medium ${style.order__priceNumber}`}>{orderTotalSum}</span>
                    <CurrencyIcon type="primary" />
                </div >
            </div >

        </div >
    )
}


export default OrderCutMode;