import React, { useEffect, useState } from 'react';
import '../../index.css';
import AppStyle from './app.module.css'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ModalOverlay from '../modal/modal-overlay';

function App() {
  const [data, setData] = useState();
  const [modal, setModal] = useState({
    title: '',
    props: {},
    type: ''
  })
  const [showModal, setShowModal] = useState(false);

  const URL = 'https://norma.nomoreparties.space/api/ingredients';
  useEffect(() => {
    const getIngredients = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        if (data.success) {
          setData(data);
        }
      } catch (err) {
        console.log(err)
      }
    }

    getIngredients();
  }, [])

  const funcESC = (event) => {
    if (event.keyCode === 27) {
      handleCloseModal()
    }
  }

  function handleOpenModal(obj) {
    if (obj != undefined) {
      setModal({
        title: obj.text,
        props: obj.props,
        type: obj.type
      })
    }
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  if (showModal) {

    return <ModalOverlay title={modal.title} component={modal.type} info={modal.props} closeModal={handleCloseModal} />

  } else {
    return (
      <div>
        <AppHeader />
        <main className={`${AppStyle.main}`}>
          <BurgerIngredients showModal={handleOpenModal} {...data} />
          <BurgerConstructor showModal={handleOpenModal} {...data} />
        </main>

      </div>
    );
  }

}


export default App;
