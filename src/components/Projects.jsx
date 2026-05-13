import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { SectionLabel } from "./ui/SectionLabel";

// Import Images
import ecommerceImg from "../assets/e-com.jpg";
import taskImg from "../assets/taskflowpic.png";
import weatherImg from "../assets/weather.jpg";
import movieImg from "../assets/movie.jpg";
import fitnessImg from "../assets/fit.png";
import stopwatchImg from "../assets/stop.jpg";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with cart functionality, payment integration, and admin dashboard.",
    image: ecommerceImg,
    tech: ["React", "CSS"],
    liveUrl: "https://luxe-store-web.netlify.app",
    githubUrl: "https://github.com/FaridCraft/LUXE-Store",
  },

  {
    title: "Task Management App",
    description:
      "Collaborative project management tool with real-time updates and team features.",
    image: taskImg,
    tech: ["React", "CSS"],
    liveUrl: "https://task-flow-proo.netlify.app/",
    githubUrl: "https://github.com/FaridCraft/TaskFlow-Pro",
  },

  {
    title: "Weather Dashboard",
    description:
      "Beautiful weather application with location-based forecasts and interactive maps.",
    image: weatherImg,
    tech: ["JavaScript", "OpenWeather API", "CSS"],
    liveUrl: "https://weather-hub-web.netlify.app/",
    githubUrl: "https://github.com/FaridCraft/WeatherHub",
  },

  {
    title: "Movie Hub",
    description:
      "Modern movie discovery platform with search and filtering capabilities.",
    image: movieImg,
    tech: ["React.js", "CSS"],
    liveUrl: "https://moviehub-react-app.netlify.app",
    githubUrl: "https://github.com/FaridCraft/MovieHub",
  },

  {
    title: "Fitness Tracker",
    description:
      "Personal fitness application for tracking workouts, nutrition, and progress.",
    image: fitnessImg,
    tech: ["React.js", "CSS"],
    liveUrl: "https://fit-life-pro-webs.netlify.app/",
    githubUrl: "https://github.com/FaridCraft/fit-Life-pro-website",
  },

  {
    title: "Stopwatch",
    description:
      "A sleek and functional stopwatch application with multiple timer modes.",
    image: stopwatchImg,
    tech: ["React.js", "TailwindCss"],
    liveUrl: "https://stopwatch-web-site.netlify.app/",
    githubUrl: "https://github.com/FaridCraft/Stopewatch",
  },
];

export function Projects() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      id="projects"
      className="py-12 sm:py-16 md:py-20 lg:py-32 bg-slate-900"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <SectionLabel>// Featured Work</SectionLabel>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 sm:mt-4 px-4">
            My Featured Work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Projects
            </span>
          </h2>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-slate-800/50 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/30 transition-all group"
            >

              {/* Project Image */}
              <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">

                  {/* Live Demo */}
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-full bg-cyan-500 text-white hover:bg-cyan-400 transition-colors"
                    aria-label="View live demo"
                  >
                    <FaExternalLinkAlt className="text-lg" />
                  </motion.a>

                  {/* GitHub */}
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition-colors"
                    aria-label="View GitHub repository"
                  >
                    <FaGithub className="text-lg" />
                  </motion.a>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-1">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm mb-4 line-clamp-2 sm:line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}