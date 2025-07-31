import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const BannerImages = [
  {
    id: 1,
    src: "/public/banner/banner1.png",
    alt: "Cleaning service",
  },
  {
    id: 2,
    src: "/public/banner/banner2.jpg",
    alt: "Electrician service",
  },
  // {
  //     id: 3,
  //     src: "/public/banner",
  //     alt: "Offer/Sale"
  // },
];

export default function BannerCarousel() {
  return (
    <div className="w-full h-64 md:h-96 lg:h-[450px] rounded-lg overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {BannerImages.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img
              src={banner.src}
              alt={banner.alt}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
