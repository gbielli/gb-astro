import { motion, useAnimate, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const animations = {
  fadeUp: {
    initial: { y: "100%" },
    enter: (i) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.85, 0, 0.15, 1],
        delay: 0.095 * i,
      },
    }),
  },
  fadeIn: {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: [0.85, 0, 0.15, 1],
        delay: 0.095,
      },
    },
  },
};

const Hero = () => {
  const [scope, animate] = useAnimate();
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // Set window height after component mount
    setWindowHeight(window.innerHeight);
  }, []);

  const rotateValue = useTransform(scrollY, [0, windowHeight], [0, 360]);

  useEffect(() => {
    if (windowHeight === 0) return; // Skip animation until window height is available

    const animateRotation = () => {
      animate(
        scope.current,
        {
          rotate: rotateValue.get(),
        },
        {
          duration: 0,
          ease: "linear",
        }
      );
      requestAnimationFrame(animateRotation);
    };

    animateRotation();

    return () => {
      // Cleanup animation frame on unmount if needed
    };
  }, [animate, rotateValue, windowHeight]);

  return (
    <section className="flex items-center bg-grey min-h-screen w-full">
      <div className="md:px-6 mt-6 w-full flex flex-col items-center gap-20">
        <div className="self-start relative w-[140px] h-[140px]">
          <img
            src="/src/assets/arrow.svg"
            alt="arrow"
            className="w-[30px] h-[30px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          />
          <motion.div ref={scope} className="absolute inset-0">
            <svg viewBox="0 0 140 140" className="w-full h-full">
              <path
                id="circlePath"
                d="M 70,70 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                fill="none"
                className="invisible"
              />
              <text className="text-[18px]">
                <textPath
                  href="#circlePath"
                  startOffset="0%"
                  className="fill-current"
                >
                  • digital • digital • digital • digital • digital • digital
                </textPath>
              </text>
            </svg>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 w-full">
          <h1 className="col-span-1 md:col-span-2 w-full">
            {["Digital", "worker"].map((word, index) => (
              <span
                key={index}
                className="overflow-hidden relative inline-flex leading-none md:leading-[17vw]"
              >
                <motion.span
                  className="text-[15vw] sm:text-[17vw] md:text-[17vw] font-clash text-black
                           block md:inline-block
                           leading-[0.9] md:leading-[17vw]"
                  custom={index}
                  variants={animations.fadeUp}
                  initial="initial"
                  whileInView="enter"
                  viewport={{ once: true }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <div className="col-span-1 self-end">
            <motion.p
              className="text-base sm:text-lg text-black pb-5 lg:pb-10
                       max-w-[42ch] md:max-w-none"
              variants={animations.fadeIn}
              initial="initial"
              whileInView="enter"
              viewport={{ once: true }}
            >
              J'aide les entreprises à développer l'acquisition client et à
              construire une expérience utilisateur hors norme.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
