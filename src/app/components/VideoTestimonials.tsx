"use client";

import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";

const videos = [
  {
    name: "Client Name",
    role: "Founder, Company · USA",
    videoUrl: "", // paste YouTube embed URL here e.g. https://www.youtube.com/embed/VIDEO_ID
    thumbnail: "",
  },
  {
    name: "Client Name",
    role: "CEO, Company · Canada",
    videoUrl: "",
    thumbnail: "",
  },
  {
    name: "Client Name",
    role: "Director, Company · UK",
    videoUrl: "",
    thumbnail: "",
  },
];

export default function VideoTestimonials() {
  return (
    <section className="w-full bg-[#04051B] py-20 sm:py-28 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-14">

        {/* Heading */}
        <motion.div
          className="flex flex-col items-center text-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 px-4 py-1.5 bg-[rgba(77,0,255,0.1)] border border-white/10 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8400FF] shadow-[0_0_10px_#6D21F0]" />
            <span className="text-[#8400FF] text-sm font-dmSans">Video Testimonials</span>
          </div>
          <h2 className="text-white font-poppins font-semibold text-3xl sm:text-5xl leading-tight tracking-tight">
            Hear It From the Businesses I&apos;ve Built For
          </h2>
          <p className="text-white/50 font-dmSans text-base sm:text-lg max-w-xl leading-relaxed">
            Real clients. Real results. Recorded in their own words.
          </p>
        </motion.div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Video embed or placeholder */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10">
                {v.videoUrl ? (
                  <iframe
                    src={v.videoUrl}
                    title={`Testimonial from ${v.name}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  /* Placeholder — replace videoUrl to activate */
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-white/20">
                    <div className="w-14 h-14 rounded-full border-2 border-white/10 flex items-center justify-center">
                      <FiPlay className="w-6 h-6 ml-1" />
                    </div>
                    <span className="font-dmSans text-xs">Video coming soon</span>
                  </div>
                )}
              </div>

              {/* Client info */}
              <div className="flex flex-col gap-1 px-1">
                <p className="text-white font-poppins font-medium text-base">{v.name}</p>
                <p className="text-white/40 font-dmSans text-sm">{v.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
