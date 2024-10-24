import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import DefaultLayout from '../components/Layout/DefaultLayout';
import Loading from '../components/Loading';
import routesConfig from '../configs/routes';

const Home = React.lazy(() => import('../pages/Home'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));

export default function useRounterElement() {
    const routerElement = useRoutes([
        {
            path: routesConfig.home,
            element: <DefaultLayout />,
            children: [
                {
                    index: true,
                    element: (
                        <Suspense fallback={<Loading />}>
                            <Home />
                        </Suspense>
                    ),
                },
                {
                    path: routesConfig.login,
                    element: (
                        <Suspense fallback={<Loading />}>
                            <Login />
                        </Suspense>
                    ),
                },
                {
                    path: routesConfig.register,
                    element: (
                        <Suspense fallback={<Loading />}>
                            <Register />
                        </Suspense>
                    ),
                },
            ],
        },
    ]);
    return routerElement;
}
