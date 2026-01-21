"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Mail, Github, Linkedin, FileText, Instagram } from "lucide-react";
import { DashSnake } from "./DashSnake";

// Custom Medium icon since Lucide doesn't have one
const MediumIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
);
export function Contact() {
    return (
        <footer id="contact" className="relative w-full pt-32 pb-12 px-6 md:px-24">
            {/* Vertical Label */}
            <div className="absolute right-6 top-32 hidden md:block">
                <span className="vertical-text text-[10px] uppercase tracking-[0.5em] text-muted font-bold">
                    Connect
                </span>
            </div>

            <div className="mx-auto max-w-6xl text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="mb-12 text-huge font-serif font-bold text-white">Hello.</h2>

                    <div className="mb-24 flex flex-col items-center gap-4">
                        <a
                            href={`mailto:${portfolioData.contact.email}`}
                            className="group text-2xl md:text-5xl font-serif hover:italic transition-all"
                        >
                            {portfolioData.contact.email}
                        </a>
                        <div className="h-px w-24 bg-white/20 group-hover:w-full transition-all duration-700" />
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-6 gap-6 max-w-3xl mx-auto border-t border-white/10 pt-12">
                        {[
                            { label: "LinkedIn", href: portfolioData.contact.linkedin, icon: Linkedin },
                            { label: "GitHub", href: portfolioData.contact.github, icon: Github },
                            { label: "Medium", href: portfolioData.contact.medium, icon: MediumIcon },
                            { label: "Instagram", href: portfolioData.contact.instagram, icon: Instagram },
                            { label: "Resume", href: portfolioData.contact.resumeUrl, icon: FileText },
                            { label: "Email", href: `mailto:${portfolioData.contact.email}`, icon: Mail },
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-widest text-muted hover:text-white transition-colors"
                            >
                                <link.icon className="h-4 w-4 mb-2" />
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 gap-4">
                        <p className="text-[10px] uppercase tracking-widest text-muted/50">
                            © {new Date().getFullYear()} {portfolioData.name} — Based in {portfolioData.contact.location}
                        </p>
                        <DashSnake />
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
