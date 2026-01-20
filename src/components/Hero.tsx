"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export function Hero() {
    return (
        <section className="relative flex h-screen w-full flex-col items-center justify-center px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="z-10"
            >
                <p className="mb-4 text-sm font-medium tracking-[0.2em] text-muted uppercase">
                    {portfolioData.title}
                </p>
                <h1 className="text-huge font-serif font-bold text-white mb-8">
                    {portfolioData.name.split(" ")[0]}
                    <br />
                    {portfolioData.name.split(" ")[1]}
                </h1>
                <div className="flex flex-col items-center gap-6">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-px bg-white/30"
                    />
                    <p className="max-w-md text-sm leading-relaxed text-muted">
                        Based in {portfolioData.contact.location}.
                        Specialized in crafting premium mobile experiences.
                    </p>
                </div>
            </motion.div>

            {/* Decorative background number or text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none opacity-[0.02]">
                <span className="text-[40vw] font-serif font-bold leading-none">05</span>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-12 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-widest text-muted">Scroll</span>
                <div className="h-12 w-px bg-white/20" />
            </motion.div>
        </section>
    );
}
