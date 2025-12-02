import ThreeDHoverImage from '../components/three-d-hover-image';
import LayeredTextMarquee from '../components/layered-text-marquee';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen w-full flex items-end justify-center px-6 pb-10 relative overflow-visible"
    >
      <LayeredTextMarquee text="FULL-STACK DEVELOPER • UI ENGINEER • JOHN CLARK VELASCO" />

      <ThreeDHoverImage />
    </section>
  );
}
