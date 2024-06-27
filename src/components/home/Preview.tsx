import Background1 from '@/assets/home/background1.svg';
import Video1 from '@/assets/home/video1.gif';
import Video2 from '@/assets/home/video2.gif';
import Video3 from '@/assets/home/video3.gif';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

export default function Preview() {
    
    return (
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
                unoptimized={true}
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
                unoptimized={true}
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
                unoptimized={true}
                style={{maxWidth: "100%", height: "auto", overflow: "hidden"}}
                alt="웹소설 창작을 더욱 쉽게 만드는 라이트 메이트 | 웹소설 쓰는 프로그램 - 라이트메이트(write mate)"
              />
            </SwiperSlide>
          </Swiper>
        </div>
    );
}
