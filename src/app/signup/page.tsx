'use client';
import { MainContainer } from '@/styles';
import { useLogin } from '@/stores/useLogin';

export default function Home() {
    const login = useLogin((state) => state.login);

    return (
      <>
        <MainContainer>
            <h1>회원가입</h1>
            <button onClick={login}>구글로 회원가입</button>
        </MainContainer>
      </>
    );
  }
