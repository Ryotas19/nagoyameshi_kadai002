import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ConfirmEmailPage = () => {
  const router = useRouter();

  // ルーティング情報を常に出す
  console.log("=== ConfirmEmailPage Loaded ===");
  console.log("router:", router);
  console.log("router.isReady:", router.isReady);
  console.log("router.query:", router.query);

  useEffect(() => {
    console.log("useEffect発火。router.isReady:", router.isReady);
    if (!router.isReady) return;
    console.log("router.query(key):", router.query.key);
  }, [router.isReady, router.query]);

  return (
    <div>認証テストページ</div>
  );
};

export default ConfirmEmailPage;


// // pages/confirm-email.jsx
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';

// const ConfirmEmailPage = () => {
//   const router = useRouter();
//   const { key } = router.query;
//   const [status, setStatus] = useState('認証を処理しています...');

//   useEffect(() => {
//     if (!router.isReady) return;

//     if (!key) {
//       setStatus('認証キーが見つかりません。');
//       return;
//     }

//     const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/account-confirm-email/`;

//     axios.post(API_URL, { key })
//       .then(() => {
//         setStatus('メール認証が完了しました！マイページへ移動します...');
//         setTimeout(() => router.push('/mypage'), 2000);
//       })
//       .catch(error => {
//         console.error('認証エラー:', error.response?.data || error.message);
//         setStatus('認証に失敗しました。リンクが無効か、すでに認証済みです。');
//       });

//   }, [router.isReady, key, router]);

//   return (
//     <div style={{ padding: 40, textAlign: 'center' }}>
//       <h2>メールアドレス認証</h2>
//       <p>{status}</p>
//     </div>
//   );
// };

// export default ConfirmEmailPage;
