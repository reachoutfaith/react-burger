import React, { useCallback, useEffect, useState } from 'react';
import { Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
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
import { refreshTokenThunk } from '../../services/actions/user';

function App() {

  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  let background = location.state && location.state.background;

  const uploadUserData = useCallback(
    () => {
      dispatch(refreshTokenThunk());
    }, [dispatch])

  function showModalWindow() {
    setShowModal(true);
  }


  function closeModalWindow() {
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
      {background && <Route
        path='/ingredients/:id'
        children={<Modal closeModal={closeModalWindow} title={'Детали ингредиента'}><IngredientDetails /></Modal>} />}
      <Switch location={background || location}>
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
        <Route path='/ingredients/:id' children={<IngredientDetails />} />
        <Route >
          <NotFound404 />
        </Route>
      </Switch>
      {/* modal */}


      {/* {showModal && (
        <Modal closeModal={closeModalWindow} title={'Детали ингредиента'} showModal={showModal}>
          <OrderDetails />
        </Modal>
      )} */}
    </>
  )

}


export default App;

