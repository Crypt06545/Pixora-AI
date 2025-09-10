"use client";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Sparkles } from "lucide-react";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { useStoreUser } from "@/hooks/use-store-user";
import { BarLoader } from "react-spinners";
const Navbar = () => {
  const path = usePathname();
  const { isLoading } = useStoreUser();
  if (path.includes("/editor")) {
    return null;
  }
  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 text-nowrap">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-8 py-3 flex items-center justify-between gap-8">
        {/* logo  */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="relative">
            <Sparkles
              fill="transparent"
              className="h-8 w-8 text-primary animate-glow-pulse"
            />
            <div className="absolute inset-0 h-8 w-8 text-secondary animate-glow-pulse opacity-50" />
          </div>
          <span className="text-2xl font-bold bg-gradient-primary !bg-clip-text text-transparent">
            PictoAI
          </span>
        </div>
        {path === "/" && (
          <div className="hidden md:flex space-x-6">
            <Link
              href="#features"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
            >
              Contact
            </Link>
          </div>
        )}

        <div className="flex items-center gap-3 ml-10 md:ml-20">
          <Authenticated>
            <Link href="/dashboard">
              <Button variant="glass" className="hidden sm:flex">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:flex">Dashboard</span>
              </Button>
            </Link>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-lg border border-white/20",
                  userButtonPopoverCard:
                    "shadow-xl backdrop-blur-md bg-slate-900/90 border border-white/20",
                  userPreviewMainIdentifier: "font-semibold text-white",
                },
              }}
              afterSignOutUrl="/"
            />
          </Authenticated>

          <Unauthenticated>
            <SignInButton>
              <Button variant="hero" className="hidden font-semibold sm:flex">
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton>
              <Button variant="primary" className={'font-semibold'}>Get Started</Button>
            </SignUpButton>
          </Unauthenticated>
        </div>

        {isLoading && (
          <div className="fixed bottom-0 left-0 w-full z-40 flex justify-center">
            <BarLoader width={"95%"} color="#06b6d4" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
