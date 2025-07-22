import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('認証を処理しています...');

  // クエリパラメータからkeyを取得
  const searchParams = new URLSearchParams(location.search);
  const key = searchParams.get('key');

  useEffect(() => {
    if (!key) {
      setStatus('認証キーが見つかりません。');
      return;
    }

    const API_URL = `${process.env.REACT_APP_API_URL}/api/auth/registration/verify-email/`;
    axios.post(API_URL, { key })
      .then(() => {
        setStatus('メール認証が完了しました！マイページへ移動します...');
        setTimeout(() => {
          navigate('/mypage');
        }, 2000);
      })
      .catch(error => {
        setStatus('認証に失敗しました。リンクが無効か、すでに認証済みです。');
      });
  }, [key, navigate]);
  

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>メールアドレス認証</h2>
      <p>{status}</p>
    </div>
  );
};

export default ConfirmEmailPage;
