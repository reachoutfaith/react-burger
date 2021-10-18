import React, { useState } from 'react';
import BurgerIngredientsStyle from './burger-ingredients.module.css'
import { Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import itemObj from '../utils/types';


function Ingredient(props) {
    const [count, setCount] = useState(0);
    const item = props.item;

    function modifyItem(showModalFunc) {
        setCount(count => count + 1)
        showModalFunc(item);
    }

    return (
        <div className={`${BurgerIngredientsStyle.card}`} onClick={() => { modifyItem(props.showModal) }}>
            {count > 0 && <Counter count={count} size="default" />}
            <img src={item.image} alt={item.name} />
            <span className={`${BurgerIngredientsStyle.price} text text_type_main-default`}>{item.price} <CurrencyIcon type="primary" /></span>
            <span className={`${BurgerIngredientsStyle.text} text text_type_main-default`}>{item.name}</span>
        </div>
    )
}

const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('one')
    const data = props.data;
    const buns = [];
    const sauces = [];
    const main = [];
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState({});

    function showModalWindow(obj) {
        setModal(obj);
        setShowModal(true);
    }

    function closeModalWindow() {
        setShowModal(false)
    }

    if (data != undefined) {
        data.forEach((item) => {
            if (item.type === 'bun') {
                buns.push(item);
            } else if (item.type === 'sauce') {
                sauces.push(item);
            } else {
                main.push(item);
            }
        });
    }


    return (
        <section className={`${BurgerIngredientsStyle.wrapper}`}>
            <h1 className={`${BurgerIngredientsStyle.title} text text_type_main-large`}>Соберите бургер</h1>

            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>

                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <section className={`${BurgerIngredientsStyle.scrollArea}`}>
                <h2 className={`${BurgerIngredientsStyle.subTitle} text text_type_main-medium`}>Булки</h2>
                {buns.map((item, index) => (
                    <Ingredient showModal={showModalWindow} item={item} key={index} />
                ))}
                <h2 className={`${BurgerIngredientsStyle.subTitle} text text_type_main-medium`}>Соусы</h2>
                {sauces.map((item, index) => (
                    <Ingredient showModal={showModalWindow} item={item} key={index} />
                ))}
                <h2 className={`${BurgerIngredientsStyle.subTitle} text text_type_main-medium`}>Начинки</h2>
                {main.map((item, index) => (
                    <Ingredient showModal={showModalWindow} item={item} key={index} />
                ))}

            </section>
            {showModal && <Modal closeModal={closeModalWindow} title={'Детали ингредиента'}><IngredientDetails {...modal} /></Modal>}
        </section >
    )
}

Ingredient.propTypes = {
    item: PropTypes.object.isRequired,
    showModal: PropTypes.func.isRequired
}


BurgerIngredients.propTypes = {
    success: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(itemObj).isRequired
};



export default BurgerIngredients;

