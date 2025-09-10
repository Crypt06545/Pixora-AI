"use client";
import { Check, Crown, Star, Zap } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from "@clerk/nextjs";
import { useIntersectionObserver } from "@/hooks/use-landing-hooks";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

// PricingCard Component
const PricingCard = ({
  id,
  name,
  price,
  features,
  featured = false,
  planId,
  cta,
  icon: Icon,
}) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [isHovered, setIsHovered] = useState(false);
  const { isSignedIn, has } = useAuth();
  const router = useRouter();

  const isCurrentPlan = planId ? has?.({ plan: planId }) : false;

  return (
    <div
      ref={ref}
      className={`plan-card relative backdrop-blur-lg border rounded-3xl p-8 transition-all duration-700 cursor-pointer ${
        featured
          ? "bg-gradient-to-b from-blue-500/20 to-purple-600/20 border-blue-400/50 scale-105"
          : "bg-white/5 border-white/10"
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${
        isHovered ? "transform scale-105 z-10" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-gradient-to-br from-blue-500 to-purple-600">
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Plan Name */}
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>

        {/* Price */}
        <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
          {price}
          {price !== "$0" && <span className="text-lg text-gray-400">/month</span>}
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center text-gray-300">
              <Check className="w-5 h-5 text-green-400 mr-3" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 ${
            name === "Pro"
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-white/20 hover:bg-white/30 text-white"
          }`}
          onClick={async () => {
            if (!isSignedIn) {
              router.push("/sign-in"); // Redirect if not signed in
              return;
            }

            if (!planId || isCurrentPlan) return;

            try {
              if (window.Clerk && window.Clerk.__internal_openCheckout) {
                await window.Clerk.__internal_openCheckout({
                  planId,
                  planPeriod: "month",
                  subscriberType: "user",
                });
              }
            } catch (err) {
              console.error("Checkout error:", err);
            }
          }}
          disabled={isCurrentPlan || !planId}
        >
          {isCurrentPlan ? "Current Plan" : cta}
        </Button>
      </div>
    </div>
  );
};

// Plans Array
const plans = [
  {
    id: "free_user",
    name: "Free",
    price: "$0",
    features: [
      "3 projects maximum",
      "20 exports per month",
      "Basic crop & resize",
      "Color adjustments",
      "Text Tool",
    ],
    cta: "Get Started Free",
    popular: false,
    icon: Star,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    features: [
      "Unlimited projects",
      "Unlimited exports",
      "All Editing Tools",
      "AI Background Remover",
      "AI Image Extender",
      "AI Retouch, Upscaler and more",
    ],
    cta: "Upgrade to Pro",
    popular: true,
    featured: true,
    planId: "cplan_32Urn3P7Sn6lOEIvbTFjIbAEsvJ",
    icon: Crown,
  },
];

// Pricing Section
const Pricing = () => {
  const containerRef = useRef(null);

  // Scroll Animations
  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".plan-card");
    if (cards) {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
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
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-glass rounded-full px-6 py-3 mb-6 glass border border-card-border">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-medium">Simple Pricing</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Choose Your </span>
            <span className="bg-gradient-primary !bg-clip-text text-transparent">
              Magic Plan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <PricingCard key={i} {...plan} />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            All plans include access to our core AI features. Upgrade anytime for more power.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
