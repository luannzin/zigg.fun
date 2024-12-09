"use client";

import { motion } from "motion/react";

const Home = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        initial={{
          top: "-800px",
        }}
        animate={{
          top: "-350px",
        }}
        transition={{
          duration: 1.25,
          ease: "easeOut",
        }}
        className="absolute w-[1920px] bg-sky-500 h-96 inset-0 -left-1/2 -top-[600px] blur-[200px]"
      />
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-center gap-1">
          <div className="flex">
            {"zigg.fun".split("").map((letter, index) => (
              <motion.strong
                key={`${letter}-${index * 2}`}
                className="text-6xl"
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.15,
                  ease: "easeOut",
                  delay: index * 0.04,
                }}
              >
                {letter}
              </motion.strong>
            ))}
          </div>
          <motion.span
            initial={{
              y: -12,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
              delay: 0.35,
            }}
            className="font-roboto"
          >
            developed with coffee, by{" "}
            <a
              href="https://github.com/luannzin"
              target="_blank"
              rel="noreferrer"
              className="text-sky-500 hover:text-sky-600"
            >
              luannzin
            </a>
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default Home;
