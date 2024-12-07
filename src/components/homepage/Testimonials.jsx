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
    img: "seb-avatar.png",
    avis: "J'ai eu le plaisir de travailler avec Guillaume sur plusieurs missions. Son investissement, sa rigueur et sa qualité de travail ont été des atouts majeurs dans la réussite de ces divers projets. Son enthousiasme au quotidien permet de travailler sérieusement dans une atmosphère très agréable.",
    tag: ["UX/UI", "Analytics"],
    date: "2023",
  },
  {
    prenom: "Cindy Tardres",
    poste: "Freelance",
    img: "cindy-avatar.png",
    avis: "J'ai eu la chance de travailler avec Guillaume pendant plus d'un an. Ses qualités de formateur, sa rigueur et sa curiosité font de lui un excellent expert dans son domaine de prédilection, la data analyse et le tracking de données. Collaborer avec lui est une véritable chance de voir ses projets se concrétiser efficacement et dans la bonne humeur.",
    tag: ["UX/UI", "Acquisition"],
    date: "2023",
  },
  {
    prenom: "Maeva ",
    poste: "Mypangee",
    img: "maeva-avtr.png",
    avis: "Ayant travaillé avec Guillaume quelques années je ne peux que recommander sa force d'esprit au sein d'une entreprise. Guillaume est talentueux dans son domaine, il a un réel esprit d'équipe, c'est une personne investit et dynamique. Il a été une réelle clé de voûte au sein de notre entreprise et je le remercie pour nos nombreuses collaborations.",
    tag: ["Automation", "UX/UI"],
    date: "2022",
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
                src={`/image/${avis.img}`}
                alt={`Photo de ${avis.prenom}`}
                className="w-[70px] h-[70px] object-cover rounded-full"
              />
              <div className="">
                <p className="font-bold">{avis.prenom}</p>
                <p className="text-[#808080]">{avis.poste}</p>
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
                className=" py-6 px-2 flex justify-between items-center"
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
