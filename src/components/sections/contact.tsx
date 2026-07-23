"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Loader2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
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

const helpOptions = [
  "Ongoing content editing (retainer)",
  "One-time project",
  "Brand strategy / content system",
  "Not sure yet, want to discuss",
];

const volumeOptions = [
  "1-2 videos/month",
  "3-8 videos/month",
  "9+ videos/month",
  "Not sure yet",
];

const budgetOptions = [
  "$500-1,500/mo",
  "$1,500-3,000/mo",
  "$3,000+/mo",
  "Let's discuss",
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [step, setStep] = useState<1 | 2>(1);
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    helpNeeded: "",
    company: "",
    website: "",
    monthlyVolume: "",
    budgetRange: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.helpNeeded) {
      setFormState("error");
      setErrorMessage("Please complete all fields in Step 1 to continue.");
      setTimeout(() => setFormState("idle"), 4000);
      return;
    }
    setFormState("idle");
    setErrorMessage("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.company.trim() ||
      !formData.website.trim() ||
      !formData.monthlyVolume ||
      !formData.budgetRange
    ) {
      setFormState("error");
      setErrorMessage("Please complete all fields in Step 2.");
      setTimeout(() => setFormState("idle"), 4000);
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
          "Name": formData.name,
          "Email": formData.email,
          "What do you need help with?": formData.helpNeeded,
          "Company / Brand Name": formData.company,
          "Website / Social Link": formData.website,
          "Monthly Content Volume": formData.monthlyVolume,
          "Budget Range": formData.budgetRange,
        }),
      });

      if (response.ok) {
        setFormState("success");
        setFormData({
          name: "",
          email: "",
          helpNeeded: "",
          company: "",
          website: "",
          monthlyVolume: "",
          budgetRange: "",
        });
        setStep(1);
        setTimeout(() => setFormState("idle"), 6000);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormState("error");
      setErrorMessage(
        "Sorry, there was a problem sending your details. Please try again later."
      );
      setTimeout(() => setFormState("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="section bg-background relative overflow-hidden" ref={ref}>
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            Contact
          </span>
          <h2 className="section-heading mt-4">
            Get In <span className="text-accent">Touch</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Ready to build a repeatable content engine for your brand? Let&apos;s map out your vision together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Info (Left Side) */}
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
              <p className="text-sm text-muted-foreground mb-4 font-medium">
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

            {/* Quick Hiring WhatsApp CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/20"
            >
              <h3 className="font-display font-semibold text-lg mb-2">
                Prefer Quick Hiring?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contact me directly on WhatsApp for instant project inquiries and quick quotes.
              </p>
              <motion.a
                href="https://wa.me/9779825968458?text=Hi%20Erson,%20I'd%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent text-sm inline-flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                WhatsApp Direct Contact
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Form Container (Right Side - Reframed 2-Step Form) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 rounded-3xl bg-card border border-border shadow-soft-lg"
          >
            {/* Header & Subtitle */}
            <div className="mb-6">
              <h3 className="font-display font-semibold text-2xl mb-1.5 text-foreground">
                Tell me about your project
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Takes about a minute, I&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {/* Visual Step Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className={cn(step >= 1 ? "text-accent" : "text-muted-foreground")}>
                  Step 1: Project Need
                </span>
                <span className={cn(step === 2 ? "text-accent" : "text-muted-foreground")}>
                  Step 2: Brand & Budget
                </span>
              </div>
              <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  initial={{ width: "50%" }}
                  animate={{ width: step === 1 ? "50%" : "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                /* STEP 1 FORM */
                <motion.form
                  key="step-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleNextStep}
                  className="space-y-5"
                >
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-1">
                      Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-secondary border border-border",
                        "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm",
                        "transition-all duration-300 placeholder:text-muted-foreground/50"
                      )}
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-1">
                      Email <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-secondary border border-border",
                        "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm",
                        "transition-all duration-300 placeholder:text-muted-foreground/50"
                      )}
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* What do you need help with? */}
                  <div className="space-y-2">
                    <label htmlFor="helpNeeded" className="text-sm font-medium text-foreground flex items-center gap-1">
                      What do you need help with? <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="helpNeeded"
                        name="helpNeeded"
                        value={formData.helpNeeded}
                        onChange={handleInputChange}
                        required
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-secondary border border-border appearance-none text-sm",
                          "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent cursor-pointer",
                          "transition-all duration-300",
                          !formData.helpNeeded && "text-muted-foreground/60"
                        )}
                      >
                        <option value="" disabled>
                          Select an option...
                        </option>
                        {helpOptions.map((opt) => (
                          <option key={opt} value={opt} className="text-foreground bg-card">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Step 1 Error Message */}
                  {formState === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs text-center flex items-center justify-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  {/* Next Button */}
                  <motion.button
                    type="submit"
                    className="w-full btn-accent justify-center mt-4"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span>Continue to Step 2</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.button>
                </motion.form>
              ) : (
                /* STEP 2 FORM */
                <motion.form
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Company / Brand Name */}
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-foreground flex items-center gap-1">
                      Company / Brand Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-secondary border border-border",
                        "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm",
                        "transition-all duration-300 placeholder:text-muted-foreground/50"
                      )}
                      placeholder="e.g. Acme Studio or your brand name"
                    />
                  </div>

                  {/* Website / Social Link */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="website" className="text-sm font-medium text-foreground flex items-center gap-1">
                        Website / Social Link <span className="text-accent">*</span>
                      </label>
                    </div>
                    <p className="text-xs text-accent font-medium">
                      So I can take a quick look before we talk
                    </p>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      required
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-secondary border border-border mt-1",
                        "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm",
                        "transition-all duration-300 placeholder:text-muted-foreground/50"
                      )}
                      placeholder="https://... or @username"
                    />
                  </div>

                  {/* Monthly content volume */}
                  <div className="space-y-2">
                    <label htmlFor="monthlyVolume" className="text-sm font-medium text-foreground flex items-center gap-1">
                      Monthly content volume <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="monthlyVolume"
                        name="monthlyVolume"
                        value={formData.monthlyVolume}
                        onChange={handleInputChange}
                        required
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-secondary border border-border appearance-none text-sm",
                          "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent cursor-pointer",
                          "transition-all duration-300",
                          !formData.monthlyVolume && "text-muted-foreground/60"
                        )}
                      >
                        <option value="" disabled>
                          Select estimated volume...
                        </option>
                        {volumeOptions.map((opt) => (
                          <option key={opt} value={opt} className="text-foreground bg-card">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Budget range */}
                  <div className="space-y-2">
                    <label htmlFor="budgetRange" className="text-sm font-medium text-foreground flex items-center gap-1">
                      Budget range <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="budgetRange"
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleInputChange}
                        required
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-secondary border border-border appearance-none text-sm",
                          "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent cursor-pointer",
                          "transition-all duration-300",
                          !formData.budgetRange && "text-muted-foreground/60"
                        )}
                      >
                        <option value="" disabled>
                          Select budget range...
                        </option>
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt} className="text-foreground bg-card">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Buttons: Back & Submit */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-3 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-foreground text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <motion.button
                      type="submit"
                      disabled={formState === "loading"}
                      className={cn(
                        "flex-1 btn-accent justify-center text-sm py-3",
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
                  </div>

                  {/* Feedback Messages */}
                  {formState === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 text-sm text-center font-medium"
                    >
                      Thank you! Your project details have been sent successfully. I will get back to you within 24 hours.
                    </motion.div>
                  )}
                  {formState === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm text-center flex items-center justify-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
