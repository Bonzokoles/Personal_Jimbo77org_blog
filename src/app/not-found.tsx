'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Construction, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background via-background to-background/95 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 text-center px-4 max-w-2xl mx-auto"
            >
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="mb-8 flex justify-center"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                        <div className="relative bg-primary/10 p-6 rounded-2xl border border-primary/20">
                            <Construction className="w-16 h-16 text-primary" />
                        </div>
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl md:text-8xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary"
                >
                    W Budowie
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl text-muted-foreground mb-8"
                >
                    Ta strona jest właśnie tworzona
                </motion.p>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-base text-muted-foreground/80 mb-12 max-w-md mx-auto"
                >
                    Pracujemy nad czymś niesamowitym. Wróć wkrótce, aby zobaczyć nową zawartość.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link href="/">
                        <button className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center gap-2 hover:bg-primary/90 transition-all duration-300 hover:scale-105">
                            <Home className="w-5 h-5" />
                            Strona Główna
                            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                        </button>
                    </Link>

                    <Link href="/blog">
                        <button className="px-8 py-4 bg-background border border-primary/20 text-foreground rounded-xl font-semibold flex items-center gap-2 hover:bg-primary/5 transition-all duration-300 hover:scale-105">
                            <ArrowLeft className="w-5 h-5" />
                            Zobacz Blog
                        </button>
                    </Link>
                </motion.div>

                {/* Animated Dots */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-12 flex gap-2 justify-center"
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.3, 1, 0.3]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                            className="w-2 h-2 rounded-full bg-primary"
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}
