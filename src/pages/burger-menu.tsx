import React, { FC } from 'react';
import AppStyle from '../components/app/app.module.css'
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export interface IComponentProps {
    handleOpenModal: Function
}

const BurgerConstructorPage: FC<IComponentProps> = (props) => {

    const showModalWindow = props.handleOpenModal;

    return (<main className={`${AppStyle.main}`}>
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients showModalWindow={showModalWindow} />
            <BurgerConstructor />
        </DndProvider>
    </main>)
}

export default BurgerConstructorPage;