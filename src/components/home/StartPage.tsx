import * as Style from '@/styles/home/Home.styles';
import Link from 'next/link';

export default function StartPage() {
    return (
        <>
        <div style={{ marginTop: '9rem' }}>
          <Style.TopTitle>웹소설 창작을</Style.TopTitle>
          <Style.TopTitle $color>더욱 쉽게</Style.TopTitle>
          <Style.SubTitle><b>라이트메이트</b>와 함께 빠르고 간편한 웹소설 창작을 시작하세요.</Style.SubTitle>
        </div>
        <Style.LoginButton>
          <Link href="/signup">무료로 시작하기</Link>
        </Style.LoginButton>
        </>
    );
}
