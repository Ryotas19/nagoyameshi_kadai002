import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ConfirmEmailPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState('処理中...');
  const [executed, setExecuted] = useState(false);

  useEffect(() => {
    if (!router.isReady) return; // ← これが大事
    const { key } = router.query;
    console.log("key:", key);
    if (!key || executed) return;
    setExecuted(true);

    fetch('https://nagoyameshi-backend-bc605deb266b.herokuapp.com/api/auth/account-confirm-email/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }), // ← ここも application/json で！
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
  }, [router.isReady, router.query, executed]);

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>メールアドレス認証</h2>
      <p>{status}</p>
    </div>
  );
};

export default ConfirmEmailPage;
