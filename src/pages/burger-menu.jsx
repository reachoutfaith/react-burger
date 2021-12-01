import React from 'react';
import AppStyle from '../components/app/app.module.css'
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

const BurgerConstructorPage = (props) => {
    const showModalWindow = props.handleModalOpen;

    return (<main className={`${AppStyle.main}`}>
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients showModalWindow={showModalWindow} />
            <BurgerConstructor />
        </DndProvider>
    </main>)
}

BurgerConstructorPage.propTypes = {
    showModalWindow: PropTypes.func
}

export default BurgerConstructorPage;