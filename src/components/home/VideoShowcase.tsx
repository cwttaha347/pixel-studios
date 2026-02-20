import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { portfolioItems } from '../../data/items';

const videos = portfolioItems.filter(item => item.type === 'video');

interface VideoCardProps {
    src: string;
    index: number;
}

function VideoCard({ src, index }: VideoCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay prevented
            });
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Reset
            setIsPlaying(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="relative group rounded-xl overflow-hidden glass shadow-lg cursor-pointer aspect-video"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={togglePlay}
        >
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-cover"
                muted={isMuted}
                loop
                playsInline
                preload="none"
            />

            {/* Overlay Controls */}
            <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    {isPlaying ? <Pause className="text-white" /> : <Play className="text-white" fill="white" />}
                </div>
            </div>

            {/* Mute Button */}
            <button
                onClick={toggleMute}
                className="absolute bottom-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
        </motion.div>
    );
}

export default function VideoShowcase() {
    const [visibleCount, setVisibleCount] = useState(6);
    const hasMore = visibleCount < videos.length;

    const loadMore = () => {
        setVisibleCount(prev => Math.min(prev + 6, videos.length));
    };

    return (
        <div className="pt-4 pb-20 space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
            >
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Motion <span className="text-gradient">Showcase</span></h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                    A selection of my animated works and motion graphics.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
                {videos.slice(0, visibleCount).map((video, index) => (
                    <VideoCard key={video.id} src={video.src} index={index} />
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center pt-8">
                    <button
                        onClick={loadMore}
                        className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg shadow-purple-500/20 transition-all transform hover:scale-105 active:scale-95"
                    >
                        Load More Creations
                    </button>
                </div>
            )}
        </div>
    );
}
