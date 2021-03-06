import React, { useEffect, useRef, useMemo, FC } from 'react';
import BurgerIngredientsStyle from './burger-ingredients.module.css'
import { Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TItem } from '../utils/types';
import { ItemTypes } from '../utils/ItemTypes';
import { useDrag } from 'react-dnd';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';


interface IIngredientProps {
    item: TItem,
}

type TItemWithCounter = TItem & { counter?: number }

const Ingredient: FC<IIngredientProps> = ({ item }) => {
    let count = 0;
    const history = useHistory();
    const location = useLocation();
    const menuCounter = useSelector((store) => store.ingredients.counterIngredients);
    const element: TItemWithCounter[] = useMemo(() => (menuCounter.filter((elem: TItemWithCounter) => elem._id === item._id)), [menuCounter, item._id])

    if (element[0]["counter"] !== undefined && element[0]["counter"] >= 1) {
        count = element[0]["counter"]
    } else {
        count = 0
    }


    const [, drag] = useDrag({
        type: ItemTypes.INGREDIENT,
        item: item,
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });

    const handleClick = (item: TItem) => {

        history.push({
            pathname: `/ingredients/${item._id}`,
            state: {
                backgroundIngredients: location
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

const BurgerIngredients: FC = () => {
    const [current, setCurrent] = React.useState('one');
    const ingredients = useSelector((store) => store.ingredients.ingredients);
    const buns: TItem[] = [];
    const sauces: TItem[] = [];
    const main: TItem[] = [];
    const tabsRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const bunsTitleRef = useRef<HTMLHeadingElement>(null);
    const saucesTitleRef = useRef<HTMLHeadingElement>(null);
    const mainTitleRef = useRef<HTMLHeadingElement>(null);

    const clickBun = () => {
        setCurrent('one');
        bunsTitleRef!.current!.scrollIntoView({ behavior: 'smooth' });
    };
    const clickSauces = () => {
        setCurrent('two');
        saucesTitleRef!.current!.scrollIntoView({ behavior: 'smooth' });
    };

    const clickMain = () => {
        setCurrent('three');
        mainTitleRef!.current!.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(
        () => {
            const startPosition: number = bunsTitleRef.current!.getBoundingClientRect().y;
            const container = containerRef.current!;
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

            container.addEventListener('scroll', function () { handleScroll(startPosition) })

            return () => {
                container.removeEventListener('scroll', function () { handleScroll(startPosition) })
            };
        }, []
    );



    if (ingredients !== undefined) {
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
            <h1 className={`${BurgerIngredientsStyle.title} text text_type_main-large`}>???????????????? ????????????</h1>

            <div style={{ display: 'flex' }} ref={tabsRef}>
                <Tab value="one" active={current === 'one'} onClick={clickBun}>
                    ??????????
                </Tab>

                <Tab value="two" active={current === 'two'} onClick={clickSauces}>
                    ??????????
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={clickMain}>
                    ??????????????
                </Tab>
            </div>
            <section ref={containerRef} className={`${BurgerIngredientsStyle.scrollArea}`} >
                <h2 className={`${BurgerIngredientsStyle.subTitle} text text_type_main-medium`} ref={bunsTitleRef}>??????????</h2>
                {buns.map((item, index) => (
                    <Ingredient item={item} key={index} />
                ))}
                <h2 className={`${BurgerIngredientsStyle.subTitle} text text_type_main-medium`} ref={saucesTitleRef}>??????????</h2>
                {sauces.map((item, index) => (
                    <Ingredient item={item} key={index} />
                ))}
                <h2 className={`${BurgerIngredientsStyle.subTitle} text text_type_main-medium`} ref={mainTitleRef}>??????????????</h2>
                {main.map((item, index) => (
                    <Ingredient item={item} key={index} />
                ))}

            </section>

        </section >
    )
}


export default BurgerIngredients;

