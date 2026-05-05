import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "./ui/SectionLabel";

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
    description: "Completed a 1-month virtual internship focused on frontend development. Received a Letter of Recommendation for excellent performance and teamwork.",
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
    description: "Completed a 6-month course in frontend website development covering HTML, CSS, JavaScript, React.js, Tailwind CSS, and modern web practices.",
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
    description: "Completed a 2-month Python programming course covering core language fundamentals and practical programming skills.",
    tags: ["Python", "OOP", "Data Structures", "Algorithms"],
    number: "03",
  },
];

const themeColors = {
  cyan: {
    gradient: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    glow: "shadow-cyan-500/20",
  },
  purple: {
    gradient: "from-purple-500 to-pink-600",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-400",
    glow: "shadow-purple-500/20",
  },
  blue: {
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    glow: "shadow-blue-500/20",
  },
};

export function Certifications() {
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("translate-y-8");
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
    <section id="certifications" className="py-16 sm:py-20 md:py-32 bg-slate-900 relative overflow-hidden" ref={sectionRef}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <SectionLabel>// MY ACHIEVEMENTS</SectionLabel>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Certifications
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Professional credentials that validate my expertise and dedication
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {certs.map((cert, index) => {
            const colors = themeColors[cert.theme];
            return (
              <div
                key={cert.id}
                className={`relative bg-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border ${colors.border} hover:shadow-xl ${colors.glow} transition-all translate-y-8`}
                ref={(el) => { cardRefs.current[index] = el; }}
                style={{ transitionDelay: `${index * 0.18}s` }}
                onMouseEnter={() => setHoveredId(index)}
                onMouseLeave={() => setHoveredId(null)}
                onMouseMove={(e) => handleMouseMove(e, index)}
              >
                {/* Glow effect on hover */}
                {hoveredId === index && (
                  <div
                    className={`absolute w-48 h-48 rounded-full bg-gradient-to-r ${colors.gradient} opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none`}
                    style={{ left: mousePos.x, top: mousePos.y }}
                  />
                )}

                {/* Number badge */}
                <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 ${colors.bg} ${colors.text} font-mono text-xs sm:text-sm font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full`}>
                  {cert.number}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${colors.gradient} flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6`}>
                  {cert.icon}
                </div>

                {/* Content */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`${colors.bg} ${colors.text} text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded`}>
                      {cert.issuer}
                    </span>
                    <span className="text-slate-500 text-[10px] sm:text-xs">{cert.duration}</span>
                  </div>

                  <h3 className="text-base sm:text-xl font-bold text-white mb-2">{cert.title}</h3>

                  <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={2} />
                      <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} />
                      <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} />
                      <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} />
                    </svg>
                    <span>{cert.date}</span>
                  </div>

                  <div className={`h-0.5 bg-gradient-to-r ${colors.gradient} mb-3 sm:mb-4 opacity-50`} />

                  <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4">{cert.description}</p>

                  {cert.credential && (
                    <div className={`flex items-center gap-2 ${colors.bg} ${colors.text} text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg mb-3 sm:mb-4 w-fit`}>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span>ID: {cert.credential}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {cert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}