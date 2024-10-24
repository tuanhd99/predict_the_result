import { useEffect } from 'react';
import Header from '../Header';
import { useAuthData } from '../../stores';
import { Outlet } from 'react-router-dom';

function DefaultLayout() {
    const { setAuthData } = useAuthData();

    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            const user = JSON.parse(data);
            if (user.email) {
                setAuthData({
                    isAuthenticated: true,
                    data: user,
                });
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="h-screen w-screen overflow-y-auto overflow-x-auto">
            <div className="h-24">
                <Header />
            </div>
            <div className="min-h-full bg-blue-900/80">
                <Outlet />
            </div>
        </div>
    );
}

export default DefaultLayout;
