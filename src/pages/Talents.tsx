import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Crown, Sparkles, ArrowRight, Palette } from "lucide-react";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import SEO from "@/components/SEO";
import { ShootingStars } from "@/components/ui/shooting-stars";

export default function Talents() {
  const { talents, loading } = useSupabaseData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-deep-purple">
        <Crown className="w-16 h-16 animate-bounce text-accent-purple" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent-yellow selection:text-deep-purple relative overflow-x-hidden">
      <SEO
        title="Royal Lineage — Our Sovereign Talents"
        description="Jelajahi garis keturunan Sovereign di Arcsla Kingdom. Daftar lengkap kreator digital, seniman, dan talent visioner yang membangun masa depan konten digital."
        url="https://arcsla.net/talents"
      />

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

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-accent-purple/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Crown className="w-8 h-8 text-deep-purple group-hover:scale-110 transition-transform" />
            <span className="text-xl font-sans font-bold text-deep-purple tracking-widest uppercase">
              ARCSLA
            </span>
          </Link>
          <div className="flex gap-6">
            <Link
              to="/gallery"
              className="text-sm font-black text-deep-purple uppercase tracking-widest hover:text-accent-purple transition-all flex items-center gap-2"
            >
              <Palette className="w-4 h-4" /> Gallery
            </Link>
            <Link
              to="/"
              className="text-sm font-black text-deep-purple uppercase tracking-widest hover:text-accent-purple transition-all"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24 relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent-purple font-black text-xs md:text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4" /> Sovereign Archives
          </span>
          <h1 className="text-5xl md:text-7xl font-sans font-black text-deep-purple uppercase tracking-tighter leading-none mb-6">
            Royal <span className="text-accent-yellow">Lineage</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg italic">
            Behold the regal monarchs and divine icons who reign over our digital empire. Each
            Sovereign brings a unique essence to the Kingdom.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent-yellow to-transparent mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {talents.map((talent, index) => (
            <motion.div
              key={talent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link to={`/talents/${talent.id}`} className="block">
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl bg-white/40 backdrop-blur-sm group-hover:shadow-[0_20px_40px_rgba(107,33,168,0.2)] transition-all">
                  <img
                    src={talent.image}
                    alt={talent.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/90 via-deep-purple/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Info Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <p className="text-[10px] font-black text-accent-yellow uppercase tracking-[0.3em] mb-1">
                      {talent.role}
                    </p>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
                      {talent.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Enter Chambers <ArrowRight className="w-3 h-3 text-accent-yellow" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="bg-white py-12 border-t border-accent-purple/10 text-center relative z-10">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} {import.meta.env.VITE_COMPANY_NAME || "ARCSLA"}. All rights
          reserved by the Crown.
        </p>
      </footer>
    </div>
  );
}
