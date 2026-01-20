"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export function Projects() {
    return (
        <section id="projects" className="relative w-full py-32 px-6 md:px-24">
            {/* Vertical Label */}
            <div className="absolute left-6 top-32 hidden md:block">
                <span className="vertical-text text-[10px] uppercase tracking-[0.5em] text-muted font-bold">
                    Works & Contributions
                </span>
            </div>

            <div className="mx-auto max-w-6xl">
                <h2 className="mb-16 text-xs uppercase tracking-[0.3em] text-muted font-bold">Featured Projects</h2>

                <div className="border-t border-white/10">
                    {portfolioData.projects.map((project, idx) => (
                        <motion.a
                            key={project.name}
                            href={project.links[0]?.url}
                            target="_blank"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-4 -mx-4"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                                <span className="text-xs font-mono text-muted">0{idx + 1}</span>
                                <div>
                                    <h3 className="text-3xl md:text-5xl font-serif font-bold group-hover:italic transition-all duration-500">
                                        {project.name}
                                    </h3>
                                    <p className="mt-2 text-xs uppercase tracking-widest text-muted">{project.domain}</p>
                                </div>
                            </div>

                            <div className="mt-6 md:mt-0 flex items-center justify-between md:justify-end gap-12">
                                <p className="max-w-xs text-sm text-muted line-clamp-2 text-left md:text-right">{project.description}</p>
                                <div className="h-10 w-10 flex items-center justify-center rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
                                    <ArrowUpRight className="h-5 w-5" />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Open Source in similar style */}
                <h2 className="mt-32 mb-16 text-xs uppercase tracking-[0.3em] text-muted font-bold">Open Source</h2>
                <div className="border-t border-white/10">
                    {portfolioData.openSource.map((pkg, idx) => (
                        <motion.a
                            key={pkg.name}
                            href={pkg.url}
                            target="_blank"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-4 -mx-4"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                                <span className="text-xs font-mono text-muted">LIB</span>
                                <div>
                                    <h3 className="text-3xl md:text-5xl font-serif font-bold group-hover:italic transition-all">
                                        {pkg.name}
                                    </h3>
                                    <span className="mt-2 inline-block text-[10px] uppercase font-bold text-primary px-2 py-0.5 border border-primary/30 rounded">
                                        {pkg.downloads} Downloads
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 md:mt-0 flex items-center gap-12">
                                <p className="max-w-xs text-sm text-muted">{pkg.description}</p>
                                <ArrowUpRight className="h-5 w-5 text-muted group-hover:text-white" />
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
