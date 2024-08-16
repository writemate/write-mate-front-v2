'use client';
import { useLogin } from '@/stores/useLogin';
import { useRouter } from 'next/navigation';

export default function AuthorizedLayout({ children }: { children: React.ReactNode }) {
  const { isLogin } = useLogin();
  const router = useRouter();

  if (isLogin===false) {
    router.push('/signup');
  }

  return (
    <>
      {isLogin === null && <div>로딩중...</div>}
      {isLogin && children}
    </>
  );
}
