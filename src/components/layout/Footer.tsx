import { Instagram, Twitter, MessageSquare } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-20 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h3 className="text-3xl font-black tracking-tighter">Pixel <span className="text-gradient">Studios</span></h3>
                    <p className="text-gray-500 max-w-sm">
                        High-quality 3D animations, VTuber models, and custom emotes for creators worldwide.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-purple-400 hover:border-purple-400/50 transition-all">
                            <Twitter size={20} />
                        </a>
                        <a href="https://www.instagram.com/pixel_studio_offical?igsh=MWd5eDg4MTNsY2loeA==" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-purple-400 hover:border-purple-400/50 transition-all">
                            <Instagram size={20} />
                        </a>
                        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-purple-400 hover:border-purple-400/50 transition-all">
                            <MessageSquare size={20} />
                        </a>
                    </div>
                </div>

                <div className="space-y-6 md:text-right">
                    <div className="space-y-2">
                        <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Get in touch</p>
                        <a href="mailto:studiopixel291@gmail.com" className="text-2xl font-bold hover:text-purple-600 transition-colors">
                            studiopixel291@gmail.com
                        </a>
                    </div>
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Pixel Studios. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
