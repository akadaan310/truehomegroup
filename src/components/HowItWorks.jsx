import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.step-card');

        cards.forEach((card, index) => {
            if (index === cards.length - 1) return; // Last card doesn't pin/scale away

            ScrollTrigger.create({
                trigger: card,
                start: 'top 15%',
                endTrigger: containerRef.current,
                end: 'bottom bottom',
                pin: true,
                pinSpacing: false,
            });

            gsap.to(card, {
                scale: 0.92,
                opacity: 0.5,
                filter: 'blur(12px)',
                ease: 'none',
                scrollTrigger: {
                    trigger: cards[index + 1],
                    start: 'top bottom',
                    end: 'top 15%',
                    scrub: true,
                }
            });
        });
    }, { scope: containerRef });

    const steps = [
        {
            num: '01',
            title: 'Book in Minutes',
            desc: 'Tell us your appliance, your address, and your preferred time. We handle the rest.',
            svgContent: (
                <svg className="w-48 h-48 text-brand-deepblue stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                    <path d="M8 14h.01"></path>
                    <path d="M12 14h.01"></path>
                    <path d="M16 14h.01"></path>
                    <path d="M8 18h.01"></path>
                    <path d="M12 18h.01"></path>
                    <path d="M16 18h.01"></path>
                </svg>
            )
        },
        {
            num: '02',
            title: 'We Dispatch a Certified Tech',
            desc: 'A vetted, licensed technician arrives on time with all the tools and parts needed.',
            svgContent: (
                <svg className="w-48 h-48 text-brand-sage stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                    <path className="animate-pulse" d="M12 22s-8-6-8-12a8 8 0 0 1 16 0c0 6-8 12-8 12z"></path>
                </svg>
            )
        },
        {
            num: '03',
            title: 'Installed. Tested. Guaranteed.',
            desc: 'Every install is tested before we leave. You get a written workmanship guarantee.',
            svgContent: (
                <svg className="w-48 h-48 text-brand-navy stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    <polyline className="text-green-500" points="16 12 18 18 22 10" strokeWidth="2"></polyline>
                </svg>
            )
        }
    ];

    return (
        <section id="how-it-works" ref={containerRef} className="py-24 bg-brand-white relative z-10">
            <div className="max-w-4xl mx-auto px-6 mb-16 text-center">
                <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-dark tracking-tight mb-4">
                    How It Works
                </h2>
                <p className="text-xl text-brand-muted font-sans font-medium">
                    A predictable, professional protocol.
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-6 pb-32">
                {steps.map((step, idx) => (
                    <div
                        key={idx}
                        className="step-card w-full min-h-[60vh] flex flex-col md:flex-row items-center justify-between gap-12 bg-white rounded-[2.5rem] shadow-2xl p-12 lg:p-20 mb-[10vh] last:mb-0 border border-brand-muted/10 transform-origin-top relative"
                    >
                        <div className="w-full md:w-1/2 flex flex-col items-start text-left z-10">
                            <span className="font-mono text-xl text-brand-deepblue font-semibold tracking-wider mb-4 block">STEP {step.num}</span>
                            <h3 className="font-display font-bold text-4xl lg:text-5xl mb-6 text-brand-dark">{step.title}</h3>
                            <p className="text-xl leading-relaxed text-brand-muted font-sans">
                                {step.desc}
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-brand-white rounded-[2rem] border border-brand-muted/5">
                            {step.svgContent}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
