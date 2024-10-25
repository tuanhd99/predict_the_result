import { Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { addPlaying, getListDame, login } from '../../services';
import Loading from '../../components/Loading';
import { useAuthData } from '../../stores';
import { FaCircleCheck } from 'react-icons/fa6';
import PredictionCard from '../../components/PredictionCard';

function Home() {
    const [coin, setCoin] = useState(0);
    const [team, setTeam] = useState('');
    const [matchId, setMatchId] = useState(0);
    const [loading, setLoading] = useState(true);
    const [dames, setDames] = useState([]);
    const { authData, setAuthData } = useAuthData();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const handleLogin = async (data) => {
            try {
                const res = await login(data);

                console.log(res);

                if (res.code === 200) {
                    const data = {
                        ...res.data,
                    };

                    console.log('response: ', res);

                    // delete data.password;
                    setAuthData({
                        isAuthenticated: true,
                        data,
                    });

                    localStorage.setItem('auth', JSON.stringify(data));
                }
            } catch (err) {
                console.error(err);
            }
        };

        console.log('authData.isAuthenticated: ', authData.isAuthenticated);

        if (authData.isAuthenticated) {
            handleLogin({
                email: authData.data.email,
                password: authData.data.password,
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authData.isAuthenticated]);

    const success = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    const error = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };

    const handleSubmit = async () => {
        console.log('coin: ', authData.data.coin);
        // check login
        if (authData.isAuthenticated) {
            if (coin !== 0 && team !== '' && matchId !== 0) {
                if (+authData.data.coin < coin) {
                    error('Số coin của bạn không đủ, vui lòng thử lại!');
                } else {
                    const res = await addPlaying({
                        email: authData.data.email,
                        match: matchId,
                        team_vote: team,
                        coin_vote: coin,
                    });

                    if (res.code === 200) {
                        success('Đặt dự đoán thành công!');
                        setCoin(0);
                        setTeam('');
                        setMatchId(0);

                        setAuthData({
                            ...authData,
                            data: {
                                ...authData.data,
                                coin: +authData.data.coin - coin,
                            },
                        });
                    }

                    if (res.code === 500) {
                        error('Đã xảy ra lỗi, vui lòng thử lại!');
                    }
                }
            } else {
                error('Vui lòng chọn thông tin cần dự đoán!');
            }
        } else {
            error('Vui lòng đăng nhập để dự đoán!');
        }
    };

    useEffect(() => {
        const handleGetAPI = async () => {
            try {
                const res = await getListDame();

                if (res.message === 'success') {
                    setDames(res.data);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        handleGetAPI();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-full pt-10">
            {/* {contextHolder}
            <div className="m-auto grid grid-cols-1 gap-10">
                {loading ? (
                    <div
                        className="flex items-center justify-center"
                        style={{
                            minHeight: '70vh',
                        }}
                    >
                        <Loading />
                    </div>
                ) : (
                    dames.map((item) => (
                        <div key={item.match} className="p-6 rounded-lg border-2 border-solid border-rose-500 w-max">
                            <div className="p-4">
                                <h2 className="font-bold text-5xl text-center mb-12">
                                    Dự đoán kết quả trận {item.match}
                                </h2>
                                <div className="flex items-center justify-between gap-28">
                                    <div
                                        onClick={() => {
                                            setTeam(item.teaml);
                                            setMatchId(+item.match);
                                        }}
                                        className={`p-6 rounded-xl cursor-pointer w-auto lg:min-w-96 flex items-center gap-4 border border-solid border-rose-500 ${
                                            matchId === +item.match && team === item.teaml && 'bg-orange-500 text-white'
                                        }`}
                                    >
                                        <div className="flex w-20 h-20">
                                            <img src="https://vinasport.com.vn/wp-content/uploads/2020/03/Logo-%C4%91%E1%BB%99i-tuy%E1%BB%83n-game-Esport-h%C3%ACnh-chu%E1%BB%99t.png" />
                                        </div>
                                        <h3 className="w-max">{item.teaml}</h3>
                                    </div>
                                    <div
                                        onClick={() => {
                                            setTeam(item.teamr);
                                            setMatchId(+item.match);
                                        }}
                                        className={`p-6 rounded-xl cursor-pointer w-auto lg:min-w-96 flex items-center border border-solid border-rose-500 gap-4 ${
                                            matchId === +item.match && team === item.teamr && 'bg-orange-500 text-white'
                                        }`}
                                    >
                                        <div className="flex w-20 h-20">
                                            <img src="https://vinasport.com.vn/wp-content/uploads/2020/03/Logo-%C4%91%E1%BB%99i-tuy%E1%BB%83n-game-Esport-h%C3%ACnh-chu%E1%BB%99t.png" />
                                        </div>
                                        <h3 className="w-max">{item.teamr}</h3>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-8">
                                    {item.win === 'pending' ? (
                                        <Button loading type="primary">
                                            Chờ kết quả
                                        </Button>
                                    ) : (
                                        <div className="px-6 py-3 rounded-lg text-white flex items-center justify-center bg-green-500 font-bold gap-3">
                                            <span className="flex items-center justify-center">
                                                <FaCircleCheck />
                                            </span>
                                            {item.win.toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center justify-center gap-4 mt-12">
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setCoin(10);
                                            setMatchId(+item.match);
                                        }}
                                        className={`${
                                            coin === 10 && matchId === +item.match
                                                ? 'bg-orange-500 hover:!bg-orange-500 text-white hover:!text-white'
                                                : 'bg-neutral-200 hover:!bg-neutral-200 text-black hover:!text-black'
                                        } text-2xl py-7 border border-solid border-neutral-400`}
                                    >
                                        10 coins
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setCoin(20);
                                            setMatchId(+item.match);
                                        }}
                                        className={`${
                                            coin === 20 && matchId === +item.match
                                                ? 'bg-orange-500 hover:!bg-orange-500 text-white hover:!text-white'
                                                : 'bg-neutral-200 hover:!bg-neutral-200 text-black hover:!text-black'
                                        } text-2xl py-7 border border-solid border-neutral-400`}
                                    >
                                        20 coins
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setCoin(50);
                                            setMatchId(+item.match);
                                        }}
                                        className={`${
                                            coin === 50 && matchId === +item.match
                                                ? 'bg-orange-500 hover:!bg-orange-500 text-white hover:!text-white'
                                                : 'bg-neutral-200 hover:!bg-neutral-200 text-black hover:!text-black'
                                        } text-2xl py-7 border border-solid border-neutral-400`}
                                    >
                                        50 coins
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setCoin(100);
                                            setMatchId(+item.match);
                                        }}
                                        className={`${
                                            coin === 100 && matchId === +item.match
                                                ? 'bg-orange-500 hover:!bg-orange-500 text-white hover:!text-white'
                                                : 'bg-neutral-200 hover:!bg-neutral-200 text-black hover:!text-black'
                                        } text-2xl py-7 border border-solid border-neutral-400`}
                                    >
                                        100 coins
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setCoin(200);
                                            setMatchId(+item.match);
                                        }}
                                        className={`${
                                            coin === 200 && matchId === +item.match
                                                ? 'bg-orange-500 hover:!bg-orange-500 text-white hover:!text-white'
                                                : 'bg-neutral-200 hover:!bg-neutral-200 text-black hover:!text-black'
                                        } text-2xl py-7 border border-solid border-neutral-400`}
                                    >
                                        200 coins
                                    </Button>
                                </div>
                                <div className="w-full mt-16">
                                    <Button
                                        onClick={handleSubmit}
                                        type="primary"
                                        className="w-full py-7 bg-rose-500 hover:!bg-rose-500"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div> */}
            <PredictionCard />
        </div>
    );
}

export default Home;
