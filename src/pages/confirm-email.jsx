import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ConfirmEmailPage = () => {
  const router = useRouter();
  const { key } = router.query;
  const [status, setStatus] = useState('認証を処理しています...');

  useEffect(() => {
    // router.isReadyは、Next.jsがクエリパラメータを読み込み終わったことを保証します
    if (!router.isReady) {
      return;
    }

    if (!key) {
      setStatus('認証キーが見つかりません。');
      return;
    }

    // バックエンドAPIのエンドポイント
   
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/registration/verify-email/`;

    // axiosを使ってJSON形式でPOSTリクエストを送信
    axios.post(API_URL, { key })
      .then(response => {
        // 成功時の処理
        setStatus('メール認証が完了しました！マイページへ移動します...');
        setTimeout(() => {
          router.push('/mypage'); 
        }, 2000);
      })
      .catch(error => {
        // 失敗時の処理
        console.error('認証エラー:', error.response?.data || error.message);
        setStatus('認証に失敗しました。リンクが無効か、すでに認証済みです。');
      });

  }, [router.isReady, key, router]); 

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>メールアドレス認証</h2>
      <p>{status}</p>
    </div>
  );
};

export default ConfirmEmailPage;