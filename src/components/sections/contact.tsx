"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/erson.editz/",
    icon: "/icons/instagram.svg",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@ersoneditz",
    icon: "/icons/youtube.svg",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ersoneditz/",
    icon: "/icons/linkedin.svg",
  },
  {
    name: "Fiverr",
    url: "https://www.fiverr.com/s/BRk6mpW",
    icon: "/icons/fiverr.svg",
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.location,
    href: null,
  },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormState("error");
      setErrorMessage("Please fill in all fields");
      setTimeout(() => setFormState("idle"), 5000);
      return;
    }

    setFormState("loading");

    try {
      const response = await fetch("https://formspree.io/f/mldrkylo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", message: "" });
        // Reset after showing success
        setTimeout(() => setFormState("idle"), 5000);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
      setFormState("error");
      setErrorMessage("Sorry, there was a problem sending your message. Please try again later.");
      setTimeout(() => setFormState("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="section bg-secondary/30" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest">
            Contact
          </span>
          <h2 className="section-heading mt-4">
            Get In <span className="text-accent">Touch</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Ready to bring your video project to life? Let&apos;s discuss how we
            can work together to create something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border card-hover"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="font-medium hover:text-accent transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <p className="text-sm text-muted-foreground mb-4">
                Connect with me
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-card border border-border hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={20}
                      height={20}
                      className="w-5 h-5 dark:invert"
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20"
            >
              <h3 className="font-display font-semibold text-lg mb-2">
                Prefer Quick Hiring?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Check out my Fiverr profile for quick project quotes and instant
                booking.
              </p>
              <motion.a
                href="https://www.fiverr.com/s/BRk6mpW"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View on Fiverr
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-8 rounded-3xl bg-card border border-border"
            >
              <h3 className="font-display font-semibold text-xl mb-6">
                Send Me a Message
              </h3>

              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-xl bg-secondary border border-border",
                    "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                    "transition-all duration-300 placeholder:text-muted-foreground/50"
                  )}
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-xl bg-secondary border border-border",
                    "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                    "transition-all duration-300 placeholder:text-muted-foreground/50"
                  )}
                  placeholder="your@email.com"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl bg-secondary border border-border resize-none",
                    "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                    "transition-all duration-300 placeholder:text-muted-foreground/50"
                  )}
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={formState === "loading"}
                className={cn(
                  "w-full btn-accent justify-center",
                  formState === "success" && "bg-green-500 hover:bg-green-500",
                  formState === "error" && "bg-red-500 hover:bg-red-500"
                )}
                whileHover={formState === "idle" ? { scale: 1.01 } : {}}
                whileTap={formState === "idle" ? { scale: 0.99 } : {}}
              >
                {formState === "idle" && (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
                {formState === "loading" && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                )}
                {formState === "success" && (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Message Sent!
                  </>
                )}
                {formState === "error" && (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    Try Again
                  </>
                )}
              </motion.button>

              {/* Form Message */}
              {formState === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 text-sm text-center"
                >
                  Thank you for your message! I will get back to you soon.
                </motion.div>
              )}
              {formState === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm text-center"
                >
                  {errorMessage}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
