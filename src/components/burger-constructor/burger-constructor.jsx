import React, { useState, useRef, useCallback, useMemo } from 'react';
import BurgerConstructorStyle from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/OrderDetails';
import itemObj from '../utils/types';
import { ItemTypes } from '../utils/ItemTypes';
import { useDrop, useDrag } from 'react-dnd';
import {
    sendOrderItems,
    DELETE_BURGER_INGREDIENT,
    ADD_BURGER_INGREDIENT,
    ADD_BUN,
    CHANGE_INGREDIENTS_POSITION,
    ADD_ITEM_TO_COUNTER,
    DELETE_ITEM_FROM_COUNTER
} from '../../services/actions/ingredients';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


const DraggableIngredient = (props) => {
    const item = props.item;
    const id = props.item._id;
    const index = props.index;
    const ref = useRef(null);
    const deleteItem = props.deleteItem;
    const moveCard = props.moveCard;

    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.INGREDIENT,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.INGREDIENT,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <div ref={ref} data-handler-id={handlerId} style={{ opacity }} index={index} id={item._id} onClick={() => deleteItem(item)} className={`mt-2 mb-2 ${BurgerConstructorStyle.item}`} >
            <DragIcon />
            <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
            />
        </div>)
}

const BurgerConstructor = () => {
    const totalPrice = useSelector(store => store.ingredients.totalPrice);
    const data = useSelector(store => store.ingredients.currentIngredients);
    const isBunAdded = useSelector(store => store.ingredients.isBunAdded);
    const bun = useSelector(store => store.ingredients.bun);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const order = useSelector(store => store.ingredients.order);
    const counterIngredients = useSelector(store => store.ingredients.counterIngredients);
    const user = useSelector((store) => store.profile.user);
    const isAuthenticated = useSelector((store) => store.profile.isAuthenticated);
    const history = useHistory();

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = data[dragIndex];
        const newCards = [...data];
        newCards.splice(dragIndex, 1);
        newCards.splice(hoverIndex, 0, dragCard);

        dispatch({
            type: CHANGE_INGREDIENTS_POSITION,
            newCards
        })
    }, [data]);


    function showModalWindow(event) {
        event.preventDefault();
        const items = data.map(item => item._id);
        console.log('isAuthenticated', isAuthenticated)

        if (!isAuthenticated && Object.keys(user).length <= 0) {
            history.push({ pathname: '/login' })

        } else {
            if (isBunAdded && items == undefined) {
                dispatch(sendOrderItems([bun._id]));
                setShowModal(true)
            } else if (isBunAdded && items !== undefined) {
                let elements = items.concat(bun._id)
                dispatch(sendOrderItems(elements));
                setShowModal(true)
            } else {
                alert('Добавьте Булку в Ваш заказ')
            }
        }
    }

    function closeModalWindow() {
        setShowModal(false)
    }

    function addItem(item) {

        if (item.type === 'bun') {
            dispatch({
                type: ADD_BUN,
                item
            })
        } else {
            dispatch({
                type: ADD_BURGER_INGREDIENT,
                item: item
            })
        }

        increaseCounter(item)
    }

    function increaseCounter(item) {
        let copiedCounterArray = [...counterIngredients];
        const index = copiedCounterArray.findIndex(elem => elem._id === item._id);
        let count = copiedCounterArray[index]["counter"];

        if (item.type === 'bun') {
            let anotherBunIndex = copiedCounterArray.findIndex(elem => elem.type === "bun" && elem.name !== item.name);
            copiedCounterArray[anotherBunIndex]["counter"] = 0
            count = 2;
        } else if (count !== undefined && count >= 1) {
            count = count + 1;
        } else {
            count = 1;
        }

        copiedCounterArray[index] = {
            ...copiedCounterArray[index],
            counter: count
        }

        dispatch({
            type: ADD_ITEM_TO_COUNTER,
            copiedCounterArray
        });

    }

    function deleteItem(item) {
        let elemIndex = data.findIndex(elem => elem._id === item._id);
        dispatch({
            type: DELETE_BURGER_INGREDIENT,
            item,
            elemIndex
        })

        decreaseCounter(item);
    }

    function decreaseCounter(item) {
        let copiedCounterArray = [...counterIngredients];
        const index = copiedCounterArray.findIndex(elem => elem._id === item._id);
        let count = copiedCounterArray[index]["counter"];
        let newCount = count - 1

        copiedCounterArray[index] = {
            ...copiedCounterArray[index],
            counter: newCount
        }


        dispatch({
            type: DELETE_ITEM_FROM_COUNTER,
            copiedCounterArray
        })
    }



    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.INGREDIENT,
        drop: (item, monitor) => {
            item.hasOwnProperty('name') && addItem(item);

        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })


    return (
        <div ref={drop} style={{ border: isOver ? "5px solid red" : "5px solid transparent" }} className={`${BurgerConstructorStyle.wrapper}`} >
            {isBunAdded && <div key={'bun-top' + bun._id} className={`mt-2 mb-2 ${BurgerConstructorStyle.item} ml-8`} >
                <ConstructorElement
                    type="top"
                    isLocked="true"
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>}

            <section className={` ${BurgerConstructorStyle.scrollArea} mt-2 mb-2`} >
                {data.length > 0 && data.map((item, i) =>
                    <DraggableIngredient moveCard={moveCard} deleteItem={deleteItem} item={item} index={i} key={i + item._id} />)}
            </section>
            {
                isBunAdded && <div key={'bun-bottom' + bun._id} className={`mt-2 mb-2 ${BurgerConstructorStyle.item} ml-8`} >
                    <ConstructorElement
                        type="bottom"
                        isLocked="true"
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
            }

            <div className={`mt-10 ${BurgerConstructorStyle.priceCard}`}>
                <span className={`${BurgerConstructorStyle.price} text text_type_main-large`}>
                    {totalPrice && totalPrice}
                </span>
                <CurrencyIcon type="primary" />
                <Button onClick={showModalWindow} type="primary" size="medium">Оформить заказ</Button>
            </div>

            {order !== undefined && showModal === true && <Modal closeModal={closeModalWindow}><OrderDetails /></Modal>}
        </div >
    )
}

DraggableIngredient.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    moveCard: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
}

BurgerConstructor.propTypes = {
    totalPrice: PropTypes.number,
    data: PropTypes.arrayOf(itemObj),
    isBunAdded: PropTypes.bool,
    bun: PropTypes.object,
    order: PropTypes.object,
    counterIngredients: PropTypes.arrayOf(itemObj),
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool

};


export default BurgerConstructor;