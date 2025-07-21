import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PaymentSuccessPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // 2秒後にマイページへリダイレクト
        const timer = setTimeout(() => {
            navigate('/mypage');
        }, 2000); // 2秒後

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
                <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">ありがとうございます！</h1>
                <p className="text-lg text-gray-700 mb-6">
                    プレミアムプランへのアップグレードが完了しました。<br />
                    まもなくマイページに自動で戻ります。
                </p>
                <Link 
                    to="/mypage" 
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                    マイページへ戻る
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
