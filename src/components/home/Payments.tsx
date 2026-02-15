import { motion } from 'framer-motion';

const paymentItems = [
    { id: 28, src: '/portfolio-content/28.png' },
    { id: 29, src: '/portfolio-content/29.png' },
    { id: 30, src: '/portfolio-content/30.jpg' },
    { id: 31, src: '/portfolio-content/31.png' },
    { id: 32, src: '/portfolio-content/32.jpg' },
    { id: 27, src: '/portfolio-content/27.png' },
];

export default function Payments() {
    return (
        <div className="py-20 space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
            >
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Payment <span className="text-gradient">Gateways</span></h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                    Secure and reliable payment methods we accept for our services.
                </p>
            </motion.div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 mx-auto max-w-7xl px-4">
                {paymentItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="break-inside-avoid mb-4 group relative cursor-pointer overflow-hidden rounded-xl"
                    >
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />
                        <img
                            src={item.src}
                            alt={`Payment Method ${index + 1}`}
                            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                            onContextMenu={(e) => e.preventDefault()}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
