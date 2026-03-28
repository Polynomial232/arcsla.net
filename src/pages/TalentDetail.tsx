import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Crown,
  Instagram,
  Twitter,
  Linkedin,
  Palette,
  Award,
  Shield,
  Sparkles,
  Youtube,
  Heart,
} from "lucide-react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { supabase, getStorageUrl, preloadImage } from "@/utils/supabase";
import SEO from "@/components/SEO";

export default function TalentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTalent() {
      try {
        const { data, error } = await supabase
          .from("talents")
          .select("*, talents_images(*)")
          .eq("id", id)
          .order("order_index", { foreignTable: "talents_images", ascending: true })
          .single();

        if (data && !error) {
          const mappedData = {
            ...data,
            image: getStorageUrl("talents", data.image),
            portfolio: (data.talents_images || []).map((img: any) =>
              getStorageUrl("talents", img.url),
            ),
          };

          // Preload main image before showing component
          await preloadImage(mappedData.image);

          setMember(mappedData);

          // Preload portfolio in background
          mappedData.portfolio.forEach((url: string) => preloadImage(url));
        }
      } catch (err) {
        console.error("Error fetching talent:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTalent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-deep-purple">
        <Crown className="w-16 h-16 animate-bounce text-accent-purple" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-deep-purple">
        <div className="text-center">
          <Crown className="w-16 h-16 mx-auto mb-6 text-accent-purple animate-pulse" />
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">
            Talent Lost in the Realm
          </h1>
          <p className="text-muted-foreground mb-8">
            This nobility could not be found in our records.
          </p>
          <Link
            to="/"
            className="px-8 py-3 bg-accent-yellow text-deep-purple font-bold rounded-full hover:bg-black hover:text-white transition-all"
          >
            Return to Gates
          </Link>
        </div>
      </div>
    );
  }

  const portfolio = member.portfolio || [];
  const specialties = member.specialties || [];
  const social = member.social || {};

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent-yellow selection:text-deep-purple relative overflow-x-hidden">
      <SEO
        title={`${member.name} — Sovereign Talent`}
        description={
          member.bio ||
          `Profil resmi ${member.name} dari Arcsla Kingdom. Temukan karya, portofolio, dan perjalanan kreator digital ini.`
        }
        image={member.image}
        url={`https://arcsla.net/talents/${id}`}
        type="profile"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: member.name,
          description: member.bio || `Sovereign Talent dari Arcsla Kingdom.`,
          image: member.image,
          url: `https://arcsla.net/talents/${id}`,
          jobTitle: member.role || "Kreator Digital",
          worksFor: {
            "@type": "Organization",
            name: "PT Arcsla Cakrawala Indonesia",
            url: "https://arcsla.net",
          },
        }}
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

      {/* Header / Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-accent-purple/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Crown className="w-8 h-8 text-deep-purple group-hover:scale-110 transition-transform" />
            <span className="text-xl font-sans font-bold text-deep-purple tracking-widest uppercase">
              ARCSLA
            </span>
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-deep-purple font-black uppercase tracking-widest text-sm hover:translate-x-[-4px] transition-transform cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Kingdom
          </button>
        </div>
      </header>

      <main className="pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left: Profile Side */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-32"
              >
                <div className="relative group">
                  <div className="absolute -inset-4 border-2 border-accent-yellow/20 rounded-3xl -z-10 animate-pulse" />
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden border-4 border-white shadow-2xl relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/60 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Floating ID badge */}
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-accent-purple/10 flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-accent-purple uppercase tracking-widest leading-none mb-1">
                        Status
                      </p>
                      <p className="text-sm font-black text-deep-purple uppercase tracking-tighter leading-none italic">
                        {member.role}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-accent-yellow rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-deep-purple" />
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-wrap gap-4">
                  {social.linkedin && (
                    <a
                      href={social.linkedin}
                      className="w-12 h-12 rounded-full bg-white border border-accent-purple/10 flex items-center justify-center text-deep-purple hover:bg-accent-purple hover:text-white transition-all shadow-md"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {social.twitter && (
                    <a
                      href={social.twitter}
                      className="w-12 h-12 rounded-full bg-white border border-accent-purple/10 flex items-center justify-center text-deep-purple hover:bg-accent-purple hover:text-white transition-all shadow-md"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {social.instagram && (
                    <a
                      href={social.instagram}
                      className="w-12 h-12 rounded-full bg-white border border-accent-purple/10 flex items-center justify-center text-deep-purple hover:bg-accent-purple hover:text-white transition-all shadow-md"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {social.youtube && (
                    <a
                      href={social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white border border-accent-purple/10 flex items-center justify-center text-deep-purple hover:bg-accent-purple hover:text-white transition-all shadow-md"
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                  )}
                  {social.sociabuzz && (
                    <a
                      href={social.sociabuzz}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white border border-accent-purple/10 flex items-center justify-center text-deep-purple hover:bg-accent-purple hover:text-white transition-all shadow-md"
                    >
                      <Heart className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right: Content Side */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-8 md:mb-10 text-center lg:text-left">
                  <span className="text-accent-purple font-black text-xs md:text-sm uppercase tracking-[0.3em] flex items-center justify-center lg:justify-start gap-2 mb-4">
                    <Sparkles className="w-4 h-4" /> Radiant Talent
                  </span>
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-sans font-black text-deep-purple uppercase tracking-tighter leading-[1.1] md:leading-[0.9] mb-4">
                    {member.name}
                  </h1>
                  <p className="text-lg md:text-2xl font-black text-accent-purple/80 uppercase tracking-widest italic">
                    {member.role}
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="prose prose-lg prose-purple max-w-none">
                    <div
                      className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-accent-yellow pl-6 space-y-4"
                      dangerouslySetInnerHTML={{ __html: member.full_bio }}
                    />
                  </div>

                  {/* Specialties */}
                  <div>
                    <h3 className="text-xs font-black text-deep-purple uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      <Award className="w-4 h-4 text-accent-purple" /> Noble Specialties
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {specialties.map((spec: string, i: number) => (
                        <span
                          key={i}
                          className="px-5 py-2 bg-white border border-accent-purple/10 rounded-full text-xs font-bold text-deep-purple uppercase tracking-widest shadow-sm"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Full Width Portfolio Section */}
          {portfolio.length > 0 && (
            <div className="mt-6 pt-16 border-t border-accent-purple/10">
              <h3 className="text-xs font-black text-deep-purple uppercase tracking-[0.2em] mb-12 flex items-center justify-center gap-2">
                <Palette className="w-5 h-5 text-accent-purple" /> Visual Legacy
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {portfolio.map((img: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 4) * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="rounded-3xl overflow-hidden shadow-xl aspect-square border-2 border-white bg-white/40 backdrop-blur-sm relative group"
                  >
                    <img
                      src={img}
                      alt={`Portfolio ${i}`}
                      className="w-full h-full object-contain p-3 md:p-4 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
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
