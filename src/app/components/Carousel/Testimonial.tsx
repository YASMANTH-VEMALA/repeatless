import { EmblaOptionsType } from "embla-carousel";
import Carousel from "./Carousel";
import { Testimonial } from "../../../../public/data/testimonialData";

interface TestimonialCarouselProps {
  testimonialData: Testimonial[];
}

const TestimonialCarousel = ({ testimonialData }: TestimonialCarouselProps) => {
  const OPTIONS: EmblaOptionsType = { loop: true };

  return (
    <>
     <Carousel testimonials={testimonialData} options={OPTIONS} />
    </>
  );
};

export default TestimonialCarousel;
