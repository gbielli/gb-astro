import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedButton from "../AnimatedButton";

const skillItem = [
  {
    title: "Web Analytics",
    description:
      "Je mets en place un suivi utilisateurs first party avec des outils RGPD compliant comme Matomo ou Piwik Pro.",
  },
  {
    title: "User experience",
    description:
      "Je vous accompagne sur le plan créatif et technique pour développer une expérience utilisateur mémorable.",
  },
  {
    title: "Acquisition client",
    description:
      "Je développe votre stratégie SEO et SEA avec une logique data-driven.",
  },

  {
    title: "Automation",
    description:
      "J'automatise des tâches et je connecte vos outils pour maximiser le ROI.",
  },
];

const animation = {
  initial: {
    y: "100%",
    opacity: 0,
  },
  enter: (i) => ({
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.9, // Durée plus longue
      ease: [0.33, 1, 0.68, 1],
      delay: 0.12 * i, // Délai légèrement augmenté
    },
  }),
};

// Animation pour le titre et la description
const contentAnimation = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const Skill = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <section className="py-40 px-2 md:px-10 z-1 relative">
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          <h2 className="font-archivo font-normal text-xl text-[#808080]">
            Je peux vous aider sur ...
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-1 mt-10">
          {skillItem.map((skill, index) => {
            return (
              <div className="border-b border-t border-[#d4d4d4]" key={index}>
                <div className="overflow-hidden">
                  {" "}
                  {/* Ajout du conteneur avec overflow-hidden */}
                  <motion.div
                    className="item font-archivo flex items-center justify-between my-[3.5rem] w-full"
                    variants={animation}
                    initial="initial"
                    custom={index}
                    whileInView="enter"
                    viewport={{
                      once: true,
                      margin: "-100px",
                    }}
                  >
                    <div className="flex items-center md:gap-10 h-full flex-col md:flex-row md:text-left w-full">
                      <div className="title flex w-full">
                        <h3 className="font-skills text-[55px] font-clash pb-4 relative">
                          {skill.title}
                        </h3>
                        <motion.div
                          variants={contentAnimation}
                          className="font-archivo text-[#c3c4c9] text-sm font-normal ml-1 translate-y-3"
                        >
                          0{index + 1}
                        </motion.div>
                      </div>
                      <motion.p
                        className="md:w-2/3"
                        variants={contentAnimation}
                      >
                        {skill.description}
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
        <AnimatedButton href="/blog" client:load />
      </div>
    </section>
  );
};

export default Skill;
