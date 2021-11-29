import React, { useState } from 'react';
import BurgerIngredientsStyle from './burger-ingredients.module.css'
import { Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
// import Modal from '../modal/modal';
// import IngredientDetails from '../ingredient-details/ingredient-details';
import itemObj from '../utils/types';
<<<<<<< Updated upstream
=======
import { ItemTypes } from '../utils/ItemTypes';
import { useDrag } from 'react-dnd';
import { SHOW_INGREDIENT, DELETE_INGREDIENT } from '../../services/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

>>>>>>> Stashed changes


function Ingredient(props) {
    const [count, setCount] = useState(0);
    const item = props.item;
<<<<<<< Updated upstream

    function modifyItem(showModalFunc) {
        setCount(count => count + 1)
        showModalFunc(item);
    }

    return (
        <div className={`${BurgerIngredientsStyle.card}`} onClick={() => { modifyItem(props.showModal) }}>
=======
    const dispatch = useDispatch();
    const history = useHistory();
    const menuCounter = useSelector(store => store.ingredients.counterIngredients);
    const element = useMemo(() => (menuCounter.filter(elem => elem._id === item._id)), [menuCounter])

    if (element[0]["counter"] !== undefined && element[0]["counter"] >= 1) {
        count = element[0]["counter"]
    } else {
        count = 0
    }


    // function modifyItem(showModalFunc) {
    //     showModalFunc(item);
    // }

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.INGREDIENT,
        item: item,
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })

    const handleClick = (item) => {

        dispatch({
            type: SHOW_INGREDIENT,
            ingredient: item
        })
        history.replace({
            pathname: `/ingredients/${item._id}`,
            state: { fromSite: true }
        });
    };


    return (
        <div ref={drag} className={`${BurgerIngredientsStyle.card}`} onClick={() => { handleClick(item) }}>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState({});

    function showModalWindow(obj) {
        setModal(obj);
        setShowModal(true);
    }

    function closeModalWindow() {
        setShowModal(false)
    }
=======
    const tabsRef = useRef(null);
    const containerRef = useRef(null);
    const bunsTitleRef = useRef(null);
    const saucesTitleRef = useRef(null);
    const mainTitleRef = useRef(null);
    //const [showModal, setShowModal] = useState(false);
    //const modal = useSelector(store => store.ingredients.ingredient);


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

    // function showModalWindow(obj) {
    //     dispatch({
    //         type: SHOW_INGREDIENT,
    //         ingredient: obj
    //     })
    //     //setShowModal(true);
    //     //console.log(' i work')
    // }

    // function closeModalWindow() {
    //     dispatch({
    //         type: DELETE_INGREDIENT
    //     })
    //     setShowModal(false)
    // }
>>>>>>> Stashed changes

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
                    <Ingredient item={item} key={index} />
                ))}
                <h2 className={`${BurgerIngredientsStyle.subTitle} text text_type_main-medium`}>Соусы</h2>
                {sauces.map((item, index) => (
                    <Ingredient item={item} key={index} />
                ))}
                <h2 className={`${BurgerIngredientsStyle.subTitle} text text_type_main-medium`}>Начинки</h2>
                {main.map((item, index) => (
                    <Ingredient item={item} key={index} />
                ))}

            </section>


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

