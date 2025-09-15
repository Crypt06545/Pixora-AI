"use client";
import { Crop, Expand, Scissors, Type, Zap } from "lucide-react";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Scissors,
    title: "AI Background Removal",
    description:
      "1-click clean photos with precision AI. Remove any background instantly and get professional results.",
    gradient: "from-primary to-primary-glow",
  },
  {
    icon: Expand,
    title: "AI Generative Fill",
    description:
      "Expand your canvas and auto-fill edges seamlessly. Create perfect aspect ratios effortlessly.",
    gradient: "from-secondary to-secondary-glow",
  },
  {
    icon: Zap,
    title: "AI Upscale & Enhance",
    description:
      "Boost resolution up to 4x while fixing details. Transform low-res into stunning high-quality images.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Crop,
    title: "Smart Crop & Face Focus",
    description:
      "Perfect thumbnails automatically. AI detects faces and important content for optimal cropping.",
    gradient: "from-secondary to-primary",
  },
  {
    icon: Type,
    title: "Watermark & Text Overlay",
    description:
      "Brand your content professionally. Add custom watermarks and text with perfect positioning.",
    gradient: "from-primary-glow to-secondary-glow",
  },
];

const Features = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".feature-card");
    if (cards) {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }
  }, []);

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Magical </span>
            <span className="bg-gradient-primary !bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your photos with cutting-edge AI technology. Each feature
            is designed to give you professional results in seconds, not hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {features.slice(0, 3).map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.slice(3).map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

function FeatureCard({ feature }) {
  const { icon: Icon, title, description, gradient } = feature;
  const cardRef = useRef(null);
  const borderRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || !borderRef.current) return;

    const hoverAnim = gsap.to(cardRef.current, {
      y: -5,
      scale: 1.02,
      duration: 0.3,
      paused: true,
      ease: "power1.out",
    });

    const borderAnim = gsap.to(borderRef.current, {
      borderColor: "rgba(99, 102, 241, 1)",
      boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
      duration: 0.3,
      paused: true,
      ease: "power1.out",
    });

    const enter = () => {
      hoverAnim.play();
      borderAnim.play();
    };
    const leave = () => {
      hoverAnim.reverse();
      borderAnim.reverse();
    };

    const cardEl = cardRef.current; // store ref in a variable
    cardEl.addEventListener("mouseenter", enter);
    cardEl.addEventListener("mouseleave", leave);

    return () => {
      if (cardEl) {
        cardEl.removeEventListener("mouseenter", enter);
        cardEl.removeEventListener("mouseleave", leave);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="feature-card h-full glass rounded-2xl p-8 border border-card-border shadow-glow-subtle relative overflow-hidden transition-all duration-300"
    >
      <div
        ref={borderRef}
        className="absolute inset-0 rounded-2xl border border-transparent pointer-events-none"
      />
      <div className="relative mb-6">
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} p-4`}
        >
          <Icon className="w-full h-full text-background" />
        </div>
        <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl transition-all duration-300" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
      <div className="mt-6 pt-6 border-t border-card-border">
        <div className="flex items-center space-x-2 text-sm text-primary">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="font-medium">Pixora AI Powered</span>
        </div>
      </div>
    </div>
  );
}


export default Features;
