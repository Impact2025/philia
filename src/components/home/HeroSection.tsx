"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const words = "Verbinding voor iedereen die dat steuntje in de rug nodig heeft.".split(" ");

export default function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="flex flex-col md:flex-row md:min-h-[calc(100vh-80px)] items-stretch overflow-hidden">
      <div className="w-full md:w-[60%] flex flex-col justify-center px-8 md:px-24 py-16 md:py-24 bg-surface">
        <motion.h1
          className="font-serif text-5xl md:text-[68px] leading-[1.08] text-primary mb-8 editorial-max-width"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduce ? 0 : 0.07 } },
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.22em]"
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 18 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-lg md:text-[18px] text-secondary editorial-max-width mb-12 leading-relaxed"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : words.length * 0.07 + 0.2, duration: 0.6 }}
        >
          Al meer dan tien jaar bouwt Stichting Philia aan de infrastructuur die echte
          verbinding mogelijk maakt. We cureren ontmoetingen die levens veranderen.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : words.length * 0.07 + 0.5, duration: 0.5 }}
        >
          <Link href="/over-ons" className="group text-primary font-medium flex items-center gap-2 transition-all">
            Ons verhaal
            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform text-[20px]">arrow_forward</span>
          </Link>
          <Link href="/platforms" className="group text-primary font-medium flex items-center gap-2 transition-all">
            Onze platforms
            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform text-[20px]">arrow_forward</span>
          </Link>
        </motion.div>
      </div>

      <div className="w-full md:w-[40%] relative min-h-[55vw] md:min-h-0 overflow-hidden">
        <Image
          src="/images/hero.png"
          alt="Twee mensen in een oprecht gesprek aan een keukentafel"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
    </section>
  );
}
