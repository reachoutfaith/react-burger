import React, { useEffect, useState, useRef } from 'react';
import BurgerIngredientsStyle from './burger-ingredients.module.css'
import { Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import itemObj from '../utils/types';
import { ItemTypes } from '../utils/ItemTypes';
import { useDrag } from 'react-dnd';
import { SHOW_INGREDIENT, DELETE_INGREDIENT, getIngredients } from '../../services/actions/actions';
import { useSelector, useDispatch } from 'react-redux';


function Ingredient(props) {
    let count = 0;
    const item = props.item;
    const menuCounter = useSelector(store => store.ingredients.counterIngredients);
    let element = menuCounter.filter(elem => elem._id === item._id);

    if (element[0]["counter"] !== undefined && element[0]["counter"] >= 1) {
        count = element[0]["counter"]
    } else {
        count = 0
    }


    function modifyItem(showModalFunc) {
        showModalFunc(item);
    }

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.INGREDIENT,
        item: item,
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })


    return (
        <div ref={drag} className={`${BurgerIngredientsStyle.card}`} onClick={() => { modifyItem(props.showModal) }}>
            {count > 0 && <Counter count={count} size="default" />}
            <img src={item.image} alt={item.name} />
            <span className={`${BurgerIngredientsStyle.price} text text_type_main-default`}>{item.price} <CurrencyIcon type="primary" /></span>
            <span className={`${BurgerIngredientsStyle.text} text text_type_main-default`}>{item.name}</span>
        </div>
    )
}

const BurgerIngredients = () => {
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
    const [showModal, setShowModal] = useState(false);
    const modal = useSelector(store => store.ingredients.ingredient);



    useEffect(
        () => {
            dispatch(getIngredients());

            let startPosition = bunsTitleRef.current.getBoundingClientRect().y;
            let container = containerRef.current;
            container.addEventListener('scroll', function () {
                handleScroll(startPosition)
            })

            return () => {
                container.removeEventListener('scroll', function () {
                    handleScroll(startPosition)
                })
            };
        }, [dispatch]
    )


    const handleScroll = (start) => {
        const bunsPosition = bunsTitleRef.current.getBoundingClientRect().y;
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

    function showModalWindow(obj) {
        dispatch({
            type: SHOW_INGREDIENT,
            ingredient: obj
        })
        setShowModal(true);
    }

    function closeModalWindow() {
        dispatch({
            type: DELETE_INGREDIENT
        })
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
                    <Ingredient showModal={showModalWindow} item={item} key={index} />
                ))}
                <h2 className={`${BurgerIngredientsStyle.subTitle} text text_type_main-medium`} ref={saucesTitleRef}>Соусы</h2>
                {sauces.map((item, index) => (
                    <Ingredient showModal={showModalWindow} item={item} key={index} />
                ))}
                <h2 className={`${BurgerIngredientsStyle.subTitle} text text_type_main-medium`} ref={mainTitleRef}>Начинки</h2>
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
    menuCounter: PropTypes.array
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(itemObj),
    modal: PropTypes.object,
};



export default BurgerIngredients;

