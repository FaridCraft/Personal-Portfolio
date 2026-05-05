import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { SectionLabel } from "./ui/SectionLabel";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send("service_8dali0t", "template_k9zkz6c", {
        from_name: formState.name,
        from_email: formState.email,
        message: formState.message,
      }, "pzqBdZ3Q_-ErLtGRn")
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
        }
      );
  };

  const socialLinks = [
    { icon: <FaGithub className="w-5 h-5" />, url: "https://github.com/FaridCraft", label: "GitHub" },
    { icon: <FaLinkedin className="w-5 h-5" />, url: "https://www.linkedin.com/in/farid-ullah-12125634a", label: "LinkedIn" },
    { icon: <FaTwitter className="w-5 h-5" />, url: "https://x.com/FaridDev01", label: "X" },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-32 bg-slate-800/50" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <SectionLabel>// Get In Touch</SectionLabel>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4">
            Let's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Work Together
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Have a project in mind or want to chat? Feel free to reach out. I'm always open to discussing new opportunities and ideas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-4 sm:space-y-6"
          >
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400"
              >
                <span className="text-xl">✓</span>
                <div>
                  <p className="font-semibold text-sm sm:text-base">Message sent successfully</p>
                  <p className="text-xs sm:text-sm text-green-400/70">Thanks for reaching out. I'll get back to you shortly.</p>
                </div>
              </motion.div>
            )}

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <input
                type="text"
                placeholder="Your Name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                required
                className={`w-full px-4 py-3 rounded-xl bg-slate-900/50 border text-sm sm:text-base ${
                  focusedField === "name" ? "border-cyan-500 ring-2 ring-cyan-500/20" : "border-slate-700/50"
                } text-white placeholder-slate-500 focus:outline-none transition-all`}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
                className={`w-full px-4 py-3 rounded-xl bg-slate-900/50 border text-sm sm:text-base ${
                  focusedField === "email" ? "border-cyan-500 ring-2 ring-cyan-500/20" : "border-slate-700/50"
                } text-white placeholder-slate-500 focus:outline-none transition-all`}
              />
            </div>

            <textarea
              placeholder="Your Message"
              rows={4}
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              required
              className={`w-full px-4 py-3 rounded-xl bg-slate-900/50 border text-sm sm:text-base ${
                focusedField === "message" ? "border-cyan-500 ring-2 ring-cyan-500/20" : "border-slate-700/50"
              } text-white placeholder-slate-500 focus:outline-none transition-all resize-none`}
            />

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm sm:text-base hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  Send Message
                  <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-slate-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700/50">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Connect with me</h3>
              <p className="text-slate-400 mb-4 sm:mb-6 text-sm">
                Follow me on social media or send me an email. I usually respond within 24 hours.
              </p>

              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-slate-500 text-xs sm:text-sm mb-1">Email</p>
                  <a href="mailto:faridullah.dev01@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
                    faridullah.dev01@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-slate-500 text-xs sm:text-sm mb-1">Phone</p>
                  <a href="tel:+923494288200" className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
                    +92 34 94288200
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}