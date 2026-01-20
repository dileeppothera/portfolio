"use client";

import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost";
    as?: any;
    href?: string;
    target?: string;
}

export function Button({
    className,
    variant = "primary",
    as: Component = "button",
    ...props
}: ButtonProps) {
    const variants = {
        primary: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20",
        outline: "border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-200",
        ghost: "bg-transparent hover:bg-slate-800/50 text-slate-300",
    };

    return (
        <Component
            className={cn(
                "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98]",
                variants[variant],
                className
            )}
            {...props}
        />
    );
}
