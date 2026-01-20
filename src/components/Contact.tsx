"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Mail, Github, Linkedin, FileText } from "lucide-react";
import { DashSnake } from "./DashSnake";

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

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto border-t border-white/10 pt-12">
                        {[
                            { label: "LinkedIn", href: portfolioData.contact.linkedin, icon: Linkedin },
                            { label: "GitHub", href: portfolioData.contact.github, icon: Github },
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
