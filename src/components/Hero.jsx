import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, ChevronDown } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { TypewriterText } from "./ui/TypewriterText";

const roles = ["Full-Stack Developer", "React Specialist", "UI/UX Enthusiast", "Problem Solver"];

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-20 w-72 h-72 md:w-96 md:h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-72 h-72 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 md:w-150 md:h-150 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/50 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Welcome Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
          className="mb-6 md:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            Available for new projects
          </span>
        </motion.div>

        {/* Heading */}
        <div className="mb-4 md:mb-6">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-400 text-base sm:text-lg md:text-xl mb-2"
          >
            <TypewriterText text="Hello, I'm" delay={0.5} />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
          >
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500">
              Faridullah
            </span>
          </motion.h1>
        </div>

        {/* Animated Role Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mb-6 md:mb-8"
        >
          <span className="text-slate-500 font-mono text-lg sm:text-xl md:text-3xl">{"<"}</span>
          <div className="inline-block mx-1 sm:mx-2">
            <motion.div
              key={currentRoleIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-xl sm:text-2xl md:text-3xl font-bold"
            >
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">
                {roles[currentRoleIndex]}
              </span>
            </motion.div>
          </div>
          <span className="text-slate-500 font-mono text-lg sm:text-xl md:text-3xl">{" />"}</span>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="mb-8 md:mb-12"
        >
          <p className="text-slate-400 text-sm sm:text-base md:text-xl leading-relaxed px-4">
            {["Crafting", "digital", "experiences", "with", "clean", "code", "and", "creative", "solutions."].map(
              (word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 2.4 + index * 0.1 }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              )
            )}
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 3.2 }}
            className="text-slate-500 mt-4"
          >
            I turn ideas into elegant, functional web applications.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 md:mb-12"
        >
          <motion.a
            href="#projects"
            className="relative px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm sm:text-base overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-linear-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              View Projects
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ExternalLink size={16} className="sm:w-4.5 sm:h-4.5" />
              </motion.span>
            </span>
          </motion.a>
          <motion.a
            href="#contact"
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-slate-600 text-slate-300 font-semibold text-sm sm:text-base hover:border-cyan-500 hover:text-cyan-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 3.8 }}
          className="flex items-center justify-center gap-3 sm:gap-4"
        >
          {[
            { icon: <FaGithub className="w-5 h-5" />, label: "GitHub", url: "https://github.com/FaridCraft" },
            { icon: <FaLinkedin className="w-5 h-5" />, label: "LinkedIn", url: "https://www.linkedin.com/in/farid-ullah-12125634a" },
            { icon: <FaTwitter className="w-5 h-5" />, label: "X", url: "https://x.com/FaridDev01" },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 4 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ChevronDown size={24} className="sm:w-7 sm:h-7" />
        </motion.div>
      </motion.div>
    </section>
  );
}