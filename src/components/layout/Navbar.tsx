import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Hexagon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks: { name: string; path: string }[] = [
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3 bg-black/80' : 'bg-transparent py-5'
                } text-white drop-shadow-md`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Hexagon size={32} className="text-purple-400" />
                    </motion.div>
                    <span className="text-xl font-bold tracking-wider uppercase group-hover:text-purple-400 transition-colors text-white">
                        Pixel studios
                    </span>
                </NavLink>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-sm font-medium tracking-wide transition-colors hover:text-purple-400 text-white ${isActive ? 'text-purple-400' : ''
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-white"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 right-0 glass dark:glass-dark border-t border-gray-200 dark:border-gray-800 p-6 flex flex-col items-center gap-6"
                    >
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `text-lg font-medium transition-colors hover:text-purple-400 text-white ${isActive ? 'text-purple-400' : ''
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
