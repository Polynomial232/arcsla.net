import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram, FaYoutube, FaHeart } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { TALENTS } from '../../data';

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    social?: {
        twitter?: string;
        linkedin?: string;
        instagram?: string;
        behance?: string;
        youtube?: string;
        sociabuzz?: string;
    };
}

interface TeamShowcaseProps {
    members?: TeamMember[];
}

export default function TeamShowcase({ members = TALENTS }: TeamShowcaseProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleMemberClick = (id: string) => {
        navigate(`/talent/${id}`);
    };

    const col1 = members.filter((_, i) => i % 3 === 0);
    const col2 = members.filter((_, i) => i % 3 === 1);
    const col3 = members.filter((_, i) => i % 3 === 2);

    return (
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10 lg:gap-14 select-none w-full max-w-5xl mx-auto py-8 px-4 md:px-6 font-sans">
            {/* ── Left: photo grid ── */}
            <div className="flex gap-2 md:gap-3 flex-shrink-0 overflow-x-auto pb-1 md:pb-0">
                {/* Column 1 */}
                <div className="flex flex-col gap-2 md:gap-3">
                    {col1.map((member) => (
                        <PhotoCard
                            key={member.id}
                            member={member}
                            className="w-[110px] h-[120px] sm:w-[130px] sm:h-[140px] md:w-[155px] md:h-[165px]"
                            hoveredId={hoveredId}
                            onHover={setHoveredId}
                            onClick={() => handleMemberClick(member.id)}
                        />
                    ))}
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-2 md:gap-3 mt-[48px] sm:mt-[56px] md:mt-[68px]">
                    {col2.map((member) => (
                        <PhotoCard
                            key={member.id}
                            member={member}
                            className="w-[122px] h-[132px] sm:w-[145px] sm:h-[155px] md:w-[172px] md:h-[182px]"
                            hoveredId={hoveredId}
                            onHover={setHoveredId}
                            onClick={() => handleMemberClick(member.id)}
                        />
                    ))}
                </div>

                {/* Column 3 */}
                <div className="flex flex-col gap-2 md:gap-3 mt-[22px] sm:mt-[26px] md:mt-[32px]">
                    {col3.map((member) => (
                        <PhotoCard
                            key={member.id}
                            member={member}
                            className="w-[115px] h-[125px] sm:w-[136px] sm:h-[146px] md:w-[162px] md:h-[172px]"
                            hoveredId={hoveredId}
                            onHover={setHoveredId}
                            onClick={() => handleMemberClick(member.id)}
                        />
                    ))}
                </div>
            </div>

            {/* ── Right: member name list*/}
            <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-4 md:gap-5 pt-0 md:pt-2 flex-1 w-full">
                {members.map((member) => (
                    <MemberRow
                        key={member.id}
                        member={member}
                        hoveredId={hoveredId}
                        onHover={setHoveredId}
                        onClick={() => handleMemberClick(member.id)}
                    />
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────
   Photo card 
───────────────────────────────────────── */

function PhotoCard({
    member,
    className,
    hoveredId,
    onHover,
    onClick,
}: {
    member: TeamMember;
    className: string;
    hoveredId: string | null;
    onHover: (id: string | null) => void;
    onClick?: () => void;
}) {
    const isActive = hoveredId === member.id;
    const isDimmed = hoveredId !== null && !isActive;

    return (
        <div
            className={cn(
                'overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-opacity duration-400',
                className,
                isDimmed ? 'opacity-60' : 'opacity-100',
            )}
            onMouseEnter={() => onHover(member.id)}
            onMouseLeave={() => onHover(null)}
            onClick={onClick}
        >
            <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-[filter] duration-500"
                style={{
                    filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.77)',
                }}
            />
        </div>
    );
}

/* ─────────────────────────────────────────
   Member name section
───────────────────────────────────────── */

function MemberRow({
    member,
    hoveredId,
    onHover,
    onClick,
}: {
    member: TeamMember;
    hoveredId: string | null;
    onHover: (id: string | null) => void;
    onClick?: () => void;
}) {
    const isActive = hoveredId === member.id;
    const isDimmed = hoveredId !== null && !isActive;
    // @ts-ignore
    const hasSocial = member.social?.twitter || member.social?.linkedin || member.social?.instagram || member.social?.behance || member.social?.youtube || member.social?.sociabuzz;

    return (
        <div
            className={cn(
                'cursor-pointer transition-opacity duration-300 border-l-4 pl-4',
                isActive ? 'border-accent-yellow' : 'border-transparent',
                isDimmed ? 'opacity-50' : 'opacity-100',
            )}
            onMouseEnter={() => onHover(member.id)}
            onMouseLeave={() => onHover(null)}
            onClick={onClick}
        >
            {/* Name + social*/}
            <div className="flex items-center gap-2.5">
                <span
                    className={cn(
                        'text-base md:text-[18px] font-black uppercase tracking-tighter leading-none transition-colors duration-300',
                        isActive ? 'text-accent-purple' : 'text-deep-purple',
                    )}
                >
                    {member.name}
                </span>

                {/* Social icons */}
                {hasSocial && (
                    <div
                        className={cn(
                            'flex items-center gap-1.5 ml-0.5 transition-all duration-200',
                            isActive
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-2 pointer-events-none',
                        )}
                    >
                        {member.social?.twitter && (
                            <a
                                href={member.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1 rounded text-deep-purple hover:text-accent-yellow transition-all duration-150 hover:scale-110"
                                title="X / Twitter"
                            >
                                <FaTwitter size={10} />
                            </a>
                        )}
                        {member.social?.linkedin && (
                            <a
                                href={member.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1 rounded text-deep-purple hover:text-accent-yellow transition-all duration-150 hover:scale-110"
                                title="LinkedIn"
                            >
                                <FaLinkedinIn size={10} />
                            </a>
                        )}
                        {member.social?.instagram && (
                            <a
                                href={member.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1 rounded text-deep-purple hover:text-accent-yellow transition-all duration-150 hover:scale-110"
                                title="Instagram"
                            >
                                <FaInstagram size={10} />
                            </a>
                        )}
                        {member.social?.behance && (
                            <a
                                href={member.social.behance}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1 rounded text-deep-purple hover:text-accent-yellow transition-all duration-150 hover:scale-110"
                                title="Behance"
                            >
                                <FaBehance size={10} />
                            </a>
                        )}
                        {member.social?.youtube && (
                            <a
                                href={member.social.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1 rounded text-deep-purple hover:text-accent-yellow transition-all duration-150 hover:scale-110"
                                title="YouTube"
                            >
                                <FaYoutube size={10} />
                            </a>
                        )}
                        {member.social?.sociabuzz && (
                            <a
                                href={member.social.sociabuzz}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1 rounded text-deep-purple hover:text-accent-yellow transition-all duration-150 hover:scale-110"
                                title="Sociabuzz"
                            >
                                <FaHeart size={10} />
                            </a>
                        )}
                    </div>
                )}
            </div>

            {/* Role */}
            <p className="mt-1.5 text-[8px] md:text-[11px] font-black uppercase tracking-[0.2em] text-accent-purple/60">
                {member.role}
            </p>
        </div>
    );
}
