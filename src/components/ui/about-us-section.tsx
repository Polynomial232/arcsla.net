"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
    Youtube,
    Music,
    Sword,
    Shield,
    Award,
    Users,
    Calendar,
    Zap,
    TrendingUp,
    ArrowRight,
    Disc,
    Code,
    Sparkles
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

export default function AboutUsSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
    const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 })

    // Parallax effect for decorative elements
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20])
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    }

    const services = [
        {
            icon: <Youtube className="w-6 h-6" />,
            title: "YouTube Scaling",
            description:
                "Mastering algorithms to catapult your channel into the royal ranks of digital influence.",
            position: "left",
        },
        {
            icon: <Music className="w-6 h-6" />,
            title: "Music Distro",
            description:
                "Spreading your compositions across all global realms, ensuring your voice echoes through the halls.",
            position: "left",
        },
        {
            icon: <Code className="w-6 h-6" />,
            title: "Web Platforms",
            description:
                "Building unshakeable digital fortresses tailored to your sovereign brand identity.",
            position: "left",
        },
        {
            icon: <Disc className="w-6 h-6" />,
            title: "Music Production",
            description:
                "Crafting professional soundscapes that define the auditory signature of your empire.",
            position: "right",
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Brand Protection",
            description:
                "Guarding your domain and digital assets with the vigilance of the elite knights.",
            position: "right",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Growth Strategy",
            description:
                "Meticulous combat plans for market conquest, focusing on retention and expansion.",
            position: "right",
        },
    ]

    const stats = [
        { icon: <Award className="w-6 h-6" />, value: 250, label: "Campaigns Won", suffix: "+" },
        { icon: <Users className="w-6 h-6" />, value: 50, label: "Sovereign Clients", suffix: "M+" },
        { icon: <Calendar className="w-6 h-6" />, value: 10, label: "Years Reigned", suffix: "" },
        { icon: <TrendingUp className="w-6 h-6" />, value: 99, label: "Loyalty Rate", suffix: "%" },
    ]

    return (
        <section
            id="services"
            ref={sectionRef}
            className="w-full py-24 px-4 bg-pastel-yellow/30 text-deep-purple overflow-hidden relative"
        >
            {/* Decorative background elements from example */}
            <motion.div
                className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent-yellow/10 blur-3xl pointer-events-none"
                style={{ y: y1, rotate: rotate1 }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent-purple/10 blur-3xl pointer-events-none"
                style={{ y: y2, rotate: rotate2 }}
            />

            <motion.div
                className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-accent-yellow/30"
                animate={{
                    y: [0, -15, 0],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-accent-purple/30"
                animate={{
                    y: [0, 20, 0],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            <motion.div
                className="container mx-auto max-w-6xl relative z-10"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
                    <motion.span
                        className="text-accent-purple font-black mb-2 flex items-center gap-2 tracking-[0.2em] text-xs"
                    >
                        <Sword className="w-4 h-4" />
                        DOMINATE THE DIGITAL REALM
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-center uppercase tracking-tighter">Digital Sovereignty</h2>
                    <motion.div
                        className="w-24 h-1 bg-accent-yellow rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 96 } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                </motion.div>

                <motion.p className="text-center max-w-2xl mx-auto mb-16 text-deep-purple/70 text-lg md:text-xl italic font-medium leading-relaxed" variants={itemVariants}>
                    "We build unshakeable digital fortresses and interactive kingdoms tailored to your sovereign brand identity."
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-center">
                    {/* Left Column */}
                    <div className="space-y-16">
                        {services
                            .filter((service) => service.position === "left")
                            .map((service, index) => (
                                <ServiceItem
                                    key={`left-${index}`}
                                    icon={service.icon}
                                    title={service.title}
                                    description={service.description}
                                    variants={itemVariants as any}
                                    delay={index * 0.2}
                                    direction="left"
                                />
                            ))}
                    </div>

                    {/* Center Image - Order First on Mobile, None on MD */}
                    <div className="flex justify-center items-center order-first md:order-none mb-12 md:mb-0">
                        <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
                            <motion.div
                                className="rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(107,33,168,0.2)] border-4 border-white aspect-[4/5] relative group"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                            >
                                <img
                                    src="https://i.imgur.com/1Z3MVNG.jpeg"
                                    alt="ARCSLA Fortress"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/60 via-transparent to-transparent" />
                                <motion.div
                                    className="absolute inset-0 flex items-end justify-center p-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.8, delay: 0.9 }}
                                >
                                    <motion.button
                                        className="bg-white text-deep-purple px-6 py-3 rounded-full flex items-center gap-2 text-sm font-black uppercase tracking-widest shadow-xl"
                                        whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff" }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        View Archives <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </motion.div>
                            </motion.div>

                            {/* Inner border flourish from example */}
                            <motion.div
                                className="absolute inset-0 border-4 border-accent-purple/30 rounded-2xl -m-3 z-[-1]"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            ></motion.div>

                            {/* Floating accent elements from example */}
                            <motion.div
                                className="absolute -top-4 -right-8 w-16 h-16 rounded-full bg-accent-yellow/20 blur-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 1, delay: 0.9 }}
                                style={{ y: y1 }}
                            ></motion.div>
                            <motion.div
                                className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full bg-accent-purple/20 blur-xl"
                                initial={{ opacity: 0, y: -20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                                transition={{ duration: 1, delay: 1.1 }}
                                style={{ y: y2 }}
                            ></motion.div>

                            {/* Additional decorative elements (rotating dots) */}
                            <motion.div
                                className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-yellow"
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                }}
                            ></motion.div>
                            <motion.div
                                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-purple"
                                animate={{
                                    y: [0, 10, 0],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                    delay: 0.5,
                                }}
                            ></motion.div>
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-16">
                        {services
                            .filter((service) => service.position === "right")
                            .map((service, index) => (
                                <ServiceItem
                                    key={`right-${index}`}
                                    icon={service.icon}
                                    title={service.title}
                                    description={service.description}
                                    variants={itemVariants as any}
                                    delay={index * 0.2}
                                    direction="right"
                                />
                            ))}
                    </div>
                </div>

                {/* Stats Section with example styling */}
                <motion.div
                    ref={statsRef}
                    className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    initial="hidden"
                    animate={isStatsInView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    {stats.map((stat, index) => (
                        <StatCounter
                            key={index}
                            icon={stat.icon}
                            value={stat.value}
                            label={stat.label}
                            suffix={stat.suffix}
                            delay={index * 0.1}
                        />
                    ))}
                </motion.div>

            </motion.div>
        </section>
    )
}

interface ServiceItemProps {
    icon: React.ReactNode
    title: string
    description: string
    variants: any
    delay: number
    direction: "left" | "right"
}

function ServiceItem({ icon, title, description, variants, delay, direction }: ServiceItemProps) {
    return (
        <motion.div
            className="flex flex-col group"
            variants={variants}
            transition={{ delay }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <motion.div
                className={cn(
                    "flex items-center gap-4 mb-4",
                    direction === "right" ? "md:flex-row-reverse md:text-right" : ""
                )}
                initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: delay + 0.2 }}
            >
                <motion.div
                    className="text-deep-purple bg-accent-yellow p-4 rounded-2xl transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:rotate-[10deg] shadow-lg relative"
                >
                    {icon}
                    <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-accent-purple opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                <h3 className="text-2xl font-black text-deep-purple uppercase tracking-tight group-hover:text-accent-purple transition-colors duration-300">
                    {title}
                </h3>
            </motion.div>
            <motion.p
                className={cn(
                    "text-base text-deep-purple/70 leading-relaxed font-medium pl-2",
                    direction === "right" ? "md:text-right pr-2" : ""
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: delay + 0.4 }}
            >
                {description}
            </motion.p>
            <motion.div
                className={cn(
                    "mt-3 flex items-center text-accent-purple text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    direction === "right" ? "md:justify-end" : ""
                )}
            >
                <span className="flex items-center gap-1">
                    Enlist Now <ArrowRight className="w-3 h-3" />
                </span>
            </motion.div>
        </motion.div>
    )
}

interface StatCounterProps {
    icon: React.ReactNode
    value: number
    label: string
    suffix: string
    delay: number
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
    const countRef = useRef(null)
    const isInView = useInView(countRef, { once: false })
    const [hasAnimated, setHasAnimated] = useState(false)

    const springValue = useSpring(0, {
        stiffness: 40,
        damping: 15,
    })

    useEffect(() => {
        if (isInView && !hasAnimated) {
            // @ts-ignore
            springValue.set(value)
            setHasAnimated(true)
        } else if (!isInView && hasAnimated) {
            // @ts-ignore
            springValue.set(0)
            setHasAnimated(false)
        }
    }, [isInView, value, springValue, hasAnimated])

    const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

    return (
        <motion.div
            className="bg-white/50 backdrop-blur-md p-8 rounded-3xl flex flex-col items-center text-center group hover:bg-white transition-all duration-300 border border-accent-purple/5 shadow-xl"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay },
                },
            } as any}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
        >
            <motion.div
                className="w-16 h-16 rounded-2xl bg-accent-purple/10 flex items-center justify-center mb-6 text-deep-purple group-hover:bg-accent-yellow group-hover:text-deep-purple transition-all duration-500 shadow-md"
                whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
            >
                {icon}
            </motion.div>
            <motion.div ref={countRef} className="text-4xl font-black text-deep-purple flex items-center tracking-tighter">
                <motion.span>{displayValue}</motion.span>
                <span>{suffix}</span>
            </motion.div>
            <p className="text-deep-purple/70 text-xs font-bold uppercase tracking-widest mt-2">{label}</p>
            <motion.div className="w-10 h-1 bg-accent-yellow mt-4 group-hover:w-20 transition-all duration-500 rounded-full" />
        </motion.div>
    )
}
