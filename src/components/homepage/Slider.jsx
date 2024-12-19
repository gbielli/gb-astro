import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import weatherProject from "@/assets/app-weather-projet.jpg";
import googleProject from "@/assets/google.jpg";
import landingProject from "@/assets/landing-page-projet.jpg";
import pangeeProject from "@/assets/mypangee-ux-vf.jpg";
import newsletterProject from "@/assets/newsletter-projet.jpg";
import runningProject from "@/assets/running-projet.jpg";
import digitalProject from "@/assets/site-projet-digital.jpg";
import wixProject from "@/assets/wix.jpg";
const slider1 = [
  {
    color: "#e3e5e7",
    image: weatherProject.src,
  },
  {
    color: "#d6d7dc",
    image: runningProject.src,
  },
  {
    color: "#e3e3e3",
    image: landingProject.src,
  },
  {
    color: "#21242b",
    image: googleProject.src,
  },
];

const slider2 = [
  {
    color: "#d4e3ec",
    image: newsletterProject.src,
  },
  {
    color: "#e5e0e1",
    image: digitalProject.src,
  },
  {
    color: "#d7d4cf",
    image: pangeeProject.src,
  },
  {
    color: "#e1dad6",
    image: wixProject.src,
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
                src={project.image}
                alt={`Project ${index + 1}`}
                width={400}
                height={200}
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
                src={project.image}
                alt={`Project ${index + 1}`}
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
