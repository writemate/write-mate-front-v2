'use client';
import { MainContainer } from '@/styles';
import { useLogin } from '@/stores/useLogin';

export default function Dashboard() {
  const user = useLogin((state) => state.user)!;
  console.log(user);
  return (
    <>
      <MainContainer>
        <h1>대시보드</h1>
        <p>{user.displayName}님 환영합니다!</p>
      </MainContainer>
    </>
  );
}
