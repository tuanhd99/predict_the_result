import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { signup } from '../../services';
import { useAuthData } from '../../stores';

// eslint-disable-next-line react/prop-types
function Register({ handleCancel }) {
    const [isHidden, setIsHidden] = useState(true);
    const [error, setError] = useState(false);
    const [isHiddenConfirm, setIsHiddenConfirm] = useState(true);
    const { setAuthData } = useAuthData();

    const {
        register,
        watch,
        clearErrors,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirm_password: '',
            phone_number: '',
        },
    });

    useEffect(() => {
        clearErrors();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRegister = handleSubmit(async (data) => {
        // Logic for registering user
        try {
            const res = await signup({
                email: data.email,
                password: data.password,
                phone_number: data.phone_number,
            });

            if (res.code === 200) {
                const data = {
                    ...res.data,
                };

                delete data.password;
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
            <form className="flex flex-col gap-8 select-none" onSubmit={handleRegister}>
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
                <div>
                    <input
                        className="w-full text-2xl py-5 outline-none px-4 border border-solid border-gray-400 rounded-xl"
                        {...register('phone_number', {
                            required: true,
                            pattern: {
                                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                                message: 'Trường này phải là số điện thoại!',
                            },
                        })}
                        type="text"
                        placeholder="Số điện thoại"
                    />
                    {errors.phone_number && (
                        <p className="text-xl text-red-500">
                            {errors.phone_number.message ? errors.phone_number.message : 'Vui lòng nhập trường này!'}
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
                </div>
                <div className="relative">
                    <input
                        className="w-full text-2xl py-5 outline-none px-4 border border-solid border-gray-400 rounded-xl"
                        {...register('confirm_password', {
                            required: true,
                            validate: (val) => {
                                if (watch('password') != val) {
                                    return 'Mật khẩu không khớp!';
                                }
                            },
                        })}
                        type={isHiddenConfirm ? 'password' : 'text'}
                        placeholder="Nhập lại mật khẩu"
                    />
                    <span
                        onClick={() => setIsHiddenConfirm(!isHiddenConfirm)}
                        className="text-2xl cursor-pointer absolute right-6 top-6"
                    >
                        {isHiddenConfirm ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </span>
                    {errors.confirm_password && (
                        <p className="text-xl text-red-500">
                            {errors.confirm_password.message
                                ? errors.confirm_password.message
                                : 'Vui lòng nhập trường này!'}
                        </p>
                    )}
                    {!!error && <p className="text-xl text-red-500">{error}</p>}
                </div>
                <div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full text-white font-bold py-7 bg-rose-500 hover:!bg-rose-500"
                    >
                        Register
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Register;
