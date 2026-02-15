import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PresentationControls, Html, useProgress, Stars } from '@react-three/drei';
import { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

function Loader() {
    const { progress } = useProgress();
    return <Html center className="text-white font-bold whitespace-nowrap text-[10px] tracking-widest uppercase opacity-50">{progress.toFixed(0)}% Initializing</Html>;
}

function TechCore({ isMobile }: { isMobile: boolean }) {
    const groupRef = useRef<THREE.Group>(null!);
    const { mouse } = useThree();

    // Procedural Tech Panels
    const panels = useMemo(() => {
        const temp = [];
        const count = isMobile ? 8 : 15;
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const radius = 2 + Math.random() * 1.5;
            temp.push({
                position: [
                    Math.cos(angle) * radius,
                    (Math.random() - 0.5) * 4,
                    Math.sin(angle) * radius
                ],
                rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
                scale: [0.1 + Math.random() * 0.4, 0.05 + Math.random() * 0.2, 0.01],
                speed: 0.2 + Math.random() * 0.5
            });
        }
        return temp;
    }, [isMobile]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Gentle group rotation
        groupRef.current.rotation.y = time * 0.1;

        // Reactive lean based on mouse
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.2, 0.05);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, mouse.x * 0.2, 0.05);
    });

    return (
        <group ref={groupRef}>
            {/* Center Glass Orb - Optimized */}
            <mesh scale={1.5}>
                <sphereGeometry args={[1, 24, 24]} />
                <meshStandardMaterial
                    color="#8b5cf6"
                    emissive="#8b5cf6"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.6}
                    roughness={0.1}
                    metalness={0.8}
                />
            </mesh>

            {/* Kinetic Rings */}
            <group rotation={[Math.PI / 2, 0, 0]}>
                <mesh rotation={[0.5, 0.5, 0]}>
                    <torusGeometry args={[2.8, 0.012, 8, 48]} />
                    <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={3} transparent opacity={0.4} />
                </mesh>
                <mesh rotation={[-0.5, 0.8, 0]}>
                    <torusGeometry args={[3.2, 0.006, 8, 48]} />
                    <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={3} transparent opacity={0.2} />
                </mesh>
            </group>

            {/* Tech Panels Cluster */}
            {panels.map((panel, i) => (
                <Panel key={i} {...panel} />
            ))}

            {/* Core Glow */}
            <pointLight intensity={3} color="#8b5cf6" distance={5} />
        </group>
    );
}

function Panel({ position, rotation, scale, speed }: any) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame(() => {
        meshRef.current.rotation.x += 0.005 * speed;
        meshRef.current.rotation.y += 0.002 * speed;
    });

    return (
        <mesh ref={meshRef} position={position as any} rotation={rotation as any} scale={scale as any}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color="#1a1a1f"
                metalness={1}
                roughness={0.2}
                emissive="#8b5cf6"
                emissiveIntensity={Math.random() > 0.8 ? 1 : 0}
            />
        </mesh>
    );
}

function Atmosphere() {
    return (
        <>
            <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
            <pointLight intensity={2} color="#ec4899" distance={15} />
            <Environment preset="night" />
        </>
    );
}

export default function HeroScene() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const isWebGLAvailable = () => {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    };

    if (!isWebGLAvailable() || isMobile) {
        return (
            <div className="w-full h-full relative overflow-hidden bg-[#0a0a0c]">
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-purple-600/20 rounded-full blur-[140px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-pink-600/20 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2.5s' }} />
                </div>
                <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c]/50" />
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-hidden bg-[#0a0a0c]">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                dpr={1}
            >
                <color attach="background" args={['#0a0a0c']} />
                <fog attach="fog" args={['#0a0a0c', 5, 25]} />

                <ambientLight intensity={0.2} />

                <Suspense fallback={<Loader />}>
                    <PresentationControls
                        global
                        rotation={[0, 0, 0]}
                        polar={[-Math.PI / 6, Math.PI / 6]}
                        azimuth={[-Math.PI / 4, Math.PI / 4]}
                    >
                        <TechCore isMobile={isMobile} />
                    </PresentationControls>
                    <Atmosphere />
                </Suspense>
            </Canvas>
        </div>
    );
}
