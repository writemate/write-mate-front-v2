'use client';
import { MainContainer } from '@/styles';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/utils/initFirebase';

export default function Home() {
    const HandleRedirect = async () => {
        const result = await signInWithPopup(auth, provider);
        if (result&&result.user) {
            console.log("로그인 성공");
        }
    }

    return (
      <>
        <MainContainer>
            <h1>회원가입</h1>
            <button onClick={HandleRedirect}>구글로 회원가입</button>
        </MainContainer>
      </>
    );
  }
