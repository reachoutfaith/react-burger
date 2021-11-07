import React from 'react';
import OrderDetailsStyle from '../order-details/order-details.module.css'
import SuccessfulOrder from '../../images/done.png';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const OrderDetails = () => {
    const orderNumber = useSelector(store => store.ingredients.order["number"]);


    return (
        <>

            <h1 className={`${OrderDetailsStyle.title} text text_type_digits-large  mt-5 mb-8`}>{orderNumber}</h1>
            <span className={`${OrderDetailsStyle.text} text text_type_main-medium`}>идентификатор заказа</span>
            <img className={`${OrderDetailsStyle.image} mt-10 mb-10`} src={SuccessfulOrder} alt="Заказ начали готовить" />
            <span className={`${OrderDetailsStyle.text} text text_type_main-default`}>Ваш заказ начали готовить</span>
            <span className={`${OrderDetailsStyle.text} mt-8 text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</span>
        </>
    )
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number
};

export default OrderDetails