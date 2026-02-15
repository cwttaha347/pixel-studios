import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="py-20 space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter">About <span className="text-gradient">Me</span></h1>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6 text-lg text-gray-600 dark:text-gray-300"
                >
                    <p>
                        Hello! I am a passionate graphic designer and 3D artist specializing in character design,
                        animations, and immersive digital experiences.
                    </p>
                    <p>
                        With a keen eye for detail and a love for storytelling, I bring imagination to life
                        through vibrant visuals and dynamic motion.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-white/10"
                >
                    <span className="text-2xl font-bold opacity-50">[Artist Profile Image]</span>
                </motion.div>
            </div>
        </div>
    );
}
