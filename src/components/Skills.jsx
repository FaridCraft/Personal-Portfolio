import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Palette, Database, Terminal } from "lucide-react";
import { SectionLabel } from "./ui/SectionLabel";

const skillCategories = [
  {
    title: "Frontend",
    icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6" />,
    gradient: "from-cyan-500 to-blue-600",
    skills: [
      { name: "HTML5", level: 99 },
      { name: "CSS3", level: 98 },
      { name: "JavaScript", level: 90 },
      { name: "React", level: 85 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    title: "Backend",
    icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />,
    gradient: "from-purple-500 to-pink-600",
    skills: [
      { name: "Python", level: 80 },
      { name: "C++", level: 80 },
      { name: "PostgreSQL", level: 70, learning: true },
    ],
  },
  {
    title: "Tools & Others",
    icon: <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />,
    gradient: "from-orange-500 to-red-600",
    skills: [
      { name: "Git", level: 95 },
      { name: "VS Code", level: 99 },
      { name: "PyCharm", level: 95 },
      { name: "Dev-C++", level: 90 },
    ],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-32 bg-slate-800/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <SectionLabel>// My Skills</SectionLabel>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4">
            Technologies I{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Work With
            </span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-slate-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-colors"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center text-white mb-4 sm:mb-6`}>
                {category.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">{category.title}</h3>
              
              <div className="space-y-3 sm:space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                      <span className="text-slate-300 font-medium text-xs sm:text-sm flex items-center gap-2">
                        {skill.name}
                        {skill.learning && (
                          <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                            Learning
                          </span>
                        )}
                      </span>
                      <span className="text-cyan-400 text-xs sm:text-sm font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 sm:h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${category.gradient} rounded-full`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: 0.5 + skillIndex * 0.1,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}