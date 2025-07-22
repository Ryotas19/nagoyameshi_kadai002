import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ConfirmEmailPage = () => {
  const router = useRouter();
  const { key } = router.query;
  const [status, setStatus] = useState('処理中...');

  useEffect(() => {
    if (!router.isReady || !key) return;  // ← ここが超重要！

    const postConfirm = async () => {
      try {
        const res = await fetch('https://nagoyameshi-backend-bc605deb266b.herokuapp.com/api/auth/account-confirm-email/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key })
        });

        if (res.ok) {
          setStatus('メール認証が完了しました！マイページへ移動します...');
          setTimeout(() => {
            window.location.href = '/mypage';
          }, 1500);
        } else {
          const data = await res.json();
          setStatus(`認証に失敗しました: ${data.detail || 'Unknown error'}`);
        }
      } catch (err) {
        setStatus('サーバーエラーが発生しました。');
      }
    };

    postConfirm();
  }, [router.isReady, key]); // ← router.isReadyを依存に追加

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>メールアドレス認証</h2>
      <p>{status}</p>
    </div>
  );
};

export default ConfirmEmailPage;
