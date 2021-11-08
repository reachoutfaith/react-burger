import React, { useEffect } from 'react';
import '../../index.css';
import AppStyle from './app.module.css'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/actions';


function App() {

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getIngredients());
    }, [dispatch]
  )

  return (
    <>
      <AppHeader />
      <main className={`${AppStyle.main}`}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>
  )

}


export default App;

