import { create } from 'zustand';

export const useAuthData = create((set) => ({
    authData: {
        isAuthenticated: false,
        data: {},
    },
    setAuthData: (value) => set(() => ({ authData: value })),
}));
