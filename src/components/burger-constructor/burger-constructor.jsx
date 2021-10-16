import React from 'react';
import BurgerConstructorStyle from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const BurgerConstructor = (props) => {
    const data = props.data;
    let items = [];
    let totalPrice = 0;

    function showOrder(showModalOverlay) {

        const obj = { props: data, type: 'order', text: '' }
        showModalOverlay(obj)
    }

    if (data != undefined) {
        totalPrice = data.reduce((sum, current) => sum + current.price, 0);
        items = data.map((item, i) => {
            return <div key={item._id} className={`mt-2 mb-2 ${BurgerConstructorStyle.item} ${i === 0 || i === 1 ? "ml-8" : ''}`} >
                {i === 0 || i === 1 ? '' : <DragIcon />}
                <ConstructorElement
                    type={i === 0 ? "top" : '' || i === 1 ? "bottom" : ''}
                    isLocked={i === 0 || i === 1 ? true : false}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                />
            </div>
        })
    }
    return (
        <div className={`${BurgerConstructorStyle.wrapper}`}>
            {items[0]}
            <section className={` ${BurgerConstructorStyle.scrollArea} mt-2 mb-2`}>
                {items.slice(2, items.length - 2)}
            </section>
            {items[1]}
            <div className={`mt-10 ${BurgerConstructorStyle.priceCard}`}>
                <span className={`${BurgerConstructorStyle.price} text text_type_main-large`}>{totalPrice}</span>
                <CurrencyIcon type="primary" />
                <Button onClick={() => { showOrder(props.showModal) }} type="primary" size="medium">Оформить заказ</Button>
            </div>


        </div>
    )
}

const itemPropTypes = PropTypes.shape({
    success: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
    showModal: PropTypes.func
});


BurgerConstructor.propTypes = {
    props: PropTypes.objectOf(itemPropTypes)
};




export default BurgerConstructor;