import { motion } from "framer-motion";

const animation = {
  initial: { y: "100%", opacity: 0 },
  animate: (i) => ({
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.025 * i,
    },
  }),
};

const MaskText = () => {
  const phrase =
    " Un développeur manque souvent de sensibilité marketing, et un marketeur manque souvent de connaissance en développement web. J'ai décidé de faire les deux.";

  return (
    <section className="bg-grey block mt-10 min-h-[200px]">
      <div className="xl:w-2/4 md:w-3/5 w-full px-8 leading-10">
        <h4 className="relative">
          {phrase.split(" ").map((word, index) => (
            <span
              key={index}
              className="overflow-hidden inline-block font-archivo font-normal"
            >
              <motion.span
                className="inline-block mr-1 text-4xl text-black "
                custom={index}
                variants={animation}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                  margin: "-60px",
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h4>
      </div>
    </section>
  );
};

export default MaskText;
