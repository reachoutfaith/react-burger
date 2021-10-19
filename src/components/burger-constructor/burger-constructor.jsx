import React, { useState } from 'react';
import BurgerConstructorStyle from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/OrderDetails';
import itemObj from '../utils/types';

const BurgerConstructor = (props) => {
    const data = props.data;
    let items = [];
    let totalPrice = 0;
    const [showModal, setShowModal] = useState(false);



    function showModalWindow(obj) {
        setShowModal(true);
    }

    function closeModalWindow() {
        setShowModal(false)
    }

    if (data != undefined) {
        totalPrice = data.reduce((sum, current) => sum + current.price, 0);
        items = data.map((item, i) => {
            return <div key={item._id} className={`mt-2 mb-2 ${BurgerConstructorStyle.item} ${i === 0 || i === 1 ? "ml-8" : ''}`} >
                {i === 0 || i === 1 ? '' : <DragIcon />}
                <ConstructorElement
                    type={i === 0 ? "top" : ''}
                    isLocked={i === 0 ? true : false}
                    text={i === 0 ? item.name + ' (верх)' : item.name}
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
            <div key={data[0]._id + '_bottom'} className={`mt-2 mb-2 ${BurgerConstructorStyle.item} ml-8`} >
                <ConstructorElement
                    type="bottom"
                    isLocked="true"
                    text={`${data[0].name} (низ)`}
                    price={data[0].price}
                    thumbnail={data[0].image}
                />
            </div>
            {/* {items[1]} */}
            <div className={`mt-10 ${BurgerConstructorStyle.priceCard}`}>
                <span className={`${BurgerConstructorStyle.price} text text_type_main-large`}>{totalPrice}</span>
                <CurrencyIcon type="primary" />
                <Button onClick={showModalWindow} type="primary" size="medium">Оформить заказ</Button>
            </div>

            {showModal && <Modal closeModal={closeModalWindow}><OrderDetails /></Modal>}
        </div>
    )
}


BurgerConstructor.propTypes = {
    success: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(itemObj).isRequired
};

export default BurgerConstructor;