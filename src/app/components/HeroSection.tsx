"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
        >
            {/* Background gradient orbs */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" style={{ animationDelay: "1.5s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/5 rounded-full blur-[150px] pointer-events-none" />

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan/30 rounded-full animate-float pointer-events-none"
                    style={{
                        left: `${15 + i * 15}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        animationDelay: `${i * 0.8}s`,
                        animationDuration: `${5 + i}s`,
                    }}
                />
            ))}

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="badge bg-cyan/10 text-cyan border border-cyan/20">
                        <span className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
                        Case Study — March 2026
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight tracking-tight"
                >
                    <span className="text-foreground">Edge-Case Routing Failures</span>
                    <br />
                    <span className="gradient-text">in Intent-Based Support AI</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-muted max-w-4xl mx-auto leading-relaxed"
                >
                    A technical teardown of an{" "}
                    <span className="text-warning font-medium">infinite context loop</span> and{" "}
                    <span className="text-success font-medium">intent bypass</span> in a
                    production food delivery support chatbot.
                </motion.p>

                {/* Key stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
                >
                    {[
                        { label: "Bot Tiers Traversed", value: "3", color: "text-cyan" },
                        { label: "Context Drops", value: "4", color: "text-danger" },
                        { label: "Agents Assigned", value: "3", color: "text-warning" },
                        { label: "Resolution", value: "None", color: "text-purple" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className={`text-3xl sm:text-4xl font-bold ${stat.color}`}>
                                {stat.value}
                            </div>
                            <div className="text-sm text-muted mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-muted tracking-widest uppercase">
                        Scroll to explore
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-5 h-8 rounded-full border-2 border-muted/30 flex items-start justify-center pt-1.5"
                    >
                        <div className="w-1 h-1.5 bg-muted rounded-full" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
