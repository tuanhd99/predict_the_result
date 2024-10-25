import { Button, Modal } from 'antd';
import { useState } from 'react';
import { FaBitcoin } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa6';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import { useAuthData } from '../../stores';

function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const { authData, setAuthData } = useAuthData();
    const [isLogout, setIsLogout] = useState(false);

    const handleOk = () => {};

    const handleOpen = () => {
        setIsLogin(true);
    };

    const handleCancel = () => {
        setIsLogin(false);
    };

    const handleOpenRegister = () => {
        setIsRegister(true);
    };

    const handleCancelRegister = () => {
        setIsRegister(false);
    };

    const handleLogout = () => {
        setAuthData({});
        setIsLogout(false);
        localStorage.removeItem('auth');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-blue-900 px-4 h-24">
            <div className="grid grid-cols-3 items-center h-24 bg-blue-900 px-8">
                <FaBars size={30} color="#ffffff" className="cursor-pointer justify-self-start" />
                <div className="uppercase text-5xl text-white text-center">Dự Đoán Tỉ Số</div>
                <div className="justify-self-end">
                    {authData.isAuthenticated ? (
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-center gap-2 text-white">
                                <span className="text-xl font-bold">{authData.data.email}</span>
                                <span className="text-2xl flex items-center justify-center gap-3">
                                    <strong>Coin: </strong>
                                    <span className="text-amber-400 flex items-center gap-1 mt-1">
                                        {authData.data.coin}
                                        <FaBitcoin />
                                    </span>
                                </span>
                            </div>
                            <Button
                                type="primary"
                                className="text-xl bg-white text-blue-800 font-bold uppercase rounded-xl "
                                onClick={() => setIsLogout(true)}
                            >
                                Log out
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-5">
                            <Button
                                onClick={handleOpen}
                                className="bg-white py-2 w-32 text-blue-800 rounded-xl font-bold uppercase text-xl"
                                type="primary"
                            >
                                Login
                            </Button>
                            <Button
                                onClick={handleOpenRegister}
                                className="bg-white py-2 w-32 text-blue-800 rounded-xl font-bold uppercase text-xl"
                                type="primary"
                            >
                                Register
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <Modal open={isLogin} onOk={handleOk} onCancel={handleCancel} footer={<></>}>
                <Login handleCancel={handleCancel} />
            </Modal>
            <Modal open={isRegister} onOk={handleOk} onCancel={handleCancelRegister} footer={<></>}>
                <Register handleCancel={handleCancelRegister} />
            </Modal>
            <Modal title="Log out" open={isLogout} onOk={handleLogout} onCancel={() => setIsLogout(false)}>
                <p>Are you sure you want to log out?</p>
            </Modal>
        </header>
    );
}

export default Header;
