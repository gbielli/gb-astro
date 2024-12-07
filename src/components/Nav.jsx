import { blur, menuSlide, translate } from "@/lib/utils";
import { motion } from "framer-motion";

const Nav = ({ links, selectedLink, setSelectedLink }) => {
  const getChars = (word) => {
    let chars = [];
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          className="inline-block uppercase select-none"
          variants={translate}
          custom={[i * 0.02, (word.length - i) * 0.02]}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </motion.span>
      );
    });
    return chars;
  };

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed top-0 right-0 w-full md:h-auto z-50 bg-black"
    >
      <div className="wrapper flex flex-col pt-20 md:pt-0 items-center h-full md:flex-row gap-10 my-10 mx-10 text-white overflow-hidden">
        {links?.map((link, index) => {
          const { title, href } = link;
          return (
            <motion.a
              onMouseOver={() => {
                setSelectedLink({ isHover: true, index });
              }}
              onMouseLeave={() => {
                setSelectedLink({ isHover: false, index });
              }}
              variants={blur}
              key={index}
              animate={
                selectedLink.isHover && selectedLink.index != index
                  ? "open"
                  : "closed"
              }
              className="text-3xl no-underline"
              href={href}
            >
              {getChars(title)}
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Nav;
