'use client';
import Header from '@/components/home/Header';
import { MainContainer } from '@/styles';
import 'swiper/css';
import StartPage from '@/components/home/StartPage';
import Preview from '@/components/home/Preview';
import CurrentUsers from '@/components/home/CurrentUsers';
import Features from '@/components/home/Features';
import EndPage from '@/components/home/EndPage';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <MainContainer>
        <StartPage />
        <Preview />
        <CurrentUsers />
        <Features />
        <EndPage />
        <Footer />
      </MainContainer>
    </>
  );
}
