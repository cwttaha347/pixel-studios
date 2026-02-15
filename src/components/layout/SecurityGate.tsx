import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Lock, Unlock } from 'lucide-react';
import { useSecurity } from '../../hooks/useSecurity';
import { motion } from 'framer-motion';

const VALID_ACCESS_TOKEN = "pixel01"; // Hardcoded for now

interface SecurityGateProps {
    children: React.ReactNode;
}

export default function SecurityGate({ children }: SecurityGateProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);

    // Enable security hook (disable right click/save)
    useSecurity();

    useEffect(() => {
        const accessCode = searchParams.get('access');
        if (accessCode === VALID_ACCESS_TOKEN) {
            setIsUnlocked(true);
        } else {
            // Check local storage persistence
            const storedAccess = sessionStorage.getItem('portfolio_access');
            if (storedAccess === VALID_ACCESS_TOKEN) {
                setIsUnlocked(true);
            }
        }
    }, [searchParams]);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue === VALID_ACCESS_TOKEN) {
            setIsUnlocked(true);
            sessionStorage.setItem('portfolio_access', VALID_ACCESS_TOKEN);
            setSearchParams({ access: VALID_ACCESS_TOKEN });
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    if (isUnlocked) {
        return <>{children}</>;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 text-white p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900 to-black animate-spin-slow opacity-50" />
            </div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10 w-full max-w-md glass p-8 rounded-2xl border border-white/10 shadow-2xl text-center"
            >
                <div className="mb-6 flex justify-center">
                    <motion.div
                        animate={{ rotate: error ? [0, -10, 10, -10, 10, 0] : 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Lock size={48} className="text-purple-500" />
                    </motion.div>
                </div>

                <h2 className="text-2xl font-bold mb-2">Restricted Access</h2>
                <p className="text-gray-400 mb-8">Please enter the access code to view this portfolio.</p>

                <form onSubmit={handleUnlock} className="space-y-4">
                    <div className="relative">
                        <input
                            type="password"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Enter Access Code"
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-purple-500 transition-colors text-center tracking-widest"
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <Unlock size={18} />
                        Unlock Portfolio
                    </button>
                </form>

                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 mt-4 text-sm"
                    >
                        Invalid Access Code
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
}
