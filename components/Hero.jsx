"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Sparkles, ArrowRight } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import gsap from "gsap";

const Hero = () => {
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Animate left side
    gsap.fromTo(
      leftContentRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    );

    // Animate right side (slider)
    gsap.fromTo(
      rightContentRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out", delay: 0.3 }
    );
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted opacity-50" />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "-1s" }}
      />

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 sm:mt-20 md:mt-0">
        {/* Left Content */}
        <div
          ref={leftContentRef}
          className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-glass rounded-full px-4 py-2 mb-4 glass border border-card-border">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold">Powered by AI Magic</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            PictoAI
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-md sm:max-w-lg lg:max-w-xl">
            Transform your photos with AI-powered editing tools. Remove
            backgrounds, enhance quality, and create stunning visuals in
            seconds. Drop a photo. We'll do the magic.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto justify-center lg:justify-start">
            <Button
              variant="hero"
              size="lg"
              onClick={() => scrollToSection("editor")}
              className="group text-white w-full sm:w-auto justify-center"
            >
              <Play className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              Try Free Now
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection("editor")}
              className="group w-full sm:w-auto justify-center"
            >
              Launch App
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-sm text-muted-foreground justify-center lg:justify-start">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Unlimited uploads on Pro
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              Unlimited edits
            </div>
          </div>
        </div>

        {/* Right Content - Before/After Slider */}
        <div
          ref={rightContentRef}
          className="flex justify-center lg:justify-end mt-10 lg:mt-0"
        >
          <BeforeAfterSlider />
        </div>
      </div>
    </section>
  );
};

export default Hero;
