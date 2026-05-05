import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "./ui/SectionLabel";

const experiences = [
  {
    year: "March 2026 (1 Month)",
    title: "Frontend Development Virtual Internship",
    company: "CodeAlpha · Credential ID: CA/DF1/30465",
    description: "Completed a 1-month virtual internship focused on frontend development. Received a Letter of Recommendation for excellent performance and teamwork.",
    current: true,
  },
  {
    year: "Nov 2024 – Present",
    title: "Junior Web Developer / Trainee",
    company: "SkillUp Academy · Dera Ismail Khan",
    description: "Hands-on training in modern web development. Working with HTML, CSS, JavaScript, Tailwind CSS, and React on real-world projects.",
    current: true,
  },
  {
    year: "2024 – Present",
    title: "Backend Development (Django)",
    company: "Self-Taught",
    description: "Teaching myself Django basics including models, views, templates, and authentication. Building small projects to connect frontend with a working backend.",
  },
  {
    year: "2023 – Present",
    title: "Intermediate in Computer Science (ICS)",
    company: "Commerce College · Dera Ismail Khan",
    description: "Successfully passed 2nd year. Focus on computer science fundamentals and practical web development.",
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-32 bg-slate-800/50" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <SectionLabel>// My Journey</SectionLabel>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4">
            Experience &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Learning
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-start mb-6 sm:mb-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                className={`absolute left-4 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full -translate-x-1/2 z-10 ${
                  exp.current ? "bg-cyan-400 ring-4 ring-cyan-400/30" : "bg-slate-500"
                }`}
              />

              {/* Content Card */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-900/50 rounded-xl p-4 sm:p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-colors"
                >
                  <span className="inline-block px-2.5 sm:px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                    {exp.year}
                  </span>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">{exp.title}</h3>
                  <p className="text-purple-400 text-xs sm:text-sm font-medium mb-2">{exp.company}</p>
                  <p className="text-slate-400 text-xs sm:text-sm">{exp.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}