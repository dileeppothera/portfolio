"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Loader() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
        >
            <div className="relative overflow-hidden text-center">
                <motion.h1
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-5xl font-bold tracking-tighter text-white md:text-7xl"
                >
                    DILEEP P.
                </motion.h1>
            </div>

            <div className="mt-8 h-px w-64 overflow-hidden bg-white/10">
                <motion.div
                    className="h-full bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                />
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 font-mono text-[10px] uppercase tracking-[0.5em] text-muted"
            >
                Loading Experience {Math.round(progress)}%
            </motion.p>
        </motion.div>
    );
}
