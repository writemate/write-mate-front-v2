'use client';
import Header from '@/components/Header';
import { MainContainer } from '@/styles';
import * as Style from '@/styles/Home.styles';
import Link from 'next/link';
import Background1 from '@/assets/home/background1.svg';
import Video1 from '@/assets/home/video1.gif';
import Video2 from '@/assets/home/video2.gif';
import Video3 from '@/assets/home/video3.gif';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Header />
      <MainContainer>
        <div style={{ marginTop: '9rem' }}>
          <Style.TopTitle>웹소설 창작을</Style.TopTitle>
          <Style.TopTitle $color>더욱 쉽게</Style.TopTitle>
          <Style.SubTitle><b>라이트메이트</b>와 함께 빠르고 간편한 웹소설 창작을 시작하세요.</Style.SubTitle>
        </div>
        <Style.LoginButton>
          <Link href="/signup">무료로 시작하기</Link>
        </Style.LoginButton>
        <div style={{ width: "100%", position: "relative", textAlign:"center" }}>
          <Background1 />
          <div className="swiper-button-prev">prev</div>
          <div className="swiper-button-next">next</div>
          <Swiper
            style={{ width: "100%", height: "100%" }}
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            slidesPerView={1}
          >
            <SwiperSlide>
              <Image
                loading="eager"
                priority={true}
                className="no-drag mx-auto rounded md:max-w-none"
                src={Video1}
                width={900}
                style={{maxWidth: "100%", height: "auto", overflow: "hidden"}}
                alt="웹소설 창작을 더욱 쉽게 만드는 라이트 메이트 | 웹소설 쓰는 프로그램 - 라이트메이트(write mate)"
              />
            </SwiperSlide>

            <SwiperSlide>
              <Image
                loading="eager"
                priority={true}
                className="no-drag mx-auto rounded md:max-w-none"
                src={Video2}
                width={900}
                style={{maxWidth: "100%", height: "auto", overflow: "hidden"}}
                alt="웹소설 창작을 더욱 쉽게 만드는 라이트 메이트 | 웹소설 쓰는 프로그램 - 라이트메이트(write mate)"
              />
            </SwiperSlide>

            <SwiperSlide>
              <Image
                loading="eager"
                priority={true}
                className="no-drag mx-auto rounded md:max-w-none"
                src={Video3}
                width={900}
                style={{maxWidth: "100%", height: "auto", overflow: "hidden"}}
                alt="웹소설 창작을 더욱 쉽게 만드는 라이트 메이트 | 웹소설 쓰는 프로그램 - 라이트메이트(write mate)"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </MainContainer>
    </>
  );
}
