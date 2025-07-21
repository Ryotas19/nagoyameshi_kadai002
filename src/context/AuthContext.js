import React, { createContext, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    const navigate = useNavigate();

    // ① ユーザー再取得用の関数（これを追加）
    const fetchUser = async () => {
        if (!authTokens) return;
        try {
            const response = await axiosInstance.get('/auth/user/', { // ←エンドポイント注意
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
            console.error('ユーザー情報の取得に失敗', error);
        }
    };

    const loginUser = async (email, password) => {
        const response = await axiosInstance.post('/auth/login/', {
            email,
            password
        });
        if (response.status === 200) {
            setAuthTokens(response.data);
            setUser(response.data.user); 
            localStorage.setItem('authTokens', JSON.stringify(response.data));
            localStorage.setItem('user', JSON.stringify(response.data.user)); 
            navigate('/');
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // ② contextDataにfetchUserも追加！
    const contextData = {
        user,
        setUser,
        authTokens,
        loginUser,
        logoutUser,
        fetchUser, 
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
