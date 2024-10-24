import { useLocation, useNavigate } from 'react-router-dom';
import routesConfig from '../../configs/routes';
import { useEffect } from 'react';
import { useSessionContext } from '../../contexts/SessionContext';

function PrivateRoute(props) {
    const [values] = useSessionContext();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!values.isAuth) {
            navigate(routesConfig.login, {
                state: {
                    // eslint-disable-next-line react/prop-types
                    redirect: location.pathname ? location.pathname : props.redirect,
                },
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.isAuth]);

    return <>{values.isAuth && <props.component />}</>;
}

export default PrivateRoute;
