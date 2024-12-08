import { motion } from "framer-motion";
import { useState } from "react";

const buttonSlide = {
  initial: {
    y: "100%",
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  enter: {
    y: "0",
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const AnimatedButton = ({ href }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="mt-20 text-center">
      <a href={href}>
        <button
          className="border border-black px-20 py-5 rounded-full text-center relative overflow-hidden"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <span className="text-black">En savoir plus</span>
          <div className="overflow-hidden flex justify-center items-center">
            <motion.span
              variants={buttonSlide}
              initial="initial"
              animate={isHover ? "enter" : "initial"}
              className="bg-black absolute py-5 bottom-0 w-full rounded-full text-white"
            >
              Lets go !
            </motion.span>
          </div>
        </button>
      </a>
    </div>
  );
};

export default AnimatedButton;
