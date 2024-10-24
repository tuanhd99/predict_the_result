import instance from '../axios';

export const login = async (data) => {
    const res = await instance.post('/login', data);

    return res.data;
};

export const signup = async (data) => {
    const res = await instance.post('/register', data);

    return res.data;
};

export const getListDame = async () => {
    const res = await instance.get('/list-result');

    return res.data;
};

export const addPlaying = async (data) => {
    const res = await instance.post('/add-playing', data);

    return res.data;
};
