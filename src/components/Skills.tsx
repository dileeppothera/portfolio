"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export function Skills() {
    return (
        <section id="skills" className="relative w-full py-32 px-6 md:px-24">
            {/* Vertical Label */}
            <div className="absolute left-6 top-32 hidden md:block">
                <span className="vertical-text text-[10px] uppercase tracking-[0.5em] text-muted font-bold">
                    Technical Stack
                </span>
            </div>

            <div className="mx-auto max-w-6xl">
                <h2 className="mb-16 text-xs uppercase tracking-[0.3em] text-muted font-bold">Expertise</h2>

                <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(portfolioData.skills).map(([category, items], idx) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <h3 className="mb-6 text-sm uppercase tracking-[0.2em] font-bold border-l-2 border-white pl-4">
                                {category.replace(/([A-Z])/g, " $1")}
                            </h3>
                            <div className="flex flex-wrap gap-x-6 gap-y-3">
                                {items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-sm text-muted hover:text-white transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
