import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Crown, Youtube, Music, Heart, Mail, Disc, Share2, Palette, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, TEAM_MEMBERS, TALENTS, YOUTUBE_VIDEOS, FANART_ITEMS } from "../data";
import { ShuffleHero } from "@/components/ui/shuffle-grid";
import { Carousel, TestimonialCard } from "@/components/ui/retro-testimonial";
import { AnimatedGroup } from "@/components/ui/animated-group";
import AboutUsSection from "@/components/ui/about-us-section";
import { Dock, DockIcon } from "@/components/ui/dock";
import TeamShowcase from "@/components/ui/team-showcase";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { Users } from "lucide-react";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
                window.history.replaceState(null, "", window.location.pathname);
            }, 800);
        }
    }
};

// Navbar Component
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        handleNavClick(e, href);
        setIsOpen(false);
    };

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
            scrolled ? "bg-white/80 backdrop-blur-md border-b border-accent-purple/20 py-2" : "bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link
                    to="/"
                    onClick={(e: any) => onNavClick(e, "#home")}
                    className="flex items-center gap-2 group"
                >
                    <Crown className="w-8 h-8 text-deep-purple group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-sans font-bold text-deep-purple tracking-widest uppercase">ARCSLA</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => onNavClick(e, link.href)}
                            className="text-sm font-medium text-foreground/80 hover:text-deep-purple transition-colors uppercase tracking-widest"
                        >
                            {link.name}
                        </a>
                    ))}
                    <Link
                        to="/gallery"
                        onClick={() => window.scrollTo(0, 0)}
                        className="text-sm font-medium text-foreground/80 hover:text-deep-purple transition-colors uppercase tracking-widest flex items-center gap-2"
                    >
                        <Palette className="w-4 h-4" /> Gallery
                    </Link>
                    <a
                        href="#join"
                        onClick={(e) => onNavClick(e, "#join")}
                        className="bg-accent-yellow text-deep-purple px-6 py-2 rounded-full font-bold hover:bg-black hover:text-white transition-all active:scale-95 shadow-[0_4px_10px_rgba(253,224,71,0.3)]"
                    >
                        JOIN KINGDOM
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-deep-purple" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-accent-purple/20 flex flex-col p-6 gap-4 md:hidden"
                    >
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-lg font-sans text-foreground/80 hover:text-deep-purple uppercase"
                                onClick={(e) => onNavClick(e, link.href)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <Link
                            to="/gallery"
                            className="text-lg font-sans text-foreground/80 hover:text-deep-purple uppercase flex items-center gap-2"
                            onClick={() => {
                                setIsOpen(false);
                                window.scrollTo(0, 0);
                            }}
                        >
                            <Palette className="w-5 h-5" /> Gallery
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

// Section Header
const SectionHeader = ({ title, subtitle, icon: Icon }: { title: string, subtitle?: string, icon?: any }) => (
    <div className="text-center mb-16 px-4">
        {Icon && <Icon className="w-12 h-12 text-accent-purple mx-auto mb-4 animate-bounce" />}
        <h2 className="text-4xl md:text-5xl font-sans font-black mb-4 uppercase tracking-tighter text-deep-purple">{title}</h2>
        {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto text-lg italic">{subtitle}</p>}
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent-yellow to-transparent mx-auto mt-6" />
    </div>
);

export default function Home() {
    const donateRef = useRef<HTMLElement>(null);
    const { scrollYProgress: donateScroll } = useScroll({
        target: donateRef,
        offset: ["start end", "end start"]
    });
    const donateY = useTransform(donateScroll, [0, 1], ["-20%", "20%"]);
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-accent-yellow selection:text-deep-purple">
            {/* Background Layers */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(216,180,254,0.1)_0%,transparent_70%)]" />
                <div className="stars-background absolute inset-0 opacity-20" />
                <div className="dots-pattern absolute inset-0 opacity-[0.08]" />

                {/* Shooting Stars Layers */}
                <ShootingStars
                    starColor="#fde047"
                    trailColor="#6b21a8"
                    minSpeed={20}
                    maxSpeed={40}
                    minDelay={400}
                    maxDelay={1200}
                />
                <ShootingStars
                    starColor="#d8b4fe"
                    trailColor="#6b21a8"
                    minSpeed={15}
                    maxSpeed={30}
                    minDelay={800}
                    maxDelay={2000}
                />
                <ShootingStars
                    starColor="#ffffff"
                    trailColor="#d8b4fe"
                    minSpeed={25}
                    maxSpeed={45}
                    minDelay={600}
                    maxDelay={1500}
                />
            </div>

            <style>{`
    .stars - background {
    background - image:
    radial - gradient(1px 1px at 20px 30px, #fde047, rgba(0, 0, 0, 0)),
        radial - gradient(1px 1px at 40px 70px, #ffffff, rgba(0, 0, 0, 0)),
        radial - gradient(1px 1px at 50px 160px, #d8b4fe, rgba(0, 0, 0, 0)),
        radial - gradient(1px 1px at 90px 40px, #ffffff, rgba(0, 0, 0, 0)),
        radial - gradient(1px 1px at 130px 80px, #fde047, rgba(0, 0, 0, 0)),
        radial - gradient(1px 1px at 160px 120px, #d8b4fe, rgba(0, 0, 0, 0));
    background - repeat: repeat;
    background - size: 250px 250px;
    animation: twinkle 8s ease -in -out infinite;
}

        .dots - pattern {
    background - image: radial - gradient(#6b21a8 1px, transparent 1px);
    background - size: 32px 32px;
}

@keyframes twinkle {
    0 %, 100 % { opacity: 0.15; transform: scale(1); }
    50 % { opacity: 0.4; transform: scale(1.05); }
}
`}</style>

            <Navbar />

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center pt-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,180,254,0.15)_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <ShuffleHero />
            </section>

            {/* Music Features Section */}
            <section id="music-features" className="py-24 bg-pastel-yellow/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent-purple/5 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-yellow/5 blur-[100px] rounded-full" />
                <SectionHeader
                    title="Symphony of the Sovereigns"
                    subtitle="Explore the latest sonic frequencies and harmonies forged in our royal chambers."
                    icon={Music}
                />
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="rounded-[2.5rem] overflow-hidden border-4 border-white shadow-[0_30px_60px_rgba(107,33,168,0.15)] bg-white/50 backdrop-blur-sm">
                        <iframe
                            src="https://open.spotify.com/embed/artist/6u6rXOuuPWYmdd3h3VzqPj?utm_source=generator&theme=0"
                            width="100%"
                            height="380"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            title="Spotify Artist Embed"
                            className="grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                </div>
            </section>

            {/* Talent Showcase Section */}
            <section id="talent" className="py-24 bg-white relative overflow-hidden">
                <SectionHeader
                    title="Our Radiant Talent"
                    subtitle="Behold the elite knights and visionaries who sharpen the edge of our digital empire."
                    icon={Users}
                />
                <div className="container mx-auto px-6">
                    <TeamShowcase members={TALENTS} />
                </div>
            </section>

            {/* Services Section */}
            <AboutUsSection />

            {/* Team Section (Our Noble Council) */}
            <section id="team" className="py-24 bg-pastel-yellow/10 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <SectionHeader
                        title="Our Noble Council"
                        subtitle="Meet the knights and visionaries who sharpen the edge of our digital empire."
                        icon={Crown}
                    />
                    <div className="container mx-auto">
                        <Carousel
                            items={TEAM_MEMBERS.map((member, index) => (
                                <TestimonialCard
                                    key={member.id}
                                    testimonial={member}
                                    index={index}
                                />
                            ))}
                        />
                    </div>
                </div>
            </section>

            {/* Fanart Snapshot Section (Archives of the Kingdom) */}
            <section id="fanart-snapshot" className="py-24 bg-pastel-purple/10 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <SectionHeader
                        title="Archives of the Kingdom"
                        subtitle="A glimpse into the legendary chronicles and fanart forged by our loyal subjects."
                        icon={Palette}
                    />
                    <div className="container mx-auto">
                        {/* Show top 4 items as a snapshot */}
                        <InteractiveBentoGallery
                            mediaItems={FANART_ITEMS.slice(0, 4).map((item) => ({
                                ...item,
                                span: ''
                            }))}
                            title=""
                            description=""
                        />
                        <div className="text-center mt-12">
                            <Link
                                to="/gallery"
                                onClick={() => window.scrollTo(0, 0)}
                                className="px-10 py-4 bg-deep-purple text-white font-black uppercase tracking-widest rounded-full hover:bg-accent-yellow hover:text-deep-purple transition-all shadow-xl active:scale-95 inline-flex items-center gap-2"
                            >
                                Explore Full Gallery <Share2 className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 relative">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2 relative">
                        <div className="absolute -inset-4 border-2 border-accent-yellow/20 rounded-2xl -z-10 animate-pulse" />
                        <img
                            src="/assets/images/retouch_2025110222543049.jpg"
                            alt="Castle Throne"
                            className="rounded-2xl shadow-2xl border border-accent-yellow/10"
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-5xl font-sans font-black text-deep-purple uppercase leading-tight">Origins of the <br />Digital Fortress</h2>
                        <p className="text-xl text-muted-foreground italic leading-relaxed">
                            In an era of fleeting trends and hollow echoes, ARCSLA was forged from the fires of passion and the steel of innovation. We are not merely a company; we are a kingdom dedicated to the pursuit of digital mastery.
                        </p>
                        <p className="text-muted-foreground">
                            Our quest began with the vision of uniting creators under a single banner of excellence. From the majestic heights of YouTube production to the deep symphonies of musical distribution, we build legacies that endure through the ages.
                        </p>
                    </div>
                </div>
            </section>

            {/* YouTube Section */}
            <section id="youtube" className="py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-pastel-purple/50 blur-[100px] rounded-full" />
                <SectionHeader
                    title="The Royal Theatre"
                    subtitle="Behold our latest visual chronicles delivered to all subjects of the kingdom."
                    icon={Youtube}
                />
                <div className="container mx-auto px-6">
                    <AnimatedGroup preset="slide" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {YOUTUBE_VIDEOS.map((id) => (
                            <div key={id} className="aspect-video rounded-xl overflow-hidden border border-accent-purple/10 shadow-lg group hover:border-accent-purple/30 transition-all">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${id}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div >
                        ))}
                    </AnimatedGroup >
                </div >
            </section >

            {/* Donation Section with Parallax Background */}
            <section
                id="join"
                className="py-32 relative overflow-hidden flex items-center justify-center min-h-[70vh] group/parallax"
            >
                {/* Parallax Background Container */}
                <motion.div
                    style={{
                        y: useTransform(
                            useScroll({
                                target: useRef(null),
                                offset: ["start end", "end start"]
                            }).scrollYProgress,
                            [0, 1],
                            ["-15%", "15%"]
                        )
                    }}
                    className="absolute inset-0 z-0 scale-110"
                >
                    {/* Dark Royal Overlays for Text Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-purple/60 via-deep-purple/20 to-deep-purple/80 z-10" />
                    <div className="absolute inset-0 bg-black/30 z-10" />
                    <img
                        src="/assets/background/Majikan-Day_BG.jpg"
                        alt="Majikan Day Royal Archives"
                        className="w-full h-full object-cover grayscale-[0.2] group-hover/parallax:grayscale-0 transition-all duration-1000"
                    />
                </motion.div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto p-8 md:p-14 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] text-center"
                    >
                        <div className="w-24 h-24 bg-accent-yellow rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(253,224,71,0.4)] border-4 border-white/30">
                            <Heart className="w-12 h-12 text-deep-purple fill-deep-purple" />
                        </div>

                        <h2 className="text-4xl md:text-6xl font-sans font-black text-white uppercase mb-6 tracking-tighter leading-none">
                            Fortify the <br /> <span className="text-accent-yellow">Kingdom</span>
                        </h2>

                        <p className="text-white/90 text-xl font-medium leading-relaxed mb-10 italic">
                            "Every contribution strengthens our walls and sharpens our blades for the next creative conquest in the digital realm."
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://discord.gg/DwuHCf7b"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-12 py-5 bg-accent-yellow text-deep-purple font-black uppercase tracking-widest rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.3)] active:scale-95 flex items-center justify-center gap-3 group/btn"
                            >
                                Enter the Council <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            < footer className="bg-white py-12 border-t border-accent-purple/10" >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center">
                        {/* Circular Logo Container */}
                        <div className="mb-8 rounded-full bg-accent-yellow/10 p-8 shadow-[0_0_30px_rgba(253,224,71,0.2)] border-2 border-accent-yellow/30 animate-pulse-slow">
                            <Crown className="w-10 h-10 text-deep-purple" />
                        </div>

                        {/* Centered Navigation */}
                        <nav className="mb-8 flex flex-wrap justify-center gap-x-8 gap-y-4">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-deep-purple font-black uppercase tracking-[0.2em] text-xs hover:text-accent-purple transition-all hover:scale-105"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Link
                                to="/gallery"
                                onClick={() => window.scrollTo(0, 0)}
                                className="text-deep-purple font-black uppercase tracking-[0.2em] text-xs hover:text-accent-purple transition-all hover:scale-105"
                            >
                                Gallery
                            </Link>
                        </nav>

                        {/* Circular Social Icons */}
                        <div className="mb-8 flex space-x-4">
                            <a
                                href="#"
                                className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-accent-purple/10 text-deep-purple hover:bg-accent-yellow hover:border-accent-yellow hover:scale-110 transition-all shadow-sm"
                            >
                                <Youtube className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-accent-purple/10 text-deep-purple hover:bg-accent-yellow hover:border-accent-yellow hover:scale-110 transition-all shadow-sm"
                            >
                                <Disc className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-accent-purple/10 text-deep-purple hover:bg-accent-yellow hover:border-accent-yellow hover:scale-110 transition-all shadow-sm"
                            >
                                <Share2 className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-accent-purple/10 text-deep-purple hover:bg-accent-yellow hover:border-accent-yellow hover:scale-110 transition-all shadow-sm"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>

                        {/* Copyright */}
                        <div className="text-center pt-8 border-t border-accent-purple/5 w-full">
                            <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
                                © {new Date().getFullYear()} ARCSLA. All rights reserved by the Crown.
                            </p>
                            <p className="mt-2 text-[10px] italic text-accent-purple/40">"In Digital Sovereignty We Trust"</p>
                        </div>
                    </div>
                </div>
            </footer >

            {/* Fixed Dock at Bottom Right */}
            < div className="fixed bottom-6 right-6 z-[100] hidden md:block" >
                <Dock direction="bottom" className="bg-white/80 border-accent-purple/20 shadow-2xl">
                    <DockIcon className="bg-accent-yellow/20 hover:bg-accent-yellow transition-colors group">
                        <a href="#" className="flex items-center justify-center w-full h-full">
                            <Youtube className="w-6 h-6 text-deep-purple group-hover:scale-110 transition-transform" />
                        </a>
                    </DockIcon>
                    <DockIcon className="bg-accent-purple/10 hover:bg-accent-purple hover:text-white transition-colors group">
                        <a href="#" className="flex items-center justify-center w-full h-full">
                            <Disc className="w-6 h-6 text-deep-purple group-hover:text-white group-hover:scale-110 transition-transform" />
                        </a>
                    </DockIcon>
                    <DockIcon className="bg-accent-purple/10 hover:bg-accent-purple hover:text-white transition-colors group">
                        <a href="#" className="flex items-center justify-center w-full h-full">
                            <Share2 className="w-6 h-6 text-deep-purple group-hover:text-white group-hover:scale-110 transition-transform" />
                        </a>
                    </DockIcon>
                    <DockIcon className="bg-accent-yellow/20 hover:bg-black hover:text-white transition-colors group">
                        <a href="#" className="flex items-center justify-center w-full h-full">
                            <Mail className="w-6 h-6 text-deep-purple group-hover:text-white group-hover:scale-110 transition-transform" />
                        </a>
                    </DockIcon>
                </Dock>
            </div >
        </div >
    );
}
