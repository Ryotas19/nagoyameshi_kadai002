import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1秒後にマイページへ自動リダイレクト
    const timer = setTimeout(() => {
      navigate('/mypage');
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{textAlign: "center", paddingTop: "50px"}}>
      <h2>お支払い完了！</h2>
      <p>自動的にマイページへ移動します…</p>
    </div>
  );
};

export default PaymentSuccessPage;
