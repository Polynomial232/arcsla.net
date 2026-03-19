"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ===== Types and Interfaces =====
export interface iTestimonial {
    id?: string;
    username?: string;
    name: string;
    designation: string;
    description: string;
    profileImage: string;
}

interface iCarouselProps {
    items: React.ReactElement<{
        testimonial: iTestimonial;
        index: number;
    }>[];
}

// ===== Components =====
const Carousel = ({ items }: iCarouselProps) => {
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    // Doubled items are enough for a standard seamless loop if we reset correctly
    const totalItems = [...items, ...items, ...items];
    const [itemWidth, setItemWidth] = useState(0);

    const x = useMotionValue(0);

    // Calculate width precisely
    useEffect(() => {
        const updateWidth = () => {
            if (innerRef.current) {
                const totalWidth = innerRef.current.scrollWidth;
                const singleSetWidth = totalWidth / 3;
                setItemWidth(singleSetWidth);
                if (x.get() === 0) {
                    x.set(-singleSetWidth);
                }
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [items, x]);

    const handleNext = () => {
        let currentX = x.get();
        let nextX = currentX - 400;

        // Loop boundary check
        if (nextX <= -(itemWidth * 2)) {
            nextX += itemWidth;
        }
        x.set(nextX);
    };

    const handlePrev = () => {
        let currentX = x.get();
        let nextX = currentX + 400;

        // Loop boundary check
        if (nextX >= 0) {
            nextX -= itemWidth;
        }
        x.set(nextX);
    };

    // Relative Drag Logic (Fixes snapping back during infinite drag)
    const handleDrag = (_: any, info: { delta: { x: number } }) => {
        let currentX = x.get();
        let nextX = currentX + info.delta.x;

        if (nextX <= -(itemWidth * 2)) {
            nextX += itemWidth;
        } else if (nextX >= 0) {
            nextX -= itemWidth;
        }

        x.set(nextX);
    };

    // Continuous Loop Autoscroll
    useEffect(() => {
        if (isPaused || itemWidth === 0) return;

        const animationFrame = () => {
            if (isPaused) return;
            const currentX = x.get();
            // Speed of autoscroll
            let nextX = currentX - 1.25;

            // Seamless Loop Logic
            if (nextX <= -(itemWidth * 2)) {
                nextX += itemWidth;
            } else if (nextX >= 0) {
                nextX -= itemWidth;
            }

            x.set(nextX);
            requestRef.current = requestAnimationFrame(animationFrame);
        };

        const requestRef = { current: requestAnimationFrame(animationFrame) };
        return () => cancelAnimationFrame(requestRef.current);
    }, [isPaused, itemWidth, x]);

    return (
        <div className="relative w-full mt-10 overflow-hidden group/carousel" ref={containerRef}>
            <motion.div
                ref={innerRef}
                drag="x"
                dragMomentum={false} // Momentum interferes with relative updates
                onDragStart={() => setIsPaused(true)}
                onDrag={handleDrag}
                onDragEnd={() => setIsPaused(false)}
                style={{ x, width: "max-content" }}
                className="flex flex-row gap-8 py-8 cursor-grab active:cursor-grabbing select-none"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {totalItems.map((item, index) => (
                    <div
                        key={`card-${index}`}
                        className="flex-none rounded-[2.5rem] pointer-events-none"
                    >
                        {item}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const TestimonialCard = ({
    testimonial,
    index,
    backgroundImage = "https://i.imgur.com/1Z3MVNG.jpeg",
}: {
    testimonial: iTestimonial;
    index: number;
    backgroundImage?: string;
}) => {
    return (
        <div
            className={cn(
                "rounded-[2.5rem] bg-white h-[500px] md:h-[550px] w-80 md:w-96 overflow-hidden flex flex-col items-center justify-center relative z-10 shadow-xl border border-accent-purple/5 transition-all",
                index % 2 === 0 ? "rotate-1" : "-rotate-1"
            )}
        >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img
                    className="w-full h-full object-cover"
                    src={testimonial.profileImage}
                    alt="Background layer"
                    draggable={false}
                />
            </div>

            <ProfileImage src={testimonial.profileImage} alt={testimonial.name} />

            <div className="px-8 mt-8 space-y-4">
                <p className="text-foreground/80 text-xl font-medium text-center line-clamp-4 lowercase italic leading-relaxed">
                    "{testimonial.description}"
                </p>
                <div className="space-y-1">
                    <p className="text-deep-purple text-2xl font-black text-center capitalize">
                        {testimonial.name}
                    </p>
                    {testimonial.username && testimonial.id && (
                        <a
                            href={`https://discord.com/users/${testimonial.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-purple/60 text-sm font-bold text-center block hover:text-deep-purple transition-colors mb-1 relative z-50 pointer-events-auto"
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            @{testimonial.username}
                        </a>
                    )}
                    <p className="text-accent-purple text-sm font-bold text-center uppercase tracking-widest underline underline-offset-4 decoration-accent-yellow">
                        {testimonial.designation}
                    </p>
                </div>
            </div>
        </div>
    );
};
const ProfileImage = ({ src, alt, className }: { src: string; alt?: string; className?: string }) => {
    const [isLoading, setLoading] = useState(true);

    return (
        <div className={cn(
            "w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-4 border-white shadow-2xl saturate-[0.8] sepia-[0.1] relative",
            className
        )}>
            <img
                className={cn(
                    "transition duration-500 absolute inset-0 w-full h-full object-cover",
                    isLoading ? "blur-sm" : "blur-0",
                )}
                onLoad={() => setLoading(false)}
                src={src}
                draggable={false}
                loading="lazy"
                alt={alt || "Profile image"}
            />
        </div>
    );
};

// Export the components
export { Carousel, TestimonialCard, ProfileImage };
