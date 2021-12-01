import React, { useState, useRef, useEffect, useCallback } from 'react';
import style from './profile.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_SUCCESS, refreshTokenThunk } from '../services/actions/user'
import { getUserInfo, updateUser, logoutUser } from '../services/API';
import { useHistory, NavLink } from 'react-router-dom';
import { GET_USER_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS } from '../services/actions/user'
import { deleteCookie } from '../services/utils';
import { PasswordInput } from '../components/custom/input/password-input';
import { EmailInput } from '../components/custom/input/email-input';
import { NameInput } from '../components/custom/input/name-input';
import PropTypes from 'prop-types';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.profile.user);
    const [prevState, setPrevState] = useState({})
    const [form, setForm] = useState({ name: user.name, email: user.email, password: '123456' });
    const failedLogged = useSelector((store) => store.profile.refreshTokenFailed);
    const history = useHistory();
    const hasError = useSelector((store) => store.profile.updateUserSuccess);
    const error = useSelector((store) => store.profile.errorMessage);

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });

    };

    const uploadUserInfo = async () => {
        if (!user || Object.keys(user).length <= 0) {
            const data = await getUserInfo();

            if (data.success === false) {
                dispatch(refreshTokenThunk());
                setForm(data.user);
            } else {
                dispatch({
                    type: GET_USER_SUCCESS,
                    user: data.user
                })
                setForm(data.user);

                if (Object.keys(prevState) <= 0) {
                    setPrevState(data.user)
                }
            }
        }
    }

    useEffect(async () => {
        uploadUserInfo();
    }, [user, history]);

    const updateUserInfo = useCallback(
        async (form, user) => {

            let keys = Object.keys(form).filter((key) => form[key] !== user[key]);
            const obj = {}
            keys.map(item => obj[item] = form[item]);
            setPrevState({ ...user })


            const data = await updateUser(obj);

            if (data.success === true) {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    user: data.user
                });

                setForm(data.user);

            } else {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    errorMessage: data.message
                })
            }

        }, [form, user]
    );

    const cancelUserChanges = useCallback(
        async (prevState) => {
            const data = await updateUser(prevState);

            if (data.success === true) {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    user: data.user
                });

                setForm(data.user);

            } else {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    errorMessage: data.message
                })
            }

        }, [form]
    );

    const signOut = async () => {
        const data = await logoutUser();

        if (data.success === true) {
            deleteCookie('accessToken');

            dispatch({
                type: LOGOUT_SUCCESS
            })
        }
    }

    const logout = useCallback(
        () => {
            signOut().then(() => {
                history.replace('/login');
            });
        }, [signOut, history]
    )



    return (

        <div className={style.wrapper}>
            <div className={style.profile}>
                <nav className={style.nav}>
                    <nav className={`pl-4 ${style.list}`}>
                        <NavLink exact to='/profile' className={`text text_type_main-medium text_color_inactive ${style.listItem}`} activeClassName={style.activeNavLink}>
                            Профиль
                        </NavLink>
                        <NavLink exact to='/profile/orders' className={`text text_type_main-medium text_color_inactive ${style.listItem}`} activeClassName={style.activeNavLink}>
                            История заказов
                        </NavLink>
                        <NavLink to='/login' onClick={logout} className={`text text_type_main-medium text_color_inactive ${style.listItem}`} activeClassName={style.activeNavLink}>
                            Выход
                        </NavLink>
                    </nav>
                </nav>
                <div className={`ml-15 ${style.window}`}>
                    {hasError && <span className={`mt-4 mb-4 text text_type_main-default ${style.error}`}>{error}</span>}
                    <div className="mb-6">
                        <NameInput onChange={onChange} value={'' || form.name} name={'name'} />
                    </div>
                    <div className="mb-6">
                        <EmailInput onChange={onChange} value={'' || form.email} name={'email'} />
                    </div>
                    <div className="mb-6">
                        <PasswordInput onChange={onChange} value={'' || form.password} name={'password'} />
                    </div>
                    <div className={`mt-6 ${style.buttons}`}>
                        <div className="ml-2">
                            <Button type="secondary" size="medium" onClick={() => cancelUserChanges(prevState)}>
                                Отмена
                            </Button>
                        </div>
                        <div className="ml-2">
                            <Button type="primary" size="medium" onClick={() => updateUserInfo(form, user)}>
                                Сохранить
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <span className={`text text_type_main-default text_color_inactive mt-8 ${style.undertitle}`}>В этом разделе вы можете
                изменить свои персональные данные</span>
        </div>

    )
}



ProfilePage.propTypes = {
    user: PropTypes.object,
    failedLogged: PropTypes.bool,
    hasError: PropTypes.bool,
    error: PropTypes.string
}


export default ProfilePage;