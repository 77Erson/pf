"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="section" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="section-heading mt-4">
            What Clients <span className="text-accent">Say</span>
          </h2>
        </motion.div>

        {/* Featured Testimonial - Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative bg-card rounded-3xl border border-border p-8 md:p-12">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 text-accent/20">
              <Quote className="w-12 h-12" />
            </div>

            {/* Content */}
            <div className="relative text-center">
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto"
              >
                &ldquo;{testimonials[activeIndex].content}&rdquo;
              </motion.p>

              <motion.div
                key={`author-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {/* Avatar placeholder */}
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <span className="font-display text-xl font-bold text-accent">
                    {testimonials[activeIndex].name.charAt(0)}
                  </span>
                </div>
                <p className="font-display font-semibold text-lg">
                  {testimonials[activeIndex].name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[activeIndex].role} at{" "}
                  {testimonials[activeIndex].company}
                </p>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      activeIndex === index
                        ? "w-6 bg-accent"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mini Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-4 mt-12"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className={cn(
                "p-6 rounded-2xl bg-secondary/50 border border-border/50 cursor-pointer",
                "hover:border-accent/30 transition-all duration-300",
                activeIndex === index && "border-accent/50 bg-accent/5"
              )}
              onClick={() => setActiveIndex(index)}
            >
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
