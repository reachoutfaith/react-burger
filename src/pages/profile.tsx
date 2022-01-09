import React, { useState, useEffect, useCallback, FC } from 'react';
import style from './profile.module.css';
import { useSelector, useDispatch } from '../services/hooks';
import {
    LOGOUT_SUCCESS,
    GET_USER_SUCCESS
} from '../services/constants/user';
import {
    WS_CONNECTION_START,
    WS_CONNECTION_CLOSED
} from '../services/constants/socket';

import { refreshTokenThunk } from '../services/actions/user'
import { getUserInfo, logoutUser, WS_URL } from '../services/API';
import { useHistory, NavLink, useLocation } from 'react-router-dom';
import { deleteCookie, getCookie } from '../services/utils';
import { TFetchResponse, TGetUserInfo, TUpdateUserInfo, TUser } from '../components/utils/types';
import UserSettings from '../components/profile/user-settings';
import UserOrdersFeed from '../components/profile/user-orders-feed';

const ProfilePage: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.profile.user) as TUser;
    const [prevState, setPrevState] = useState<TUpdateUserInfo | {}>({})
    const history = useHistory();
    const location = useLocation<{ pathname: string }>();
    let path = location.pathname;
    const accessToken = getCookie('accessToken');

    useEffect(() => {
        // uploadUserInfo();
        dispatch({ type: WS_CONNECTION_START, payload: `${WS_URL}/all?token=${accessToken}` });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        };
    }, [accessToken, dispatch])

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

                {path === '/profile' && <UserSettings />}
                {path === '/profile/orders' && <UserOrdersFeed />}
            </div>
            <span className={`text text_type_main-default text_color_inactive mt-8 ${style.undertitle}`}>В этом разделе вы можете
                изменить свои персональные данные</span>
        </div>

    )
}



export default ProfilePage;