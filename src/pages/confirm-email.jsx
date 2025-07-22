import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ConfirmEmailPage = () => {
  const router = useRouter();
  const { key } = router.query;
  const [status, setStatus] = useState('処理中...');

  useEffect(() => {
    console.log("key:", key);  // ★ここで必ず確認
    if (!key) return;
    fetch('https://nagoyameshi-backend-bc605deb266b.herokuapp.com/api/auth/account-confirm-email/', {
      method: 'POST',
      body: `key=${key}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(res => {
      if (!res.ok) throw new Error('認証失敗');
      return res.json();
    })
    .then(() => {
      setStatus('メール認証が完了しました！マイページへ移動します...');
      setTimeout(() => {
        window.location.href = '/mypage';
      }, 1500);
    })
    .catch(() => setStatus('認証に失敗しました。リンクが無効か、すでに認証済みです。'));
  }, [key]);

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>メールアドレス認証</h2>
      <p>{status}</p>
    </div>
  );
};

export default ConfirmEmailPage;
