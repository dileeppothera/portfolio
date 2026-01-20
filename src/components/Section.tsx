"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
    id?: string;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
    alternate?: boolean;
}

export function Section({ id, title, subtitle, children, className, alternate }: SectionProps) {
    return (
        <section
            id={id}
            className={cn(
                "py-24 px-6 md:px-12",
                alternate ? "bg-slate-900/40" : "bg-transparent",
                className
            )}
        >
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                        {title}<span className="text-primary">.</span>
                    </h2>
                    {subtitle && (
                        <p className="max-w-2xl text-lg text-slate-400">
                            {subtitle}
                        </p>
                    )}
                </motion.div>

                {children}
            </div>
        </section>
    );
}
