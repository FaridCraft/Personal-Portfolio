import { motion } from "framer-motion";

export function SectionLabel({ children, className = "" }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`text-cyan-400 font-mono text-sm ${className}`}
    >
      {children}
    </motion.span>
  );
}