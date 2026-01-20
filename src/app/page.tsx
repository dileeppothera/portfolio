"use client";

import { CustomCursor } from "@/components/CustomCursor";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Loader } from "@/components/Loader";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Fragments } from "@/components/Fragments";
import { Contact } from "@/components/Contact";
import { portfolioData } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen selection:bg-white selection:text-black">
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      <CustomCursor />
      <ParticlesBackground />

      {/* Cinematic Background Image */}
      <div className="fixed inset-0 -z-30 h-screen w-full overflow-hidden">
        <Image
          src="/background.png"
          alt="Cinematic Background"
          fill
          className="object-cover opacity-30 blur-[2px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]" />
      </div>

      {/* Horizontal Nav - Minimal */}
      <nav className="fixed top-0 right-0 z-50 p-12 hidden md:block">
        <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-muted">
          <a href="#projects" className="hover:text-white transition-colors">Works</a>
          <a href="#about" className="hover:text-white transition-colors">Profile</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      <Hero />

      {/* Profile / About Section */}
      <section id="about" className="relative w-full py-32 px-6 md:px-24">
        <div className="absolute left-6 top-32 hidden md:block">
          <span className="vertical-text text-[10px] uppercase tracking-[0.5em] text-muted font-bold">
            Profile
          </span>
        </div>
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="mb-12 text-xs uppercase tracking-[0.3em] text-muted font-bold">About</h2>
            <p className="text-3xl md:text-5xl font-serif leading-tight text-white mb-16">
              {portfolioData.summary}
            </p>

            <div className="grid md:grid-cols-2 gap-16 pt-16 border-t border-white/10">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-muted mb-6">Education</h3>
                <div className="space-y-8">
                  {portfolioData.education.map((edu) => (
                    <div key={edu.degree}>
                      <h4 className="text-lg font-serif font-bold text-white">{edu.degree}</h4>
                      <p className="text-sm text-muted">{edu.school} — {edu.period}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-muted mb-6">Languages</h3>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {portfolioData.languages.map((lang) => (
                    <div key={lang.name}>
                      <p className="text-sm font-bold text-white uppercase tracking-tighter">{lang.name}</p>
                      <p className="text-[10px] text-muted uppercase tracking-widest">{lang.level}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Projects />
      <Fragments />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
