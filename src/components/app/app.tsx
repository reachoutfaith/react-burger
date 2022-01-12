import React, { useCallback, useEffect, FC } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import { useDispatch } from '../../services/hooks';
import { getIngredients } from '../../services/actions/ingredients';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import BurgerConstructorPage from '../../pages/burger-menu';
import OrdersFeedPage from '../../pages/orders-feed';
import NotFound404 from '../../pages/not-found-404';
import ProtectedRoute from './protected-route'
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { refreshTokenThunk } from '../../services/actions/user';
import OrderFullMode from '../orders-feed/order-full-mode';

const App: FC = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<any>();
  const backgroundIngredients = location.state?.background;
  const backgroundFeed = location.state?.backgroundFeed;
  const backgroundProfile = location.state?.backgroundProfile;
  const prevPath: string | undefined | null = location.state?.prevPath;

  const uploadUserData = useCallback(
    () => {
      dispatch(refreshTokenThunk());
    }, [dispatch])


  function closeModalWindow() {
    if (prevPath && prevPath.length > 0) {
      history.replace(prevPath);
    } else {
      history.replace('/');
    }

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
      {backgroundIngredients && <Route
        path='/ingredients/:id'
        children={<Modal closeModal={closeModalWindow} title={'Детали ингредиента'}><IngredientDetails /></Modal>} />}
      {backgroundFeed && <Route
        path='/feed/:id'
        children={<Modal closeModal={closeModalWindow}><OrderFullMode /></Modal>} />}
      {backgroundProfile && <Route
        path='/profile/orders/:id'
        children={<Modal closeModal={closeModalWindow}><OrderFullMode /></Modal>} />}

      <Switch location={backgroundIngredients ?? backgroundFeed ?? backgroundProfile ?? location}>
        <Route path="/" exact={true}>
          <BurgerConstructorPage />
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
        <Route path='/feed' exact={true}>
          <OrdersFeedPage />
        </Route>
        <Route path='/feed/:id'>
          <OrderFullMode />
        </Route>
        <ProtectedRoute path="/profile/orders" exact={true} children={<ProfilePage />} />
        <ProtectedRoute path="/profile/orders/:id" children={<OrderFullMode />} />
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

