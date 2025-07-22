import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ConfirmEmailPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState('処理中...');

  useEffect(() => {
    if (!router.isReady) return; // ←追加
    const key = router.query.key;
    console.log("key:", key);

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
  }, [router.isReady, router.query.key]); // ←修正！

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>メールアドレス認証</h2>
      <p>{status}</p>
    </div>
  );
};

export default ConfirmEmailPage;
