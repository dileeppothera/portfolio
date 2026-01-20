"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export function Experience() {
    return (
        <section id="experience" className="relative w-full py-32 px-6 md:px-24 bg-white/[0.01]">
            {/* Vertical Label */}
            <div className="absolute right-6 top-32 hidden md:block">
                <span className="vertical-text text-[10px] uppercase tracking-[0.5em] text-muted font-bold">
                    Professional Journey
                </span>
            </div>

            <div className="mx-auto max-w-6xl">
                <h2 className="mb-16 text-xs uppercase tracking-[0.3em] text-muted font-bold">History</h2>

                <div className="space-y-24">
                    {portfolioData.experience.map((exp, idx) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="grid md:grid-cols-12 gap-8"
                        >
                            <div className="md:col-span-4">
                                <p className="text-xs font-mono text-muted mb-2">{exp.period}</p>
                                <h3 className="text-2xl font-serif font-bold">{exp.role}</h3>
                                <p className="text-sm uppercase tracking-widest text-primary mt-1">{exp.company}</p>
                            </div>
                            <div className="md:col-span-8">
                                <ul className="space-y-4">
                                    {exp.points.map((point, i) => (
                                        <li key={i} className="text-sm text-muted leading-relaxed flex gap-4">
                                            <span className="mt-2 h-px w-4 bg-muted/30 shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
