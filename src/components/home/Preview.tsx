import Background1 from "@/assets/home/background1.svg";
import Video1 from "@/assets/home/video1.gif";
import Video2 from "@/assets/home/video2.gif";
import Video3 from "@/assets/home/video3.gif";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { NavigationButton } from "@/styles/home/Home.styles";

export default function Preview() {
  return (
    <div style={{ width: "100%", position: "relative", textAlign: "center" }}>
      <Background1 />
      <NavigationButton className="swiper-button-prev">
        <svg className="h-7 w-7 rotate-180  fill-gray-500 " viewBox="0 0 18 18">
          <path d="m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"></path>
        </svg>
      </NavigationButton>
      <NavigationButton className="swiper-button-next">
        <svg className="h-7 w-7 fill-gray-500" viewBox="0 0 18 18">
          <path d="m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"></path>
        </svg>
      </NavigationButton>
      <Swiper
        style={{ width: "100%", height: "100%" }}
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        onSlideChange={() => console.log("slide change")}
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
            style={{ maxWidth: "100%", height: "auto", overflow: "hidden" }}
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
            style={{ maxWidth: "100%", height: "auto", overflow: "hidden" }}
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
            style={{ maxWidth: "100%", height: "auto", overflow: "hidden" }}
            alt="웹소설 창작을 더욱 쉽게 만드는 라이트 메이트 | 웹소설 쓰는 프로그램 - 라이트메이트(write mate)"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
