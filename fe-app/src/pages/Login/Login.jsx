import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { login } from '../../services';
import { useAuthData } from '../../stores';

// eslint-disable-next-line react/prop-types
function Login({ handleCancel }) {
    const [isHidden, setIsHidden] = useState(true);
    const [error, setError] = useState('');
    const { setAuthData } = useAuthData();

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    useEffect(() => {
        clearErrors();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogin = handleSubmit(async (data) => {
        try {
            const res = await login(data);

            if (res.code === 200) {
                const data = {
                    ...res.data,
                };

                // delete data.password;
                setAuthData({
                    isAuthenticated: true,
                    data,
                });

                localStorage.setItem('auth', JSON.stringify(data));

                handleCancel();
            }
        } catch (err) {
            setError(err?.response?.data?.message);
        }
    });

    return (
        <div>
            <h3 className="font-bold text-4xl mb-6">Đăng Nhập</h3>
            <form className="flex flex-col gap-8 select-none" onSubmit={handleLogin}>
                <div>
                    <input
                        className="w-full text-2xl py-5 outline-none px-4 border border-solid border-gray-400 rounded-xl"
                        {...register('email', {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Trường này phải là email!',
                            },
                        })}
                        type="text"
                        placeholder="Email"
                    />
                    {errors.email && (
                        <p className="text-xl text-red-500">
                            {errors.email.message ? errors.email.message : 'Vui lòng nhập trường này!'}
                        </p>
                    )}
                </div>
                <div className="relative">
                    <input
                        className="w-full text-2xl py-5 outline-none px-4 border border-solid border-gray-400 rounded-xl"
                        {...register('password', {
                            required: true,
                        })}
                        type={isHidden ? 'password' : 'text'}
                        placeholder="Mật khẩu"
                    />
                    <span
                        onClick={() => setIsHidden(!isHidden)}
                        className="text-2xl cursor-pointer absolute right-6 top-6"
                    >
                        {isHidden ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </span>
                    {errors.password && <p className="text-xl text-red-500">Vui lòng nhập trường này!</p>}
                    {!!error && <p className="text-xl text-red-500">{error}</p>}
                </div>
                <div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full text-white font-bold py-7 bg-rose-500 hover:!bg-rose-500"
                    >
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Login;
