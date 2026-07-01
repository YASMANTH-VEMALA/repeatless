"use client";

import Image from "next/image";
import { useState } from "react";
import { FiPlay } from "react-icons/fi";
import { ContainerScroll } from "@/Components/ui/container-scroll-animation";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-[#f4f1ec] px-4 py-10 text-neutral-950 sm:px-6 md:py-14">
      <ContainerScroll
        titleComponent={
          <div className="mx-auto max-w-4xl px-1 sm:px-4">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8400FF]">
              / Demo Walkthrough
            </p>
            <h2 className="mt-4 font-poppins text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-[clamp(3rem,5vw,3.75rem)]">
              See how a real automation system comes together.
            </h2>
          </div>
        }
      >
        <div className="relative h-full w-full bg-neutral-950">
          {!isPlaying ? (
            <>
              <Image
                src="/images/video-section-thumbnail-cropped.png"
                alt="Build your n8n automations SaaS tools video thumbnail"
                fill
                priority={false}
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover object-center"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label="Play automation demo video"
                className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/55 bg-white/18 text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-md transition-transform duration-300 hover:scale-105 md:h-28 md:w-28"
              >
                <FiPlay className="ml-1 h-9 w-9 fill-white md:h-12 md:w-12" />
              </button>
            </>
          ) : (
            <video
              src="/images/Repeatless.mp4"
              autoPlay
              controls
              playsInline
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </ContainerScroll>
    </section>
  );
};

export default VideoSection;
