import React, { useEffect, useState } from 'react';
import '../../index.css';
import AppStyle from './app.module.css'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  const [data, setData] = useState();

  const URL = 'https://norma.nomoreparties.space/api/ingredients';
  useEffect(() => {
    const getIngredients = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        if (data.success) {
          setData(data);
        } else {
          throw new Error('Ошибка получения данных')
        }
      } catch (err) {
        console.log(err)
      }
    }

    getIngredients();
  }, [])


  if (data != undefined) {

    return (
      <>
        <AppHeader />
        <main className={`${AppStyle.main}`}>
          <BurgerIngredients {...data} />
          <BurgerConstructor {...data} />
        </main>

      </>
    )

  } else {
    return null;
  }

}


export default App;

