"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react';
import { cn } from "@/lib/utils";

// MediaItemType defines the structure of a media item
export interface MediaItemType {
    id: number;
    type: string;
    title: string;
    desc: string;
    url: string;
    span: string;
}
// MediaItem component renders either a video or image based on item.type
const MediaItem = ({ item, className, onClick }: { item: MediaItemType, className?: string, onClick?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null); // Reference for video element
    const [isInView, setIsInView] = useState(false); // To track if video is in the viewport
    const [isBuffering, setIsBuffering] = useState(true);  // To track if video is buffering

    // Intersection Observer to detect if video is in view and play/pause accordingly
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting); // Set isInView to true if the video is in view
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current); // Start observing the video element
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current); // Clean up observer when component unmounts
            }
        };
    }, []);
    // Handle video play/pause based on whether the video is in view or not
    useEffect(() => {
        let mounted = true;

        const handleVideoPlay = async () => {
            if (!videoRef.current || !isInView || !mounted) return; // Don't play if video is not in view or component is unmounted

            try {
                if (videoRef.current.readyState >= 3) {
                    setIsBuffering(false);
                    await videoRef.current.play(); // Play the video if it's ready
                } else {
                    setIsBuffering(true);
                    await new Promise((resolve) => {
                        if (videoRef.current) {
                            videoRef.current.oncanplay = resolve as any; // Wait until the video can start playing
                        }
                    });
                    if (mounted) {
                        setIsBuffering(false);
                        await videoRef.current.play();
                    }
                }
            } catch (error) {
                console.warn("Video playback failed:", error);
            }
        };

        if (isInView) {
            handleVideoPlay();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }

        return () => {
            mounted = false;
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
        };
    }, [isInView]);

    // Render either a video or image based on item.type

    if (item.type === 'video') {
        return (
            <div className={`${className} relative overflow-hidden bg-black/5`}>
                <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    preload="auto"
                    style={{
                        opacity: isBuffering ? 0.8 : 1,
                        transition: 'opacity 0.2s',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                >
                    <source src={item.url} type="video/mp4" />
                </video>
                {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <img
            src={item.url} // Image source URL
            alt={item.title} // Alt text for the image
            className={`${className} object-contain cursor-pointer bg-black/5`} // Style the image
            onClick={onClick} // Trigger onClick when the image is clicked
            loading="lazy" // Lazy load the image for performance
            decoding="async" // Decode the image asynchronously
        />
    );
};



// GalleryModal component displays the selected media item in a modal
interface GalleryModalProps {
    selectedItem: MediaItemType;
    isOpen: boolean;
    onClose: () => void;
    setSelectedItem: (item: MediaItemType | null) => void;
    mediaItems: MediaItemType[]; // List of media items to display in the modal
}
const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Main Modal Content */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col z-[210]"
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/10 text-deep-purple hover:bg-black/20 transition-colors"
                    onClick={onClose}
                >
                    <X className='w-6 h-6' />
                </button>

                <div className="flex-1 min-h-0 flex items-center justify-center bg-gray-50/30 p-2 sm:p-4 md:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedItem.id}
                            className="relative w-full h-full flex items-center justify-center"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MediaItem
                                item={selectedItem}
                                className="max-w-full max-h-full rounded-2xl shadow-xl object-contain shadow-deep-purple/10"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="p-6 md:p-8 bg-white border-t border-accent-purple/10">
                    <h3 className="text-2xl md:text-3xl font-sans font-black text-deep-purple uppercase tracking-tighter mb-2">
                        {selectedItem.title}
                    </h3>
                    <p className="text-muted-foreground italic text-lg leading-relaxed max-w-2xl">
                        {selectedItem.desc}
                    </p>
                </div>
            </motion.div>

            {/* Draggable Dock Overlay */}
            <motion.div
                drag
                dragMomentum={false}
                dragElastic={0.1}
                initial={false}
                animate={{ x: dockPosition.x, y: dockPosition.y }}
                onDragEnd={(_, info) => {
                    setDockPosition(prev => ({
                        x: prev.x + info.offset.x,
                        y: prev.y + info.offset.y
                    }));
                }}
                className="fixed z-[250] left-1/2 bottom-8 -translate-x-1/2 touch-none"
            >
                <div className="relative rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-accent-purple/20 shadow-2xl p-3 flex items-center gap-3 cursor-grab active:cursor-grabbing">
                    {mediaItems.map((item) => (
                        <motion.div
                            key={item.id}
                            onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
                            className={cn(
                                "w-12 h-12 rounded-lg overflow-hidden cursor-pointer border-2 transition-all",
                                selectedItem.id === item.id ? "border-accent-yellow scale-110 shadow-lg" : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                            )}
                        >
                            <img src={item.url} className="w-full h-full object-cover" />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};



export interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[]
    title: string
    description: string

}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);

    return (
        <div className="w-full relative z-10">
            {title && (
                <div className="mb-8 text-center">
                    <motion.h1
                        className="text-2xl sm:text-3xl md:text-4xl font-sans font-black bg-clip-text text-transparent 
                                 bg-gradient-to-r from-deep-purple via-accent-purple to-deep-purple
                                 uppercase tracking-tighter"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        className="mt-2 text-sm sm:text-base text-deep-purple/60 italic font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {description}
                    </motion.p>
                </div>
            )}
            <AnimatePresence mode="wait">
                {selectedItem ? (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        mediaItems={mediaItems}
                    />
                ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px] grid-flow-row-dense"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                    >
                        {mediaItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layoutId={`media-${item.id}`}
                                className={cn("relative overflow-hidden rounded-3xl cursor-pointer group", item.span)}
                                onClick={() => setSelectedItem(item)}
                                variants={{
                                    hidden: { y: 30, scale: 0.95, opacity: 0 },
                                    visible: {
                                        y: 0,
                                        scale: 1,
                                        opacity: 1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 25,
                                            delay: index * 0.05
                                        }
                                    }
                                }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <MediaItem
                                    item={item}
                                    className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110"
                                    onClick={() => setSelectedItem(item)}
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                                <motion.div
                                    className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                                >
                                    <div className="relative z-10">
                                        <div className="absolute inset-0 blur-xl bg-black/60 -z-10" />
                                        <h3 className="text-white text-sm md:text-base font-black uppercase tracking-widest line-clamp-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/70 text-[10px] sm:text-xs mt-0.5 line-clamp-2 italic">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


export default InteractiveBentoGallery
