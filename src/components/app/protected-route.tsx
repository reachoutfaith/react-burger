import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { getCookie } from '../../services/utils';

interface IProtectedRouteProps {
    children: React.ReactElement;
    path: string;
    exact?: boolean;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children, ...rest }) => {
    const isAuthenticated = useSelector(store => store.profile.isAuthenticated);
    const cookie = getCookie('accessToken');

    // const uploadUserInfo = useCallback(() => {
    //     if (!isAuthenticated) {
    //         const getUserRequest: any = getUserInfo();

    //         if (getUserRequest.success === false) {

    //         } else {
    //             dispatch({
    //                 type: GET_USER_SUCCESS,
    //                 user: getUserRequest.user
    //             })
    //         }
    //     }
    // }, [dispatch, isAuthenticated]);

    // uploadUserInfo()

    return (
        <Route
            {...rest}
            render={({ location }) => (
                (isAuthenticated || cookie) ? (
                    children
                ) : <Redirect
                    to={{
                        pathname: '/login',
                        state: {
                            from: location
                        }
                    }}

                />
            )
            }
        />
    );
}

export default ProtectedRoute;