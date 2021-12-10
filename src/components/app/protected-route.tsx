import React, { FC } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface IProtectedRouteProps {
    children: React.ReactElement;
    path: string;
    exact: boolean;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children, ...rest }) => {

    const location = useLocation();
    const user = useSelector((store: any) => store.profile.user);

    return (
        <Route
            {...rest}
            render={({ location }) => (
                !user || Object.keys(user).length > 0 ? (
                    children
                ) : <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: location }
                    }}

                />
            )
            }
        />
    );
}

export default ProtectedRoute;