import { Pagination, A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

//lazyload
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// image base url
import { ImageBaseUrl } from "../../constants/BASE_URL";

// interface
import { SwiperPropsType } from "../../interfaces";

export default (props: SwiperPropsType) => {
  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      {props.imgArr.length &&
        props.imgArr.map((img, index) => (
          <SwiperSlide key={index}>
            <LazyLoadImage
              src={`${ImageBaseUrl}${img}`}
              alt={`Slide ${index}`}
              className={` ${
                props.col ? " rounded-t-[10px]" : " rounded-[10px]"
              }  h-full w-full`}
              style={{ height: props.col ? "260px" : "140px" }}
              height={props.col ? 260 : 140}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
