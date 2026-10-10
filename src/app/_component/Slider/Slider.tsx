'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
type SliderType={spaceBetween:number , slidesPerView:number ,pageList:string[]  }
export default function Slider ({spaceBetween , slidesPerView  , pageList}:SliderType) {
  return (
    <Swiper
     modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true , renderBullet(index , className){
        return `<span class='${className} bg-green-600! w-4! h-4!'></span>`

      } , bulletActiveClass:'w-8! opacity-80!' }}
    loop={true}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
    
    {pageList.map((src)=>{ return   <SwiperSlide>
        <Image src={src}  alt='pic' className='w-full h-80 object-cover' width={400} height={200}/>
    </SwiperSlide>})}

      
    </Swiper>
  );
};




