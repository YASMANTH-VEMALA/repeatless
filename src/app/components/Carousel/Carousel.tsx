"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import { ArrowLeft, ArrowRight } from "lucide-react";

const avatarColors = [
  "bg-purple-600", "bg-blue-600", "bg-indigo-600",
  "bg-violet-600", "bg-fuchsia-600", "bg-pink-600", "bg-cyan-600",
];

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

const getAvatarColor = (name: string) =>
  avatarColors[name.charCodeAt(0) % avatarColors.length];

const TWEEN_FACTOR_BASE = 0.84;
const AUTOPLAY_DELAY = 3600;

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
  const [isPaused, setIsPaused] = useState(false);
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

    updateActiveIndex();

    emblaApi
      .on("reInit", setTweenFactor)
      .on("reInit", tweenOpacity)
      .on("scroll", tweenOpacity)
      .on("slideFocus", tweenOpacity)
      .on("select", updateActiveIndex);
  }, [emblaApi, setTweenFactor, tweenOpacity]);

  useEffect(() => {
    if (!emblaApi || isPaused) return;

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      emblaApi.scrollNext();
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [emblaApi, isPaused]);

  const nextSlide = () => emblaApi && emblaApi.scrollNext();
  const prevSlide = () => emblaApi && emblaApi.scrollPrev();

  return (
    <div
      className="w-full relative flex flex-col"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[var(--background)] to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[var(--background)] to-transparent md:w-40" />

      <div className="overflow-hidden py-4" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom ml-[-18px]">
          {testimonials.map((testimonial, index) => (
            <div
              className="cursor-grab active:cursor-grabbing relative flex-shrink-0 min-w-0 pl-[18px] w-[84%] md:w-[64%] xl:w-[48%] 2xl:w-[42%] translate-z-0"
              key={index}
            >
              <div className="group/card px-6 md:px-10 py-10 md:py-12 bg-white/78 border border-black/8 shadow-[0_18px_60px_rgba(20,20,20,0.07)] backdrop-blur-md w-full min-h-[330px] md:min-h-[360px] flex flex-col gap-12 text-center items-center justify-between rounded-[10px] transition duration-500 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_80px_rgba(20,20,20,0.11)]">
                <div className="flex flex-grow items-center justify-center">
                  <p
                    className="max-w-[720px] text-[0.95rem] md:text-[1.12rem] leading-[1.75] text-neutral-800"
                  >
                    {testimonial.review}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 w-full">
                  <span className="w-full h-[1px] bg-black/10"></span>
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0 shadow-[0_10px_24px_rgba(80,66,255,0.18)] ${getAvatarColor(testimonial.name)}`}>
                      {getInitials(testimonial.name)}
                    </div>
                    <div className="flex flex-col text-center md:text-left">
                      <p
                        className="font-medium text-[1.25rem] leading-[1.2] bg-gradient-to-r from-[#4F9BFF] to-[#6F58FF] bg-clip-text text-transparent tracking-[-0.02em]"
                      >
                        {testimonial.name}
                      </p>
                      <p
                        className="text-[0.76rem] leading-[1.45] text-neutral-500"
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

      <div className="w-full flex items-center justify-center pt-5 gap-4">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous testimonial"
          className="z-30 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/75 text-neutral-950 shadow-sm backdrop-blur transition hover:-translate-x-0.5 hover:bg-white"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </button>
        <div className="flex items-center justify-center gap-1.5">
          {testimonials.map((_, index) => (
            <button
              type="button"
              key={index}
              aria-label={`Go to testimonial ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-[3px] rounded-full transition-all duration-300 ${
                activeIndex === index ? "w-9 bg-neutral-950" : "w-5 bg-black/20 hover:bg-black/35"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next testimonial"
          className="z-30 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/75 text-neutral-950 shadow-sm backdrop-blur transition hover:translate-x-0.5 hover:bg-white"
        >
          <ArrowRight size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
