import cindyAvatar from "@/assets/cindy-avatar.png";
import dinnoLogo from "@/assets/dinno-logo.jpeg";
import maevaAvatar from "@/assets/maeva-avtr.png";
import sebAvatar from "@/assets/seb-avatar.png";
import { motion } from "framer-motion";

// Animation améliorée pour le conteneur
const containerAnimation = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// Animation améliorée pour chaque carte
const cardAnimation = {
  initial: {
    y: 100,
    opacity: 0,
    scale: 0.95,
  },
  enter: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Animation pour les éléments internes
const contentAnimation = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const testimonial = [
  {
    prenom: "Sebastien Bonnefis",
    poste: "CEO @Yose",
    img: sebAvatar.src,
    avis: "J'ai eu le plaisir de travailler avec Guillaume...",
    tag: ["UX/UI", "Analytics"],
    date: "2023",
  },
  {
    prenom: "Cindy Tardres",
    poste: "Freelance",
    img: cindyAvatar.src,
    avis: "J'ai eu la chance de travailler avec Guillaume...",
    tag: ["UX/UI", "Acquisition"],
    date: "2023",
  },
  {
    prenom: "Maeva ",
    poste: "Mypangee",
    img: maevaAvatar.src,
    avis: "Ayant travaillé avec Guillaume quelques années...",
    tag: ["Automation", "UX/UI"],
    date: "2022",
  },
  {
    prenom: "Alexandra",
    poste: "Dinno Santé",
    img: dinnoLogo.src,
    avis: "Très bon contact avec Guillaume...",
    tag: ["Analytics", "Matomo"],
    date: "2024",
  },
];

const Testimonials = () => {
  return (
    <div className=" md:px-10 mb-40 h-full">
      <motion.h2
        className="font-clash text-4xl mb-20"
        variants={contentAnimation}
        initial="initial"
        whileInView="enter"
        viewport={{ once: true }}
      >
        On a travaillé ensemble
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
        variants={containerAnimation}
        initial="initial"
        whileInView="enter"
        viewport={{ once: true, margin: "-100px" }}
      >
        {testimonial.map((avis, index) => (
          <motion.div
            variants={cardAnimation}
            className="card border border-black-2 rounded-3xl w-full flex flex-col xl:h-[470px]"
            key={index}
          >
            <motion.div
              className="name flex items-center gap-3 py-6 mb-5 px-2 md:px-6"
              variants={contentAnimation}
            >
              <img
                src={avis.img}
                alt={`Photo de ${avis.prenom}`}
                className="w-[70px] h-[70px] object-cover rounded-full"
              />
              <div className="">
                <p className="font-bold m-0">{avis.prenom}</p>
                <p className="text-[#808080] m-0">{avis.poste}</p>
              </div>
            </motion.div>

            <motion.div
              className="testimonial  mb-10 px-2 md:px-6"
              variants={contentAnimation}
            >
              <p>{avis.avis}</p>
            </motion.div>

            <div className="flex flex-col h-full justify-end">
              <div className="bg-[#d4d4d4] h-[1px] mx-5"></div>
              <motion.div
                className=" py-6 px-2 md:px-6 flex justify-between items-center"
                variants={contentAnimation}
              >
                <div className="flex flex-wrap self-end gap-3">
                  {avis.tag.map((tag, index) => (
                    <span
                      key={index}
                      className="border-black border px-6 py-2 rounded-full"
                    >
                      {" "}
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="">
                  <p className="text-[#808080] mb-0">{avis.date}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Testimonials;
