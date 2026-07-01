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
    <section className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 py-12 text-neutral-950 sm:px-8 sm:py-16 lg:px-[clamp(4rem,9vw,150px)] lg:py-[80px]">
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
                className="text-2xl font-medium leading-snug tracking-tight sm:text-3xl sm:leading-[1.24] lg:text-[clamp(2.5rem,3.7vw,2.875rem)] lg:leading-[1.28]"
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
                    className="text-base font-normal leading-relaxed text-neutral-600 sm:text-lg sm:leading-[26px] lg:text-[18px] lg:leading-[29px] lg:text-justify"
                  >
                    {t}
                  </motion.p>
                ))
              ) : (
                <motion.p
                  variants={fadeUpVariants}
                  custom={1}
                  className="text-base font-normal leading-relaxed text-neutral-600 sm:text-lg sm:leading-[26px] lg:text-[18px] lg:leading-[29px] lg:text-justify"
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
                    className="flex items-start gap-3 text-base text-neutral-600 sm:text-lg"
                  >
                    <ArrowRightCircle className="mt-1 shrink-0 text-[#8400FF]" size={22} />
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
                className="list-inside list-disc space-y-2 text-base text-neutral-600 sm:space-y-3 sm:text-lg lg:text-[18px]"
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
