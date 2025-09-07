"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
  const [active, setActive] = useState(0);

  // Rotate spotlight every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-[99vw] h-[90vh] sm:h-[80vh] flex items-center mt-[65px] justify-center bg-gradient-to-l from-[#c4deff] via-gray-100 to-[#c4deff] overflow-hidden px-4 sm:px-8">
      {/* Soft glowing background orbs */}
      <div className="absolute -top-40 -left-40 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-indigo-200 to-gray-300 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-64 sm:w-[500px] h-64 sm:h-[500px] bg-gradient-to-r from-gray-400 to-indigo-300 rounded-full blur-3xl opacity-30 animate-spin-slow" />

      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 w-full max-w-7xl">
        {/* LEFT: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent drop-shadow-sm">
              Home Services,{" "}
            </span>
            <span className="bg-gradient-to-r from-gray-500 via-gray-950 to-gray-700 bg-clip-text text-transparent">
              One TAP Away
            </span>
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-600 max-w-md sm:max-w-lg mx-auto md:mx-0">
            Book trusted <span className="font-semibold text-gray-800">professionals</span> for cleaning, repair, and more — right at your doorstep.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 mt-6 sm:mt-10">
            <Link
              href="haute"
              className="flex items-center gap-2 px-5 sm:px-7 py-2 sm:py-3 rounded-full bg-gray-900 text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition"
            >
              Hire Now
            </Link>
            <Link
              href="haute"
              className="flex items-center gap-2 px-5 sm:px-7 py-2 sm:py-3 rounded-full bg-white/70 backdrop-blur-md border border-gray-300 text-gray-700 font-medium shadow hover:bg-white transition"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>

        {/* RIGHT: Character Images with spotlight effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 flex justify-center relative mt-6 md:mt-0"
        >
          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl flex items-center justify-center">
            {["/images/clean2.png", "/images/elec2.png", "/images/clean3.png"].map(
              (src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    scale: active === i ? 1 : 0.96,
                  }}
                  transition={{ duration: 0.8 }}
                  className="absolute"
                >
                  <Image
                    src={src}
                    alt="Service"
                    width={300}
                    height={300}
                    className="drop-shadow-2xl rounded-2xl sm:rounded-3xl"
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 540px"
                  />
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Subtle bottom gradient overlay */}
      <div className="absolute bottom-0 w-full h-24 sm:h-32 bg-gradient-to-t from-gray-200 via-gray-100 to-transparent" />

      {/* Animations */}
      <style jsx global>{`
        .animate-spin-slow {
          animation: spin 25s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
