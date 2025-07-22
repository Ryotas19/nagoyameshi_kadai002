import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ConfirmEmailPage = () => {
  const router = useRouter();
  const { key } = router.query;
  const [status, setStatus] = useState('処理中...');

  useEffect(() => {
    if (!key) return;
    // バックエンドの認証APIにPOST
    fetch('https://nagoyameshi-backend-bc605deb266b.herokuapp.com/api/auth/account-confirm-email/', {
        method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(() => setStatus('メール認証が完了しました！ログインしてください。'))
      .catch(() => setStatus('認証に失敗しました。リンクが無効か、すでに認証済みです。'));
  }, [key]);

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>メールアドレス認証</h2>
      <p>{status}</p>
      {/* 認証成功時にログインページボタンなど */}
    </div>
  );
};

export default ConfirmEmailPage;
