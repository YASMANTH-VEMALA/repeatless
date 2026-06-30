"use client";
import { ArrowRightCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";

type BodySection = {
  title?: string;
  text?: string | string[];
  stats?: Array<{ value: string; label: string; highlight?: boolean }>;
  iconList?: string[];
  image?: string;
  video?: string;
  bullets?: string[];
};

type BodyProps = { sections: BodySection[] };

// ✅ Fade-up variants
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.15 },
  }),
};

export default function BlogBody({ sections }: BodyProps) {
  return (
    <section className="relative flex flex-col items-center px-6 sm:px-12 lg:px-[150px] py-12 sm:py-16 lg:py-[80px] w-full max-w-[1440px] mx-auto text-neutral-950">
      <div className="flex flex-col gap-16 sm:gap-20 lg:gap-[90px] w-full max-w-[940px]">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-6 sm:gap-8 lg:gap-10"
          >
            {/* Title */}
            {section.title && (
              <motion.h2
                variants={fadeUpVariants}
                custom={0}
                className="text-2xl sm:text-3xl lg:text-[46px] leading-snug sm:leading-[48px] lg:leading-[66px] font-medium tracking-tight"
              >
                {section.title}
              </motion.h2>
            )}

            {/* Text */}
            {section.text &&
              (Array.isArray(section.text) ? (
                section.text.map((t, i) => (
                  <motion.p
                    key={i}
                    variants={fadeUpVariants}
                    custom={i + 1}
                    className="text-base sm:text-lg lg:text-[18px] leading-relaxed sm:leading-[26px] lg:leading-[29px] font-normal text-neutral-600 text-justify"
                  >
                    {t}
                  </motion.p>
                ))
              ) : (
                <motion.p
                  variants={fadeUpVariants}
                  custom={1}
                  className="text-base sm:text-lg lg:text-[18px] leading-relaxed sm:leading-[26px] lg:leading-[29px] font-normal text-neutral-600 text-justify"
                >
                  {section.text}
                </motion.p>
              ))}

            {/* Stats Grid */}


            {/* Icon List */}
            {section.iconList && (
              <motion.div
                variants={fadeUpVariants}
                custom={3}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
              >
                {section.iconList.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUpVariants}
                    custom={i + 4}
                    className="flex items-center gap-3 text-base sm:text-lg text-neutral-600"
                  >
                    <ArrowRightCircle className="text-[#8400FF]" size={22} />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Media: prefer video if provided, else image */}
            {(section.video || section.image) && (
              <motion.div
                variants={fadeUpVariants}
                custom={4}
                className="w-full h-[220px] sm:h-[300px] lg:h-[390px] rounded-xl overflow-hidden"
              >
                {section.video ? (
                  section.video.includes("youtube.com") || section.video.includes("youtu.be") ? (
                    <iframe
                      src={
                        section.video.includes("embed")
                          ? section.video
                          : section.video.includes("watch?v=")
                          ? section.video.replace("watch?v=", "embed/")
                          : section.video.replace("youtu.be/", "www.youtube.com/embed/")
                      }
                      title="Section Video"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <video src={section.video} className="w-full h-full object-cover" controls />
                  )
                ) : (
                  <img
                    src={section.image as string}
                    alt="Blog Section"
                    className="w-full h-full object-cover"
                  />
                )}
              </motion.div>
            )}

            {/* Bullets */}
            {section.bullets && (
              <motion.ul
                variants={fadeUpVariants}
                custom={5}
                className="list-disc list-inside space-y-2 sm:space-y-3 text-base sm:text-lg lg:text-[18px] text-neutral-600"
              >
                {section.bullets.map((b, i) => (
                  <motion.li key={i} variants={fadeUpVariants} custom={i + 6}>
                    {b}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
