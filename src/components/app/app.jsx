<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react';
=======
import React, { useCallback, useEffect, useState } from 'react';
import { Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom';
>>>>>>> Stashed changes
import '../../index.css';
import AppHeader from '../app-header/app-header';
<<<<<<< Updated upstream
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
=======
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/actions';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import BurgerConstructorPage from '../../pages/burger-menu';
import NotFound404 from '../../pages/not-found-404';
import ProtectedRoute from '../app/protected-route'
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { DELETE_INGREDIENT, refreshTokenThunk } from '../../services/actions/actions';





function App() {

  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const uploadUserData = useCallback(
    () => {
      dispatch(refreshTokenThunk());
    }, [dispatch])

  function showModalWindow() {
    setShowModal(true);
  }


  function closeModalWindow() {
    console.log('i am here')
    dispatch({
      type: DELETE_INGREDIENT
    })
    setShowModal(false);
    history.replace('/');
  }

  useEffect(
    () => {
      dispatch(getIngredients());
      uploadUserData();
    }, [dispatch, uploadUserData]
  )


  return (
    <>
      <AppHeader />
      <Switch >
        <Route path="/" exact={true}>
          <BurgerConstructorPage handleModalOpen={showModalWindow} />
        </Route>
        <Route path="/login" exact={true}  >
          <LoginPage />
        </Route>
        <Route path="/register" exact={true} >
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true} >
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile" exact={true} >
          <ProfilePage />
        </ProtectedRoute>

        <Route path='/ingredients/:id'
          render={({ location: { state } }) => !state?.fromSite &&
            <IngredientDetails />} />
        <Route >
          <NotFound404 />
        </Route>
      </Switch>
      {/* modal */}
      <Route
        path='/ingredients/:id'
        render={({ location: { state } }) =>
          state?.fromSite && (
            <Modal closeModal={closeModalWindow} title={'Детали ингредиента'}><IngredientDetails /></Modal>
          )
        }
      />

      {/* {showModal && (
        <Modal closeModal={closeModalWindow} title={'Детали ингредиента'} showModal={showModal}>
          <OrderDetails />
        </Modal>
      )} */}
    </>
  )
>>>>>>> Stashed changes

}


export default App;

