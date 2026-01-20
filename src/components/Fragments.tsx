"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Terminal, Paintbrush, Globe, Layers, Apple } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

// --- Illustrator Canvas Component ---
const IllustratorCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Handle resize
        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
                ctx.strokeStyle = '#ff2b56';
                ctx.lineWidth = 3;
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDrawing(true);
        setHasDrawn(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const ctx = canvasRef.current?.getContext('2d');
        ctx?.beginPath(); // reset path
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;

        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setHasDrawn(false);
        }
    };

    return (
        <div className="relative w-full h-full min-h-[200px] bg-black/40 border border-white/5 rounded-xl overflow-hidden cursor-crosshair group">
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="absolute inset-0 z-10"
            />

            {!hasDrawn && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-white/20 z-0">
                    <Paintbrush size={32} className="mb-2" />
                    <p className="text-xs font-bold uppercase tracking-widest">Draw something...</p>
                </div>
            )}

            {hasDrawn && (
                <button
                    onClick={clearCanvas}
                    className="absolute bottom-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white/60"
                >
                    <RotateCcw size={16} />
                </button>
            )}

            <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <p className="text-[10px] uppercase tracking-widest text-muted font-bold">Illustrator</p>
            </div>
        </div>
    );
};

// --- Terminal Animation Component ---
const TerminalCard = () => {
    const [text, setText] = useState("");
    const commands = [
        "> flutter create portfolio",
        "Creating project...",
        "> dart pub add utils_x",
        "Resolving dependencies...",
        "> flutter run --release",
        "Building bundle...",
        "App running on 10+ devices!"
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let currentText = "";
        let charIndex = 0;
        const interval = setInterval(() => {
            if (charIndex < commands[index].length) {
                currentText += commands[index][charIndex];
                setText(currentText);
                charIndex++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    if (index < commands.length - 1) {
                        setIndex(index + 1);
                        setText("");
                    } else {
                        // Loop back after some delay
                        setTimeout(() => {
                            setIndex(0);
                            setText("");
                        }, 3000);
                    }
                }, 1000);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [index]);

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e]/80 border border-white/5 rounded-xl overflow-hidden font-mono text-[11px]">
            <div className="flex gap-1.5 p-3 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex-1 p-4 text-[#d4d4d4] space-y-1">
                {commands.slice(0, index).map((cmd, i) => (
                    <div key={i} className={cmd.startsWith('>') ? "text-[#569cd6]" : "text-[#4ec9b0]"}>
                        {cmd}
                    </div>
                ))}
                <div className={commands[index].startsWith('>') ? "text-[#569cd6]" : "text-[#4ec9b0]"}>
                    {text}<span className="animate-pulse">_</span>
                </div>
            </div>
        </div>
    );
};

// --- Music Player Component ---
const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [duration, setDuration] = useState('--:--');
    const [isLoaded, setIsLoaded] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Reliable royalty-free lofi track
    const audioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

    const formatTime = (time: number) => {
        if (isNaN(time)) return '00:00';
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(formatTime(audioRef.current.duration));
            setIsLoaded(true);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const total = audioRef.current.duration;
            if (total > 0) {
                setProgress((current / total) * 100);
                setCurrentTime(formatTime(current));
            }
        }
    };

    const togglePlay = async () => {
        if (!audioRef.current) return;

        try {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                await audioRef.current.play();
                setIsPlaying(true);
            }
        } catch (err) {
            console.log('Audio playback failed:', err);
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current || !isLoaded) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newProgress = (clickX / rect.width) * 100;
        audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
    };

    return (
        <div className="relative h-full bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/5 rounded-xl p-6 flex flex-col justify-between overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#ff2b56]/10 blur-[60px] rounded-full group-hover:bg-[#ff2b56]/20 transition-all duration-700" />

            {/* Hidden audio element */}
            <audio
                ref={audioRef}
                src={audioSrc}
                preload="metadata"
                loop
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            />

            <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-bold mb-4">Listening Now</p>
                <h4 className="text-xl font-serif text-white font-bold mb-1">Flutter Lofi</h4>
                <p className="text-xs text-muted">Chill coding vibes</p>
            </div>

            <div className="space-y-4">
                <div
                    className="h-1 w-full bg-white/5 rounded-full overflow-hidden cursor-pointer"
                    onClick={handleProgressClick}
                >
                    <motion.div
                        className="h-full bg-[#ff2b56]"
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-[9px] text-muted font-mono">{currentTime}</span>
                    <button
                        onClick={togglePlay}
                        disabled={!isLoaded}
                        className={`w-10 h-10 flex items-center justify-center bg-white text-black rounded-full transition-transform ${isLoaded ? 'hover:scale-105' : 'opacity-50'}`}
                    >
                        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                    </button>
                    <span className="text-[9px] text-muted font-mono">{duration}</span>
                </div>
            </div>
        </div>
    );
};

// --- Stats Card Component ---
const StatsCard = ({ icon: Icon, title, value, detail, color }: any) => (
    <div className="h-full border border-white/5 bg-black/20 rounded-xl p-6 flex flex-col justify-between group">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${color || 'white'}/5 text-${color || 'white'}`}>
            <Icon size={20} />
        </div>
        <div>
            <h3 className="text-3xl font-serif font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{value}</h3>
            <p className="text-[10px] uppercase tracking-widest text-muted font-bold mb-2">{title}</p>
            <p className="text-[11px] text-white/40 leading-relaxed font-light">{detail}</p>
        </div>
    </div>
);

export const Fragments = () => {
    return (
        <section id="fragments" className="py-20 px-6 md:px-24 bg-[#0a0a0a]">
            <div className="mx-auto max-w-6xl">
                <header className="mb-16">
                    <h2 className="text-xs uppercase tracking-[0.4em] text-muted font-bold mb-4">Fragments of Me</h2>
                    <p className="text-4xl md:text-5xl font-serif text-white leading-tight max-w-2xl">
                        Beyond the code, <span className="text-white/40">a collection of curated experiences.</span>
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[650px]">
                    {/* Main Drawing Card */}
                    <div className="md:col-span-2 md:row-span-2">
                        <IllustratorCanvas />
                    </div>

                    {/* Terminal Animation */}
                    <div className="md:col-span-1 md:row-span-1">
                        <TerminalCard />
                    </div>

                    {/* Music Player */}
                    <div className="md:col-span-1 md:row-span-1">
                        <MusicPlayer />
                    </div>

                    {/* Stats: Countries */}
                    <div className="md:col-span-1 md:row-span-1">
                        <StatsCard
                            icon={Globe}
                            title="International"
                            value="80+"
                            detail="Countries reached with production-ready Flutter apps."
                            color="blue-400"
                        />
                    </div>

                    {/* Stats: Downloads */}
                    <div className="md:col-span-1 md:row-span-1">
                        <StatsCard
                            icon={Apple}
                            title="Shipped"
                            value="50K+"
                            detail="Total downloads across Play Store and App Store platforms."
                            color="pink-500"
                        />
                    </div>

                    {/* Stack Summary */}
                    <div className="md:col-span-2 md:row-span-1 border border-white/5 bg-gradient-to-tr from-black to-[#111] rounded-xl p-8 flex items-center justify-between group overflow-hidden relative">
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-all duration-1000" />

                        <div className="relative z-10 max-w-[260px]">
                            <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4">Process</p>
                            <h4 className="text-2xl font-serif text-white font-bold leading-tight">
                                Thinker. Designer. <span className="text-white/30">Builder.</span>
                            </h4>
                        </div>

                        <div className="relative z-10 flex gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-12 h-12 border border-white/10 rounded-full bg-white/5 flex items-center justify-center transition-all hover:scale-110 hover:border-white/30">
                                    <Layers size={18} className="text-white/60" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
