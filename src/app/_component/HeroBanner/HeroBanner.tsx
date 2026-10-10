'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

type HeroSlide = { image: StaticImageData; title: string; text: string }

export default function HeroBanner({ slides }: { slides: HeroSlide[] }) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [active, setActive] = useState(0)

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay]}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-[260px] md:h-[330px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-700/90 via-green-600/70 to-transparent" />

              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto xl:max-w-7xl px-6 md:px-16 text-white">
                  <h2 className="max-w-md text-3xl md:text-4xl font-bold leading-tight">
                    {slide.title}
                  </h2>
                  <p className="mt-3 text-sm md:text-base">{slide.text}</p>
                  <div className="mt-6 flex gap-3">
                    <Link
                      href="/shop"
                      className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-50"
                    >
                      Shop Now
                    </Link>
                    <Link
                      href="/categories"
                      className="rounded-md border border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                    >
                      View Deals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-green-700 shadow hover:bg-white md:flex cursor-pointer"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-green-700 shadow hover:bg-white md:flex cursor-pointer"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.title}
            onClick={() => swiperRef.current?.slideToLoop(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              active === i ? 'w-6 bg-white' : 'w-2 bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
