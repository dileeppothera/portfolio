"use client";

import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                isScrolled ? "glass border-b py-3" : "bg-transparent"
            )}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <div className="text-xl font-bold tracking-tighter">
                    DP<span className="text-primary">.</span>
                </div>

                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href={portfolioData.contact.resumeUrl}
                        className="rounded-full bg-slate-800 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-slate-700"
                    >
                        Resume
                    </a>
                </div>
            </div>
        </nav>
    );
}
