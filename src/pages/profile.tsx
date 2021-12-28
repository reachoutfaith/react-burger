import React, { useState, useRef, useEffect, useCallback, FC, ChangeEvent } from 'react';
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
import { TFetchResponse, TGetUserInfo, TUpdateUserInfo } from '../components/utils/types';

type TProfileForm = {
    name: string;
    email: string;
    password: string
}

const ProfilePage: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((store: any) => store.profile.user);
    const [prevState, setPrevState] = useState<TUpdateUserInfo | {}>({})
    const [form, setForm] = useState<TProfileForm>({ name: user.name, email: user.email, password: 'qazswx' });
    const history = useHistory();
    const hasError = useSelector((store: any) => store.profile.updateUserSuccess);
    const error = useSelector((store: any) => store.profile.errorMessage);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    };

    useEffect(() => {
        setForm({ name: user.name, email: user.email, password: 'qazswx' })
    }, [user])

    const uploadUserInfo = async () => {
        if (!user || Object.keys(user).length <= 0) {
            const getUserRequest: TGetUserInfo = await getUserInfo();

            if (getUserRequest.success === false) {
                dispatch(refreshTokenThunk());
            } else {
                dispatch({
                    type: GET_USER_SUCCESS,
                    user: getUserRequest.user
                })

                if (Object.keys(prevState).length <= 0) {
                    setPrevState(getUserRequest.user)
                }
            }
        }
    }

    useEffect(
        () => {
            uploadUserInfo();
        }, [user, history]);

    const updateUserInfo = useCallback(

        async (form, user) => {
            setPrevState({ ...user })


            const updateUserRequest: TGetUserInfo = await updateUser(form);

            if (updateUserRequest.success === true) {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    user: updateUserRequest.user
                });

            } else {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    errorMessage: updateUserRequest.message
                })
            }

        }, [form, user]
    );

    const cancelUserChanges = useCallback(
        async (prevState) => {
            const updateUserRequest: TGetUserInfo = await updateUser(prevState);

            if (updateUserRequest.success === true) {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    user: updateUserRequest.user
                });

            } else {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    errorMessage: updateUserRequest.message
                })
            }

        }, [form]
    );

    const signOut = async () => {
        const logoutRequest: TFetchResponse = await logoutUser();

        if (logoutRequest.success === true) {
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
                        <NameInput placeholder='Имя' onChange={onChange} value={form.name} name={'name'} />
                    </div>
                    <div className="mb-6">
                        <EmailInput onChange={onChange} value={form.email} name={'email'} />
                    </div>
                    <div className="mb-6">
                        <PasswordInput placeholder='Пароль' onChange={onChange} value={form.password} name={'password'} />
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



export default ProfilePage;