import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 2秒後にマイページへ遷移
    const timer = setTimeout(async () => {
      try {
        // ここでユーザー情報APIにアクセスし認証チェック
        const API_URL = `${process.env.REACT_APP_API_URL}/api/auth/user/`;
        await axios.get(API_URL, { withCredentials: true });

        // 認証OKならマイページへ
        navigate('/mypage');
      } catch (err) {
        // 401など認証エラーならログイン画面へ
        navigate('/login');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>決済が完了しました</h2>
      <p>
        まもなくマイページに移動します。<br />
        <span style={{ color: 'gray', fontSize: '0.9em' }}>
          ※うまく表示されない場合は、<b>再度ログイン</b>してください
        </span>
      </p>
    </div>
  );
};

export default PaymentSuccessPage;
