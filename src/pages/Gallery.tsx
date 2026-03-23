import { Link } from "react-router-dom";
import { Crown, ArrowLeft, Palette } from "lucide-react";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { useSupabaseData } from "@/hooks/useSupabaseData";

import { useEffect } from "react";

export default function Gallery() {
    const { gallery, loading, galleryLoading, hasMoreGallery, fetchMoreGallery } = useSupabaseData();
    const items = gallery;

    // Infinite scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
                fetchMoreGallery();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [fetchMoreGallery]);

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-accent-yellow selection:text-deep-purple">
            {/* Background Layers */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(216,180,254,0.1)_0%,transparent_70%)]" />
                <div className="stars-background absolute inset-0 opacity-20" />
                <div className="dots-pattern absolute inset-0 opacity-[0.08]" />

                <ShootingStars
                    starColor="#fde047"
                    trailColor="#6b21a8"
                    minSpeed={20}
                    maxSpeed={40}
                    minDelay={400}
                    maxDelay={1200}
                />
            </div>

            <style>{`
        .stars-background {
          background-image: 
            radial-gradient(1px 1px at 20px 30px, #fde047, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 50px 160px, #d8b4fe, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 90px 40px, #ffffff, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 250px 250px;
          animation: twinkle 8s ease-in-out infinite;
        }

        .dots-pattern {
          background-image: radial-gradient(#6b21a8 1px, transparent 1px);
          background-size: 32px 32px;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
      `}</style>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-accent-purple/20 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <Crown className="w-8 h-8 text-deep-purple group-hover:scale-110 transition-transform" />
                        <span className="text-xl font-sans font-bold text-deep-purple tracking-widest uppercase">ARCSLA</span>
                    </Link>
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-deep-purple font-black uppercase tracking-widest text-sm hover:translate-x-[-4px] transition-transform"
                    >
                        <ArrowLeft className="w-5 h-5" /> Back to Kingdom
                    </Link>
                </div>
            </header>

            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 bg-accent-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Palette className="w-10 h-10 text-deep-purple" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-sans font-black text-deep-purple uppercase tracking-tighter mb-4">Archives of <br />the Kingdom</h1>
                        <p className="text-xl text-muted-foreground italic max-w-2xl mx-auto leading-relaxed">
                            Every stroke of the brush and every frame captured is a tribute to our sovereign creativity. Explore the full collection of legendary fanart.
                        </p>
                    </div>

                    {loading ? (
                        <div className="h-[60vh] flex items-center justify-center">
                            <Crown className="w-12 h-12 text-accent-purple animate-bounce" />
                        </div>
                    ) : (
                        <>
                            <InteractiveBentoGallery
                                mediaItems={items}
                                title="Sovereign Collection"
                                description="Drag and explore our curated collection of shots"
                            />

                            {/* Load more indicator */}
                            <div className="mt-12 text-center h-20 flex items-center justify-center">
                                {galleryLoading && (
                                    <div className="flex flex-col items-center gap-2">
                                        <Crown className="w-8 h-8 text-accent-purple animate-bounce" />
                                        <p className="text-xs font-black uppercase tracking-widest text-accent-purple/60">Summoning more treasures...</p>
                                    </div>
                                )}
                                {!hasMoreGallery && items.length > 0 && (
                                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground italic">You have beholden all our royal archives.</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </main>

            <footer className="bg-white py-12 border-t border-accent-purple/10 text-center">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
                    © {new Date().getFullYear()} ARCSLA. All rights reserved by the Crown.
                </p>
            </footer>
        </div>
    );
}
