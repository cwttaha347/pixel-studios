import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <div className="py-20 space-y-12 max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Get in <span className="text-gradient">Touch</span></h1>
                <p className="text-gray-500 mt-4">
                    Interested in working together? Fill out the form below.
                </p>
            </motion.div>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="glass dark:glass-dark p-8 rounded-2xl space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                            type="text"
                            className="w-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 outline-none focus:border-purple-500 transition-colors"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 outline-none focus:border-purple-500 transition-colors"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Message</label>
                        <textarea
                            rows={4}
                            className="w-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 outline-none focus:border-purple-500 transition-colors"
                            placeholder="Tell me about your project..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Send Message
                    </button>
                </div>
            </motion.form>
        </div>
    );
}
