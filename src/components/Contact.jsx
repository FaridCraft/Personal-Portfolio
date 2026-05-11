import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { SectionLabel } from "./ui/SectionLabel";

emailjs.init("fWv_fBA0-pHdjlmmk");

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      user_name: formState.name,
      user_email: formState.email,
      message: formState.message,
      to_email: "faridullah.dev01@gmail.com",
    };

    try {
      const result = await emailjs.send(
        "service_dkssxzy",
        "template_ern9l6m",
        templateParams
      );

      console.log("SUCCESS:", result);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert(error?.text || "Failed to send message. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: <FaGithub className="w-5 h-5" />, url: "https://github.com/FaridCraft", label: "GitHub" },
    { icon: <FaLinkedin className="w-5 h-5" />, url: "https://www.linkedin.com/in/farid-ullah-12125634a", label: "LinkedIn" },
    { icon: <FaTwitter className="w-5 h-5" />, url: "https://x.com/FaridDev01", label: "X" },
  ];

  return (
    <section id="contact" className="py-20 bg-slate-800/50" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionLabel>// Get In Touch</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-4">
            Let's{" "}
            <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Work Together
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 space-y-6"
          >
            {isSubmitted && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-semibold text-lg">Message Sent!</p>
                  <p className="text-sm">I'll get back to you soon.</p>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name *"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
                className="w-full px-4 py-4 rounded-xl bg-slate-900/50 border-2 border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-400 transition-all"
              />
              <input
                type="email"
                placeholder="Your Email *"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                required
                className="w-full px-4 py-4 rounded-xl bg-slate-900/50 border-2 border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-400 transition-all"
              />
            </div>

            <textarea
              placeholder="Your Message *"
              rows="5"
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              required
              className="w-full px-4 py-4 rounded-xl bg-slate-900/50 border-2 border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-400 resize-vertical transition-all"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 transition-all group"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Send Message
                  <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-700/50 h-fit">
              <h3 className="text-2xl font-bold text-white mb-6">Get in touch</h3>

              <div className="flex items-center gap-4 mb-8">
                {socialLinks.map(({ icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300"
                    aria-label={label}
                  >
                    {icon}
                  </a>
                ))}
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-slate-500 text-sm font-medium mb-2">Email</p>
                  <a
                    href="mailto:faridullah.dev01@gmail.com"
                    className="text-cyan-400 hover:text-cyan-300 text-xl font-semibold block transition-colors"
                  >
                    faridullah.dev01@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-medium mb-2">Phone</p>
                  <a
                    href="tel:+923494288200"
                    className="text-cyan-400 hover:text-cyan-300 text-xl font-semibold block transition-colors"
                  >
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