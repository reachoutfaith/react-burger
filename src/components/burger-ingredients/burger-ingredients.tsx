import React, { useEffect, useState, useRef, useMemo, FC } from 'react';
import BurgerIngredientsStyle from './burger-ingredients.module.css'
import { Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TItem } from '../utils/types';
import { ItemTypes } from '../utils/ItemTypes';
import { useDrag } from 'react-dnd';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/hooks';

interface IBurgerComponentProps {
    showModalWindow: Function;
}

interface IIngredientProps {
    item: TItem,
    handleModalOpen: Function;
}

type TItemWithCounter = TItem & { counter?: number }

const Ingredient: FC<IIngredientProps> = ({ item, handleModalOpen }) => {
    let count = 0;
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const menuCounter = useSelector((store) => store.ingredients.counterIngredients);
    const element: TItemWithCounter[] = useMemo(() => (menuCounter.filter((elem: TItemWithCounter) => elem._id === item._id)), [menuCounter])

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

    const handleClick = (item: TItem) => {

        handleModalOpen();

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

const BurgerIngredients: FC<IBurgerComponentProps> = ({ showModalWindow }) => {
    const [current, setCurrent] = React.useState('one');
    const ingredients = useSelector((store) => store.ingredients.ingredients);
    const dispatch = useDispatch();
    const buns: TItem[] = [];
    const sauces: TItem[] = [];
    const main: TItem[] = [];
    const tabsRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const bunsTitleRef = useRef<HTMLHeadingElement>(null);
    const saucesTitleRef = useRef<HTMLHeadingElement>(null);
    const mainTitleRef = useRef<HTMLHeadingElement>(null);

    useEffect(
        () => {
            const startPosition: number = bunsTitleRef.current!.getBoundingClientRect().y;
            const container = containerRef.current!;
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


    const handleScroll = (start: number) => {
        const saucesPosition = saucesTitleRef.current!.getBoundingClientRect().y;
        const mainPosition = mainTitleRef.current!.getBoundingClientRect().y;

        if (saucesPosition <= start && mainPosition > start) {
            setCurrent('two')

        } else if (mainPosition <= start) {
            setCurrent('three')
        } else {
            setCurrent('one')
        }

    };



    if (ingredients != undefined) {
        ingredients.forEach((item: TItem) => {
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


export default BurgerIngredients;

