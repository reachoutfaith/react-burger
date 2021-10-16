import React, { useState } from 'react';
import BurgerIngredientsStyle from './burger-ingredients.module.css'
import { Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


function Ingredient(props) {
    const [count, setCount] = useState(0);
    const item = props.item

    function modifyItem(showModalOverlay) {
        setCount(count => count + 1)
        const obj = { props: item, type: 'ingredient', text: 'Детали ингредиента' }
        showModalOverlay(obj)
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
                    <Ingredient showModal={props.showModal} item={item} key={index} />
                ))}
                <h2 className={`${BurgerIngredientsStyle.subTitle} text text_type_main-medium`}>Соусы</h2>
                {sauces.map((item, index) => (
                    <Ingredient showModal={props.showModal} item={item} key={index} />
                ))}
                <h2 className={`${BurgerIngredientsStyle.subTitle} text text_type_main-medium`}>Начинки</h2>
                {main.map((item, index) => (
                    <Ingredient showModal={props.showModal} item={item} key={index} />
                ))}

            </section>
        </section >
    )
}


Ingredient.propTypes = {
    item: PropTypes.object,
    showModal: PropTypes.func
};

const itemPropTypes = PropTypes.shape({
    success: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
    showModal: PropTypes.func
});


BurgerIngredients.propTypes = {
    props: PropTypes.objectOf(itemPropTypes)
};




export default BurgerIngredients;

