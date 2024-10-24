import { Button, Modal, Popconfirm } from 'antd';
import { useState } from 'react';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import { useAuthData } from '../../stores';
import { FaBitcoin } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa6';

function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const { authData, setAuthData } = useAuthData();

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
        localStorage.removeItem('auth');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-blue-900 h-24 flex justify-between items-center px-4">
            <Modal open={isLogin} onOk={handleOk} onCancel={handleCancel} footer={<></>}>
                <Login handleCancel={handleCancel} />
            </Modal>
            <Modal open={isRegister} onOk={handleOk} onCancel={handleCancelRegister} footer={<></>}>
                <Register handleCancel={handleCancelRegister} />
            </Modal>
            <FaBars size={30} color="#ffffff" />
            <div className="uppercase text-5xl text-white">Dự Đoán Tỉ Số</div>
            <div className="flex gap-4">
                {authData.isAuthenticated ? (
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xl font-bold text-gray-800">{authData.data.email}</span>
                            <span className="text-2xl flex items-center jusitfy-center gap-3">
                                <strong>coin: </strong>
                                <span className="text-2xl text-amber-400 flex items-center jusitfy-center gap-1 mt-1">
                                    {authData.data.coin}
                                    <FaBitcoin />{' '}
                                </span>
                            </span>
                        </div>
                        <Popconfirm
                            title="Đăng xuất"
                            description="Bạn có chắc chắn muốn đăng xuất không?"
                            onConfirm={handleLogout}
                            okText="Đồng ý"
                            cancelText="Hủy bỏ"
                        >
                            <Button type="primary" className="text-xl font-bold">
                                Đăng xuất
                            </Button>
                        </Popconfirm>
                    </div>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
