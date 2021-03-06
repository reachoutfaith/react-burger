import React, { useEffect, useCallback, FC } from 'react';
import style from './profile.module.css';
import { useSelector, useDispatch } from '../services/hooks';
import {
    LOGOUT_SUCCESS
} from '../services/constants/user';
import {
    WS_CONNECTION_START,
    WS_CONNECTION_CLOSED
} from '../services/constants/socket';
import { logoutUser, WS_URL } from '../services/API';
import { useHistory, NavLink, useLocation, Redirect } from 'react-router-dom';
import { deleteCookie, getCookie } from '../services/utils';
import { TFetchResponse } from '../components/utils/types';
import UserSettings from '../components/profile/user-settings';
import UserOrdersFeed from '../components/profile/user-orders-feed';

const ProfilePage: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<any>();
    let path = location.pathname;
    const accessToken = getCookie('accessToken');
    const isAuthenticated = useSelector((store) => store.profile.isAuthenticated);
    const getUserError = useSelector(store => store.profile.getUserError);


    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: `${WS_URL}/all?token=${accessToken}` });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        };
    }, [accessToken, dispatch])


    const signOut = useCallback(async () => {
        const logoutRequest: TFetchResponse = await logoutUser();

        if (logoutRequest.success === true) {
            deleteCookie('accessToken');

            dispatch({
                type: LOGOUT_SUCCESS
            })
        }
    }, [dispatch])

    const logout = useCallback(
        () => {
            signOut().then(() => {
                history.replace('/login');
            });
        }, [signOut, history]
    )

    if (!isAuthenticated && getUserError) {
        return <Redirect to={location.state?.from || '/'} />;
    }

    return (

        <div className={style.wrapper}>
            <div className={style.profile}>
                <nav className={style.nav}>
                    <nav className={`pl-4 ${style.list}`}>
                        <NavLink exact to='/profile' className={`text text_type_main-medium text_color_inactive ${style.listItem}`} activeClassName={style.activeNavLink}>
                            ??????????????
                        </NavLink>
                        <NavLink exact to='/profile/orders' className={`text text_type_main-medium text_color_inactive ${style.listItem}`} activeClassName={style.activeNavLink}>
                            ?????????????? ??????????????
                        </NavLink>
                        <NavLink to='/login' onClick={logout} className={`text text_type_main-medium text_color_inactive ${style.listItem}`} activeClassName={style.activeNavLink}>
                            ??????????
                        </NavLink>
                    </nav>
                </nav>

                {path === '/profile' && <UserSettings />}
                {path === '/profile/orders' && <UserOrdersFeed />}
            </div>
            <span className={`text text_type_main-default text_color_inactive mt-8 ${style.undertitle}`}>?? ???????? ?????????????? ???? ????????????
                ???????????????? ???????? ???????????????????????? ????????????</span>
        </div>

    )
}



export default ProfilePage;