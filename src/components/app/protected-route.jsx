import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


function ProtectedRoute({ children, ...rest }) {

    const location = useLocation();
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