import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTwitter } from "react-icons/fa";
import "./App.css";
import image from "./assets/image.jpg";
import fitImg from "./assets/fit.png";
import TaskFlow from "./assets/taskflowpic.png";
import Ecomm from "./assets/e-com.jpg";
import WeatherHub from "./assets/weather.jpg";
import stopewatch from "./assets/stop.jpg";
import Moviepic from "./assets/movie.jpg";
import emailjs from "@emailjs/browser";

import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Database,
  Palette,
  Terminal,
  ChevronDown,
  Send,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Theme Toggle Component
function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <motion.button
      className="theme-toggle-btn"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <div className="theme-toggle-track">
        <motion.div
          className="theme-toggle-thumb"
          animate={{
            x: isDark ? 0 : 28,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="theme-icon"
              >
                <Moon size={14} />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="theme-icon"
              >
                <Sun size={14} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stars for dark mode */}
        <div className="theme-stars">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="theme-star"
              style={{
                left: `${10 + i * 8}px`,
                top: `${6 + (i % 2) * 8}px`,
              }}
              animate={{
                opacity: isDark ? [0.3, 1, 0.3] : 0,
                scale: isDark ? [0.8, 1, 0.8] : 0,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Sun rays for light mode */}
        <div className="theme-rays">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="theme-ray"
              style={{
                transform: `rotate(${i * 45}deg)`,
              }}
              animate={{
                opacity: !isDark ? [0.5, 1, 0.5] : 0,
                scaleY: !isDark ? [0.8, 1, 0.8] : 0,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="theme-glow"
        animate={{
          background: isDark
            ? "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)",
        }}
      />
    </motion.button>
  );
}

// Navbar Component
function Navbar({ isDark, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["About", "Skills", "Projects", "Experience","Certifications", "Contact"];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}
    >
      <div className="navbar-container">
        <motion.a href="#" className="navbar-logo" whileHover={{ scale: 1.05 }}>
          <span className="logo-bracket">&lt;</span>
          FaridDev
          <span className="logo-bracket">/&gt;</span>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="nav-link"
              whileHover={{ y: -2 }}
            >
              {link}
              <span className="nav-link-underline" />
            </motion.a>
          ))}
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-nav-right">
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mobile-menu"
        >
          <div className="mobile-menu-links">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

// Typewriter Text Component
function TypewriterText({ text, delay = 0 }) {
  const letters = text.split("");

  return (
    <span className="typewriter-container">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.05,
            delay: delay + index * 0.05,
            ease: "easeOut",
          }}
          className="typewriter-letter"
          style={{ display: letter === " " ? "inline" : "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

// Animated Word Component with Glow Effect
function GlowingText({ children, delay = 0 }) {
  return (
    <motion.span
      className="glowing-text-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <motion.span
        className="glowing-text-blur"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.span>
      <span className="glowing-text">{children}</span>
    </motion.span>
  );
}

// Animated Cursor Component
function BlinkingCursor() {
  return (
    <motion.span
      className="blinking-cursor"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1] }}
    />
  );
}

// Hero Section
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [showCursor, setShowCursor] = useState(true);

  // Hide cursor after typing animation completes
  useEffect(() => {
    const timer = setTimeout(() => setShowCursor(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Roles for rotating text
  const roles = [
    "Full-Stack Developer",
    "React Specialist",
    "UI/UX Enthusiast",
    "Problem Solver",
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      {/* Animated Background */}
      <div className="hero-background">
        <motion.div
          className="hero-blob hero-blob-cyan"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hero-blob hero-blob-purple"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="hero-blob hero-blob-blue"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
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
      <motion.div
        className="grid-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      />

      <motion.div style={{ y, opacity }} className="hero-content">
        {/* Welcome Badge with Bounce */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            type: "spring",
            stiffness: 200,
          }}
          className="badge-container"
        >
          <motion.span
            className="welcome-badge"
            animate={{
              boxShadow: [
                "0 0 20px rgba(6, 182, 212, 0)",
                "0 0 20px rgba(6, 182, 212, 0.3)",
                "0 0 20px rgba(6, 182, 212, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              className="status-dot"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            Available for new projects
          </motion.span>
        </motion.div>

        {/* Main Heading with Character Animation */}
        <div className="heading-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="greeting-text"
          >
            <TypewriterText text="Hello, I'm" delay={0.5} />
          </motion.div>

          <h1 className="hero-title">
            <motion.span
              className="name-container"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <GlowingText delay={1.2}>Faridullah</GlowingText>
            </motion.span>
          </h1>
        </div>

        {/* Animated Role Text with Rotation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="role-container"
        >
          <span className="role-bracket">{"<"}</span>
          <div className="role-text-wrapper">
            <motion.div
              key={currentRoleIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="role-text"
            >
              <span className="role-gradient">{roles[currentRoleIndex]}</span>
            </motion.div>
          </div>
          <span className="role-bracket">{" />"}</span>
        </motion.div>

        {/* Tagline with Word-by-Word Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="tagline-container"
        >
          <p className="tagline-main">
            {[
              "Crafting",
              "digital",
              "experiences",
              "with",
              "clean",
              "code",
              "and",
              "creative",
              "solutions.",
            ].map((word, index) => (
              <motion.span
                key={index}
                className="tagline-word"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 2.4 + index * 0.1 }}
              >
                {word}
              </motion.span>
            ))}
          </p>
          <motion.p
            className="tagline-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 3.2 }}
          >
            I turn ideas into elegant, functional web applications.
          </motion.p>
        </motion.div>

        {/* CTA Buttons with Stagger Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.4 }}
          className="cta-container"
        >
          <motion.a
            href="#projects"
            className="cta-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="cta-shine"
              animate={{ translateX: ["100%", "-100%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <span className="cta-content">
              View Projects
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ExternalLink className="cta-icon" />
              </motion.span>
            </span>
          </motion.a>
          <motion.a
            href="#contact"
            className="cta-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="cta-secondary-bg" />
            <span className="cta-secondary-text">Contact Me</span>
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 3.8 }}
          className="social-links"
        >
          {[
            {
              icon: <Github className="social-icon" />,
              label: "GitHub",
              url: "https://github.com/FaridCraft",
            },
            {
              icon: <Linkedin className="social-icon" />,
              label: "LinkedIn",
              url: "https://www.linkedin.com/in/farid-ullah-12125634a",
            },
            {
              icon: <FaTwitter className="social-icon" />,
              label: "X",
              url: "https://x.com/FaridDev01",
            },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.url}
              target={social.label !== "Email" ? "_blank" : undefined}
              rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
              className="social-link"
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
        className="scroll-indicator"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="scroll-icon"
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// About Section
function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="about-grid"
        >
          {/* Image */}
          <motion.div variants={scaleIn} className="about-image-container">
            <div className="about-image-wrapper">
              <motion.div
                className="about-image-bg"
                animate={{ rotate: [6, 12, 6] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="about-image-inner"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={image}
                  alt="Faridullah - Full-Stack Developer"
                  className="about-image"
                />
                <div className="about-image-overlay" />
              </motion.div>
              <motion.div
                className="about-decor about-decor-cyan"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="about-decor about-decor-purple"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.7, 0.5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={fadeInUp}>
            <span className="section-label">// About Me</span>
            <h2 className="section-title">
              Building modern and reliable web applications
            </h2>
            <div className="about-text">
              <p>
                Hi, I'm Faridullah, a full-stack web developer focused on
                building fast, reliable, and user-friendly web applications. I
                enjoy working across both frontend and backend, and I care
                deeply about writing clean, maintainable code that scales well
                over time.
              </p>
              <p>
                My journey into web development began with a simple curiosity
                about how websites work behind the scenes. That curiosity
                quickly grew into a passion for creating real-world products
                that solve problems and deliver smooth user experiences. I enjoy
                translating ideas into functional interfaces and connecting them
                with solid backend logic.
              </p>
              <p>
                I'm constantly learning and refining my skills by exploring new
                technologies, improving performance, and paying attention to UI
                details. Outside of coding, I like staying up to date with
                modern web trends, experimenting with new tools, and taking
                short breaks with a good cup of coffee.
              </p>

              {/* CV Button */}
              <a
                href="Farid_Ullah_FullStack_Developer_CV.pdf.pdf"
                download
                className="cv-button"
              >
                <span>Download CV</span>
                <motion.div 
                  className="cv-button-glow"
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Skills Section
function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Frontend",
      icon: <Palette className="skill-category-icon" />,
      colorClass: "skill-gradient-cyan",
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
      icon: <Database className="skill-category-icon" />,
      colorClass: "skill-gradient-purple",
      skills: [
        { name: "Python", level: 80 },
        { name: "C++", level: 80 },
        { name: "Django", level: 60, learning: true },

        { name: "PostgreSQL", level: 70, learning: true },
      ],
    },
    {
      title: "Tools & Others",
      icon: <Terminal className="skill-category-icon" />,
      colorClass: "skill-gradient-orange",
      skills: [
        { name: "Git", level: 95 },
        { name: "VS Code", level: 99 },
        { name: "Py Charm", level: 95 },
        { name: "Dev-C++", level: 90}
      ],
    },
  ];

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="section-label">// My Skills</span>
          <h2 className="section-title-center">Technologies I Work With</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="skills-grid"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={fadeInUp}
              custom={index}
              className="skill-card"
              whileHover={{ y: -5 }}
            >
              <div className={`skill-icon-wrapper ${category.colorClass}`}>
                {category.icon}
              </div>
              <h3 className="skill-category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: 0.3 + index * 0.1 + skillIndex * 0.05,
                    }}
                  >
                    <div className="skill-header">
                      <span className="skill-name">
                        {skill.name}
                        {skill.learning && (
                          <span className="learning-badge">Learning</span>
                        )}
                      </span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className={`skill-progress ${category.colorClass}`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: 0.5 + skillIndex * 0.1,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Projects Section
function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured online store with cart functionality, payment integration, and admin dashboard.",
      image: Ecomm,
      emoji: "🛒",
      tech: ["React", "CSS"],
      liveUrl: "https://luxe-store-web.netlify.app",
      githubUrl: "https://github.com/FaridCraft/LUXE-Store",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative project management tool with real-time updates and team features.",
      image: TaskFlow,
      emoji: "📋",
      tech: ["React", "CSS"],
      liveUrl: "https://task-flow-proo.netlify.app/",
      githubUrl: "https://github.com/FaridCraft/TaskFlow-Pro",
    },
    {
      title: "Weather Dashboard",
      description:
        "Beautiful weather application with location-based forecasts and interactive maps.",
      image: WeatherHub,
      emoji: "🌤️",
      tech: ["JavaScript", "OpenWeather API", "CSS"],
      liveUrl: "https://weather-hub-web.netlify.app/",
      githubUrl: "https://github.com/FaridCraft/WeatherHub",
    },
    {
      title: "Movie Hub",
      description:
        "Modern blogging platform with markdown support, SEO optimization, and analytics.",
      image: Moviepic,
      emoji: "📝",
      tech: ["React.js", "CSS"],
      liveUrl: "https://moviehub-react-app.netlify.app",
      githubUrl: "https://github.com/FaridCraft/MovieHub",
    },
    {
      title: "Fitness Tracker",
      description:
        "Personal fitness application for tracking workouts, nutrition, and progress.",
      image: fitImg,
      emoji: "💪",
      tech: ["React.js", "CSS"],
      liveUrl: "https://fit-life-pro-webs.netlify.app/",
      githubUrl: "https://github.com/FaridCraft/fit-Life-pro-website",
    },
    {
      title: "Stop watch",
      description:
        "Tool for developers to create stunning portfolios with customizable templates.",
      image: stopewatch,
      emoji: "🎨",
      tech: ["React.js", "TailwindCss"],
      liveUrl: "https://stopwatch-web-site.netlify.app/",
      githubUrl: "https://github.com/FaridCraft/Stopewatch",
    },
  ];

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="section-label">// Featured Work</span>
          <h2 className="section-title-center">My Projects</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="projects-grid"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={fadeInUp}
              custom={index}
              className="project-card"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Project Image Container */}
              <div className="project-image-container">
                {/* Display Image or Emoji */}
                {typeof project.image === "string" &&
                project.image.length > 2 ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}

                <span
                  className="project-emoji"
                  style={{
                    display:
                      typeof project.image === "string" &&
                      project.image.length > 2
                        ? "none"
                        : "flex",
                  }}
                >
                  {project.emoji}
                </span>

                {/* Overlay */}
                <div className="project-overlay" />

                {/* Interactive Links */}
                <div className="project-links">
                  <motion.a
                    href={project.liveUrl}
                    className="project-link project-link-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      if (project.liveUrl === "#") {
                        e.preventDefault();
                      }
                    }}
                  >
                    <FaExternalLinkAlt className="link-icon" />
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    className="project-link project-link-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      if (project.githubUrl === "#") {
                        e.preventDefault();
                      }
                    }}
                  >
                    <FaGithub className="link-icon" />
                    GitHub
                  </motion.a>
                </div>
              </div>

              {/* Content */}
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      className="tech-tag"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        delay: index * 0.1 + techIndex * 0.05,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Experience / Timeline Section
function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      year: "2025 – Present",
      title: "Freelance Web Developer",
      company: "Self-Employed · Dera Ismail Khan",
      description:
        "Working as a freelance web developer, building responsive and user-friendly websites for local clients, including schools and small businesses. Managing complete projects from planning to deployment while maintaining strong client communication.",
      current: true,
    },
    {
      year: "2026 – Present",
      title: "Web Development Trainee",
      company: "SkillUp Academy",
      description:
        "Enrolled in a structured web development program, focusing on frontend technologies, real-world projects, and best practices. Gained hands-on experience with HTML, CSS, JavaScript, React, and modern development workflows.",
    },
    {
      year: "2026 – Present",
      title: "ICS Student",
      company: "Commerce College Dera Ismail Khan",
      description:
        "Currently studying ICS and have successfully passed the 2nd year. Balancing academic studies with practical web development and continuous skill improvement.",
    },
    {
      year: "2026 – Present",
      title: "Backend Development (Django)",
      company: "Learning & Practice",
      description:
        "Actively learning backend development using Django, including database design, authentication, FAST APIs, and server-side logic to grow into a full-stack developer.",
    },
    {
      year: "19 Nov 2024",
      title: "Started Web Development Journey",
      company: "Self-Taught",
      description:
        "Started my web development journey by learning the fundamentals of HTML, CSS, and JavaScript, which built a strong foundation for modern web development.",
    },
  ];

  return (
    <section id="experience" className="experience-section" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="section-label">// My Journey</span>
          <h2 className="section-title-center">Experience & Learning</h2>
        </motion.div>

        <div className="timeline">
          {/* Timeline Line */}
          <div className="timeline-line" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`timeline-item ${index % 2 === 0 ? "timeline-left" : "timeline-right"}`}
            >
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                className={`timeline-dot ${exp.current ? "timeline-dot-active" : ""}`}
              />

              {/* Content */}
              <div className="timeline-content-wrapper">
                <motion.div
                  className="timeline-card"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="timeline-year">{exp.year}</span>
                  <h3 className="timeline-title">{exp.title}</h3>
                  <p className="timeline-company">{exp.company}</p>
                  <p className="timeline-description">{exp.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}





// Cretificate 
 
const certs = [
  {
    id: 1,
    icon: "🏅",
    theme: "cyan",
    title: "Frontend Development Virtual Internship",
    issuer: "CodeAlpha",
    date: "March 2026",
    duration: "1 Month",
    credential: "CA/DF1/30465",
    description:
      "Completed a 1-month virtual internship focused on frontend development. Received a Letter of Recommendation for excellent performance and teamwork.",
    tags: ["HTML", "CSS", "JavaScript", "React.js"],
    number: "01",
  },
  {
    id: 2,
    icon: "💻",
    theme: "purple",
    title: "Frontend Website Development Course",
    issuer: "SkillUp Academy",
    date: "Nov 2024 – Apr 2025",
    duration: "6 Months",
    credential: null,
    description:
      "Completed a 6-month course in frontend website development covering HTML, CSS, JavaScript, React.js, Tailwind CSS, and modern web practices.",
    tags: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS"],
    number: "02",
  },
  {
    id: 3,
    icon: "🐍",
    theme: "blue",
    title: "Python Programming Course",
    issuer: "SkillUp Academy",
    date: "Apr 2025 – Jun 2025",
    duration: "2 Months",
    credential: null,
    description:
      "Completed a 2-month Python programming course covering core language fundamentals and practical programming skills.",
    tags: ["Python", "OOP", "Data Structures", "Algorithms"],
    number: "03",
  },
];
 
function Starfield() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 6,
    dur: Math.random() * 4 + 3,
  }));
 
  return (
    <div className="cert-starfield" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="cert-star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
 
function OrbitRings({ theme }) {
  return (
    <div className={`cert-orbit-wrap cert-orbit-${theme}`} aria-hidden="true">
      <div className="cert-orbit cert-orbit-1" />
      <div className="cert-orbit cert-orbit-2" />
    </div>
  );
}
 
function Counter({ value }) {
  return <span className="cert-num">{value}</span>;
}
 
function Certifications() {
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cert-card--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);
 
  const handleMouseMove = (e, id) => {
    const card = cardRefs.current[id];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
 
  return (
    <section id="certifications" className="cert-section" ref={sectionRef}>
      <Starfield />
 
      <div className="cert-blob cert-blob-1" aria-hidden="true" />
      <div className="cert-blob cert-blob-2" aria-hidden="true" />
      <div className="cert-blob cert-blob-3" aria-hidden="true" />
 
      {/* Header */}
      <div className="cert-header">
        <p className="cert-eyebrow">
          <span className="section-label" />
          // MY ACHIEVEMENTS
          <span className="section-label" />
        </p>
        <h2 className="cert-title">
          {"Certifications".split("").map((ch, i) => (
            <span
              key={i}
              className="cert-title-char"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h2>
        <p className="cert-subtitle">
          Professional credentials that validate my expertise and dedication
        </p>
        <div className="cert-title-bar">
          <div className="cert-title-bar-fill" />
        </div>
      </div>
 
      {/* Cards */}
      <div className="cert-grid">
        {certs.map((cert, index) => (
          <div
            key={cert.id}
            className={`cert-card cert-card--${cert.theme}`}
            ref={(el) => (cardRefs.current[index] = el)}
            style={{ "--delay": `${index * 0.18}s` }}
            onMouseEnter={() => setHoveredId(index)}
            onMouseLeave={() => setHoveredId(null)}
            onMouseMove={(e) => handleMouseMove(e, index)}
          >
            {hoveredId === index && (
              <div
                className="cert-card-glow"
                style={{ left: mousePos.x, top: mousePos.y }}
              />
            )}
 
            <div className="cert-corner cert-corner-tl" />
            <div className="cert-corner cert-corner-br" />
            <div className="cert-card-grid" aria-hidden="true" />
            <div className={`cert-ribbon cert-ribbon--${cert.theme}`} />
            <Counter value={cert.number} />
 
            <div className="cert-icon-section">
              <div className={`cert-icon-wrap cert-icon-wrap--${cert.theme}`}>
                <span className="cert-icon-emoji">{cert.icon}</span>
                <div className={`cert-icon-ring cert-icon-ring--${cert.theme}`} />
              </div>
              <OrbitRings theme={cert.theme} />
            </div>
 
            <div className="cert-content">
              <div className="cert-meta-row">
                <span className={`cert-badge cert-badge--${cert.theme}`}>
                  {cert.issuer}
                </span>
                <span className="cert-duration-chip">{cert.duration}</span>
              </div>
 
              <h3 className="cert-card-title">{cert.title}</h3>
 
              <div className="cert-date-row">
                <svg className="cert-date-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>{cert.date}</span>
              </div>
 
              <div className="cert-divider">
                <div className={`cert-divider-fill cert-divider-fill--${cert.theme}`} />
              </div>
 
              <p className="cert-card-desc">{cert.description}</p>
 
              {cert.credential && (
                <div className={`cert-credential cert-credential--${cert.theme}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cert-cred-icon">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>ID: {cert.credential}</span>
                </div>
              )}
 
              <div className="cert-tags">
                {cert.tags.map((tag, ti) => (
                  <span
                    key={tag}
                    className={`cert-tag cert-tag--${cert.theme}`}
                    style={{ animationDelay: `${ti * 0.08}s` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
 
            <div className="cert-particles" aria-hidden="true">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`cert-particle cert-particle--${cert.theme}`}
                  style={{
                    left: `${10 + i * 11}%`,
                    animationDelay: `${i * 0.4}s`,
                    width: `${3 + (i % 3)}px`,
                    height: `${3 + (i % 3)}px`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
 
      {/* Stats bar */}
      <div className="cert-stats">
        {[
          { val: "3+", label: "Certifications" },
          { val: "9+", label: "Months of Training" },
          { val: "1", label: "Letter of Recommendation" },
        ].map((s) => (
          <div key={s.label} className="cert-stat-item">
            <span className="cert-stat-val">{s.val}</span>
            <span className="cert-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}










// Contact Section
function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        "service_kx2ad1f",
        "template_mvu6ua2",
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message,
        },
        "_1WOlE1PgsPiVupYq",
      )
      .then(
        () => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormState({ name: "", email: "", message: "" });
          setTimeout(() => setIsSubmitted(false), 3000);
        },
        (error) => {
          setIsSubmitting(false);
          console.error("EmailJS Error:", error);
          alert("Failed to send message. Please try again.");
        },
      );
  };

  const socialLinks = [
    {
      icon: <Github className="social-icon" />,
      url: "https://github.com/FaridCraft",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="social-icon" />,
      url: "https://www.linkedin.com/in/farid-ullah-12125634a",
      label: "LinkedIn",
    },
    {
      icon: <FaTwitter className="social-icon" />,
      label: "X",
      url: "https://x.com/FaridDev01",
    },
  ];

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="section-label">// Get In Touch</span>
          <h2 className="section-title-center">Let's Work Together</h2>
          <p className="section-subtitle">
            Have a project in mind or want to chat? Feel free to reach out. I'm
            always open to discussing new opportunities and ideas.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="contact-grid"
        >
          <motion.form
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="contact-form"
          >
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="success-message"
              >
                <span className="success-icon">✓</span>
                <div>
                  <p className="success-title">Message sent successfully</p>
                  <p className="success-text">
                    Thanks for reaching out. I'll get back to you shortly.
                  </p>
                </div>
              </motion.div>
            )}

            {["name", "email"].map((field) => (
              <div key={field} className="form-group">
                <motion.input
                  type={field === "email" ? "email" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formState[field]}
                  onChange={(e) =>
                    setFormState({ ...formState, [field]: e.target.value })
                  }
                  onFocus={() => setFocusedField(field)}
                  onBlur={() => setFocusedField(null)}
                  className={`form-input ${
                    focusedField === field ? "form-input-focused" : ""
                  }`}
                  required
                />
              </div>
            ))}

            <div className="form-group">
              <motion.textarea
                placeholder="Your Message"
                rows={5}
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className={`form-textarea ${
                  focusedField === "message" ? "form-input-focused" : ""
                }`}
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="submit-btn-content">
                {isSubmitting ? (
                  <motion.div
                    className="loading-spinner"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ) : isSubmitted ? (
                  "Message Sent! ✓"
                ) : (
                  <>
                    Send Message
                    <Send className="send-icon" />
                  </>
                )}
              </span>
            </motion.button>
          </motion.form>

          <motion.div variants={fadeInUp} className="contact-info">
            <div className="contact-info-card">
              <h3 className="contact-info-title">Connect with me</h3>
              <p className="contact-info-text">
                Follow me on social media or send me an email. I usually respond
                within 24 hours.
              </p>

              <div className="contact-social-links">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    className="contact-social-link"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>

              <div className="contact-details">
                <div className="contact-detail">
                  <p className="contact-detail-label">Email</p>
                  <a
                    href="mailto:faridullah.dev01@gmail.com"
                    className="contact-detail-value"
                  >
                    faridullah.dev01@gmail.com
                  </a>
                </div>
                <div className="contact-detail">
                  <p className="contact-detail-label">Phone</p>
                  <a href="tel:+923494288200" className="contact-detail-value">
                    +92 34 94288200
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="footer-text"
          >
            © 2026 Faridullah. Built with React ,CSS.
          </motion.p>
          <div className="footer-links">
            {["About", "Projects", "Contact"].map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="footer-link"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App
export function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`app ${isDark ? "theme-dark" : "theme-light"}`}>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;














