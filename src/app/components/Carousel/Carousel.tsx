"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import { MdOutlineArrowBack, MdOutlineArrowForward } from "react-icons/md";

const avatarColors = [
  "bg-purple-600", "bg-blue-600", "bg-indigo-600",
  "bg-violet-600", "bg-fuchsia-600", "bg-pink-600", "bg-cyan-600",
];

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

const getAvatarColor = (name: string) =>
  avatarColors[name.charCodeAt(0) % avatarColors.length];

const TWEEN_FACTOR_BASE = 0.84;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type TestimonialType = {
  review: string;
  name: string;
  position: string;
  image: string;
};

type PropType = {
  testimonials: TestimonialType[];
  options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = ({ testimonials, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [activeIndex, setActiveIndex] = useState(0);
  const tweenFactor = useRef(0);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenOpacity = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const opacity = numberWithinRange(tweenValue, 0, 1).toString();
          emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);

    const updateActiveIndex = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi
      .on("reInit", setTweenFactor)
      .on("reInit", tweenOpacity)
      .on("scroll", tweenOpacity)
      .on("slideFocus", tweenOpacity)
      .on("select", updateActiveIndex);
  }, [emblaApi, setTweenFactor, tweenOpacity]);

  const nextSlide = () => emblaApi && emblaApi.scrollNext();
  const prevSlide = () => emblaApi && emblaApi.scrollPrev();

  return (
    <div className="w-full relative flex flex-col">
      <div className="w-full h-full absolute left-0 top-0 flex items-center justify-between px-4 md:px-20 pb-6">
        <button onClick={prevSlide} className="z-50 cursor-pointer">
          <MdOutlineArrowBack size={24} />
        </button>
        <button onClick={nextSlide} className="z-50 cursor-pointer">
          <MdOutlineArrowForward size={24} />
        </button>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom ml-[-16px]">
          {testimonials.map((testimonial, index) => (
            <div
              className="cursor-grab active:cursor-grabbing relative flex-shrink-0 min-w-0 pl-4 w-[75%] xl:w-[70%] 2xl:w-[50%] translate-z-0"
              key={index}
            >
              <div className="px-2 md:px-5 py-12 bg-[#19133F]/50 w-full h-full flex flex-col gap-20 text-center items-center justify-between rounded-[12px]">
                <div className="px-4 lg:px-20 flex flex-grow items-center justify-center">
                  <p
                    className={`text-[0.875rem] md:text-[1.125rem] leading-[20px] md:leading-[28px] text-white`}
                  >
                    {testimonial.review}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 w-full">
                  <span className="w-full h-[1px] bg-white/20"></span>
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className={`h-11 w-11 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0 ${getAvatarColor(testimonial.name)}`}>
                      {getInitials(testimonial.name)}
                    </div>
                    <div className="flex flex-col text-left">
                      <p
                        className={`font-medium text-[1.375rem] leading-[27.2px] bg-gradient-to-r from-[#5BB0FF] to-[#6F58FF] bg-clip-text text-transparent tracking-[-0.76px]`}
                      >
                        {testimonial.name}
                      </p>
                      <p
                        className={`text-[0.75rem] leading-[19.7px] text-[#ffff]`}
                      >
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex items-center justify-center pt-6 gap-1">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`w-8 h-[2px] rounded-full transition-all duration-300 ${
              activeIndex === index ? "bg-[#FFFFFF]" : "bg-[#FFFFFF]/25"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
