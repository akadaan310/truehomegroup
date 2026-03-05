import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Staggered fade up for text elements
        gsap.fromTo(
            '.hero-reveal',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.2
            }
        );
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative h-[100dvh] min-h-[600px] w-full flex items-end pb-24 lg:pb-32 px-6 overflow-hidden"
        >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero-bg.png"
                    alt="Professional kitchen installation"
                    className="w-full h-full object-cover object-center"
                />
                {/* Lighter gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-black/20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto w-full">
                <div className="max-w-4xl">
                    <h1 className="hero-reveal text-brand-white font-display font-bold text-7xl md:text-[100px] lg:text-[140px] mb-2 tracking-tight leading-none">
                        Installation
                    </h1>
                    <h2 className="hero-reveal text-brand-amber font-serif italic text-5xl md:text-7xl lg:text-[90px] leading-[0.85] mb-8 lg:mb-12 mt-2">
                        done right.
                    </h2>

                    <p className="hero-reveal text-brand-white/80 font-sans text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                        Licensed technicians. Gas &amp; water certified. Workmanship guaranteed.
                    </p>

                    <div className="hero-reveal flex flex-col sm:flex-row gap-4">
                        <a
                            href="#book"
                            className="group relative inline-flex items-center justify-center rounded-full bg-brand-amber px-8 py-4 text-base font-bold text-white overflow-hidden transition-transform hover:scale-[1.03]"
                        >
                            <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                            <span className="relative">Book Your Installation</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
