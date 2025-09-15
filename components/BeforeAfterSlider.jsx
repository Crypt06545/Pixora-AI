"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  // Real before/after images
  const beforeImage =
    "https://ik.imagekit.io/sjbr5usgh/pixora-uploads/Roadster_Hero_W0sp0doWK.webp";
  const afterImage =
    "https://ik.imagekit.io/sjbr5usgh/pixora-uploads/Roadster_Hero_W0sp0doWK.webp?tr=e-changebg-prompt-Change%20scene%20to%20snowy%20alpine%20road%2C%20cold%20blue%20tones%2C%20clean%20snowbanks%3B%20keep%20car%20untouched";

  useEffect(() => {
    // Animate the wrapper on mount
    if (wrapperRef.current) {
      gsap.fromTo(
        wrapperRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }

    // Animate the slider handle on mount
    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.5 }
      );
    }
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-lg mx-auto">
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-glass border border-card-border glow-subtle cursor-ew-resize select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Before Image */}
        <div className="absolute inset-0">
          <img
            src={beforeImage}
            alt="Before - Original car on road"
            className="w-full h-full object-cover select-none"
          />
        </div>

        {/* After Image */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={afterImage}
            alt="After - Car with snowy alpine background"
            className="w-full h-full object-cover select-none"
          />
        </div>

        {/* Slider Handle */}
        <div
          ref={sliderRef}
          className="absolute top-0 bottom-0 w-1 bg-gradient-primary cursor-ew-resize group"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-primary rounded-full shadow-glow-primary group-hover:scale-110 transition-transform flex items-center justify-center">
            <div className="w-6 h-6 bg-background rounded-full flex items-center justify-center">
              <div className="w-1 h-4 bg-gradient-primary rounded-full" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 text-xs font-medium text-muted-foreground">
          AFTER
        </div>
        <div className="absolute bottom-4 right-4 text-xs font-medium text-primary">
          BEFORE
        </div>
      </div>

      <p className="text-center mt-4 text-sm text-muted-foreground">
        Drag the slider to see the magic ✨
      </p>
    </div>
  );
};

export default BeforeAfterSlider;
