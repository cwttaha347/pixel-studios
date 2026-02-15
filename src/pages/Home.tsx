import { motion } from 'framer-motion';
import HeroScene from '../components/3d/HeroScene';
import VideoShowcase from '../components/home/VideoShowcase';
import Gallery from '../components/portfolio/Gallery';
import Payments from '../components/home/Payments';

export default function Home() {
    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="relative h-[90vh] md:h-[85vh] flex items-center justify-center overflow-hidden px-4">
                {/* 3D Background Animation */}
                <div className="absolute inset-0 z-0">
                    <HeroScene />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-6xl md:text-9xl font-black tracking-tighter"
                    >
                        Pixel <br /><span className="text-gradient">Studios</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-xl md:text-3xl text-gray-400 font-medium"
                    >
                        Creative hub for 3D animations, characters, and modern design excellence.
                    </motion.p>
                </div>
            </section>

            <section className="relative z-10 w-full">
                <VideoShowcase />
            </section>

            <section className="relative z-10 w-full">
                <Gallery />
            </section>

            <section className="relative z-10 w-full">
                <Payments />
            </section>
        </div>
    );
}
