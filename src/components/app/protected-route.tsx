import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from '../../services/hooks';

interface IProtectedRouteProps {
    children: React.ReactElement;
    path: string;
    exact?: boolean;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children, ...rest }) => {
    const user = useSelector((store) => store.profile.user);

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