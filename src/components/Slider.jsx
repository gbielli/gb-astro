import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const slider1 = [
  {
    color: "#e3e5e7",
    src: "app-weather-projet.jpg",
  },
  {
    color: "#d6d7dc",
    src: "running-projet.jpg",
  },
  {
    color: "#e3e3e3",
    src: "landing-page-projet.jpg",
  },
  {
    color: "#21242b",
    src: "google.jpg",
  },
];

const slider2 = [
  {
    color: "#d4e3ec",
    src: "newsletter-projet.jpg",
  },
  {
    color: "#e5e0e1",
    src: "site-projet-digital.jpg",
  },
  {
    color: "#d7d4cf",
    src: "mypangee-ux.jpg",
  },
  {
    color: "#e1dad6",
    src: "wix.jpg",
  },
];

const Slider = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div
      ref={container}
      className="w-full md:flex flex-col gap-10 relative pt-40 bg-grey hidden overflow-hidden"
    >
      <motion.div
        style={{ x: x1 }}
        className="flex relative gap-10 left-[-10vw] w-[150vw]"
      >
        {slider1.map((project, index) => (
          <div
            key={index}
            className="w-[40vw] h-[20vw] flex items-center justify-center"
            style={{ backgroundColor: project.color }}
          >
            <div className="relative w-3/4 h-3/4">
              <img
                src={`/image/${project.src}`}
                alt={`Project ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        style={{ x: x2 }}
        className="flex relative gap-10 left-[-10vw] w-[150vw]"
      >
        {slider2.map((project, index) => (
          <div
            key={index}
            className="w-[40vw] h-[20vw] flex items-center justify-center"
            style={{ backgroundColor: project.color }}
          >
            <div className="relative w-3/4 h-[80%]">
              <img
                src={`/image/${project.src}`}
                alt={`Project ${index + 5}`}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Slider;
