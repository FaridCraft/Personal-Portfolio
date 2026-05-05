import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-6 sm:py-8 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-400 text-xs sm:text-sm"
          >
            © 2026 Faridullah. Built with React & Tailwind CSS.
          </motion.p>
          <div className="flex items-center gap-4 sm:gap-6">
            {["About", "Projects", "Contact"].map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-slate-400 hover:text-cyan-400 transition-colors text-xs sm:text-sm"
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