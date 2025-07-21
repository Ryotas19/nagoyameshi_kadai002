// src/pages/PaymentSuccessPage.jsx
import React from "react";

const PaymentSuccessPage = () => {
  return (
    <div style={{ padding: 100, textAlign: "center", fontSize: 32 }}>
      🎉決済に成功しました！<br />
      <a href="/mypage">マイページに戻る</a>
    </div>
  );
};

export default PaymentSuccessPage;
