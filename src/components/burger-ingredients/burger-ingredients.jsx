import React, { useEffect, useState, useRef, useMemo } from 'react';
import BurgerIngredientsStyle from './burger-ingredients.module.css'
import { Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import itemObj from '../utils/types';
import { ItemTypes } from '../utils/ItemTypes';
import { useDrag } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';


function Ingredient(props) {
    let count = 0;
    const item = props.item;
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const menuCounter = useSelector(store => store.ingredients.counterIngredients);
    const element = useMemo(() => (menuCounter.filter(elem => elem._id === item._id)), [menuCounter])

    if (element[0]["counter"] !== undefined && element[0]["counter"] >= 1) {
        count = element[0]["counter"]
    } else {
        count = 0
    }


    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.INGREDIENT,
        item: item,
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });

    const handleClick = (item) => {

        // dispatch({
        //     type: SHOW_INGREDIENT,
        //     ingredient: item
        // });
        props.handleModalOpen();

        history.push({
            pathname: `/ingredients/${item._id}`,
            state: {
                background: location
            }
        });
    };

    return (
        <div ref={drag} className={`${BurgerIngredientsStyle.card}`} onClick={() => { handleClick(item) }}>
            {count > 0 && <Counter count={count} size="default" />}
            <img src={item.image} alt={item.name} />
            <span className={`${BurgerIngredientsStyle.price} text text_type_main-default`}>{item.price} <CurrencyIcon type="primary" /></span>
            <span className={`${BurgerIngredientsStyle.text} text text_type_main-default`}>{item.name}</span>
        </div>
    )
}

const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('one');
    const data = useSelector(store => store.ingredients.ingredients);
    const dispatch = useDispatch();
    const buns = [];
    const sauces = [];
    const main = [];
    const tabsRef = useRef(null);
    const containerRef = useRef(null);
    const bunsTitleRef = useRef(null);
    const saucesTitleRef = useRef(null);
    const mainTitleRef = useRef(null);
    const showModalWindow = props.showModalWindow;

    useEffect(
        () => {
            const startPosition = bunsTitleRef.current.getBoundingClientRect().y;
            const container = containerRef.current;
            container.addEventListener('scroll', function () {
                handleScroll(startPosition)
            })

            return () => {
                container.removeEventListener('scroll', function () {
                    handleScroll(startPosition)
                })
            };
        }, []
    )


    const handleScroll = (start) => {
        const saucesPosition = saucesTitleRef.current.getBoundingClientRect().y;
        const mainPosition = mainTitleRef.current.getBoundingClientRect().y;

        if (saucesPosition <= start && mainPosition > start) {
            setCurrent('two')

        } else if (mainPosition <= start) {
            setCurrent('three')
        } else {
            setCurrent('one')
        }

    };



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

            <div style={{ display: 'flex' }} ref={tabsRef}>
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
            <section ref={containerRef} className={`${BurgerIngredientsStyle.scrollArea}`} >
                <h2 className={`${BurgerIngredientsStyle.subTitle} text text_type_main-medium`} ref={bunsTitleRef}>Булки</h2>
                {buns.map((item, index) => (
                    <Ingredient handleModalOpen={showModalWindow} item={item} key={index} />
                ))}
                <h2 className={`${BurgerIngredientsStyle.subTitle} text text_type_main-medium`} ref={saucesTitleRef}>Соусы</h2>
                {sauces.map((item, index) => (
                    <Ingredient handleModalOpen={showModalWindow} item={item} key={index} />
                ))}
                <h2 className={`${BurgerIngredientsStyle.subTitle} text text_type_main-medium`} ref={mainTitleRef}>Начинки</h2>
                {main.map((item, index) => (
                    <Ingredient handleModalOpen={showModalWindow} item={item} key={index} />
                ))}

            </section>

        </section >
    )
}

Ingredient.propTypes = {
    item: PropTypes.object.isRequired,
    menuCounter: PropTypes.array
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(itemObj),
    showModalWindow: PropTypes.func
};



export default BurgerIngredients;

