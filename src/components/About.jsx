import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "./ui/SectionLabel";

import im from "../assets/image.jpg"; // Ensure this path is correct based on your project structure

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-16 sm:py-20 md:py-32 bg-slate-900" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Background decoration */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl opacity-20 blur-xl"
                animate={{ rotate: [6, 12, 6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Main image container */}
              <div className="relative bg-slate-800/50 rounded-2xl p-3 sm:p-4 border border-slate-700/50">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-xl"
                >
                  <img
                    src={im}
                    alt="Faridullah - Full-Stack Developer"
                    className="w h-auto rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                </motion.div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-cyan-500/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-20 h-20 sm:w-32 sm:h-32 bg-purple-500/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <SectionLabel>// About Me</SectionLabel>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-4 sm:mb-6">
              Building modern and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                reliable web applications
              </span>
            </h2>
            
            <div className="space-y-3 sm:space-y-4 text-slate-400 leading-relaxed text-sm sm:text-base">
              <p>
                Hi, I'm Faridullah, a full-stack web developer focused on building fast, reliable, and user-friendly web applications. I enjoy working across both frontend and backend, and I care deeply about writing clean, maintainable code that scales well over time.
              </p>
              <p>
                My journey into web development began with a simple curiosity about how websites work behind the scenes. That curiosity quickly grew into a passion for creating real-world products that solve problems and deliver smooth user experiences.
              </p>
              <p>
                I'm constantly learning and refining my skills by exploring new technologies, improving performance, and paying attention to UI details. Outside of coding, I like staying up to date with modern web trends and taking short breaks with a good cup of coffee.
              </p>
            </div>

            {/* CV Button */}
            <motion.a
              href="Farid-Ullah-React-ASP.NET-Resume.pdf"
              download
              className="relative inline-flex items-center gap-2 mt-6 sm:mt-8 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm sm:text-base overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Download CV
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}