import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const WhyTrueHome = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const bgRef = useRef(null);

    useGSAP(() => {
        // Parallax Background
        gsap.to(bgRef.current, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });

        // Word reveal for the manifesto
        const words = textRef.current.querySelectorAll('.word-reveal');
        gsap.fromTo(words,
            { opacity: 0.2, y: 10 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 80%',
                    end: 'bottom 50%',
                    scrub: 1,
                }
            }
        );

        // Fade up highlights
        gsap.fromTo('.highlight-card',
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.highlights-grid',
                    start: 'top 85%',
                }
            }
        )
    }, { scope: sectionRef });

    const prepareText = (text) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="word-reveal inline-block mr-3 lg:mr-4 last:mr-0">{word}</span>
        ));
    };

    return (
        <section id="why-truehome" ref={sectionRef} className="relative py-20 lg:py-24 bg-brand-navy overflow-hidden">
            {/* Background Image Parallax */}
            <div className="absolute inset-x-0 -top-[20%] h-[140%] z-0 pointer-events-none opacity-10 mix-blend-overlay">
                <img
                    ref={bgRef}
                    src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=2000"
                    alt="Craftsman hands precision detail"
                    className="w-full h-full object-cover grayscale"
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Typographic Statement */}
                <div className="max-w-5xl mb-4 lg:mb-6 text-center mx-auto cursor-default">
                    <h2 ref={textRef} className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-brand-white leading-tight tracking-tight">
                        {prepareText("About")}
                        <span className="text-brand-sage font-serif italic font-bold ml-3 lg:ml-4">
                            {prepareText("Us.")}
                        </span>
                    </h2>
                </div>

                {/* Differentiators Grid */}
                <div className="highlights-grid grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">

                    {/* Card 1 */}
                    <div className="highlight-card bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col group border border-white/10 hover:-translate-y-2 transition-transform duration-300">
                        <div className="aspect-[4/3] overflow-hidden relative">
                            <div className="absolute inset-0 bg-brand-sage/20 mix-blend-multiply z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                            <img src="/tech_electric.png" alt="Electric Installation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="p-8 pb-10 flex-1 flex flex-col bg-white">
                            <h4 className="font-display text-2xl font-bold text-brand-navy mb-4">No Shortcuts</h4>
                            <p className="text-brand-muted leading-relaxed font-sans cursor-default flex-1">
                                Code-compliant, by-the-book installs, every time. We never compromise on safety or quality to save time.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="highlight-card bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col group border border-white/10 hover:-translate-y-2 transition-transform duration-300">
                        <div className="aspect-[4/3] overflow-hidden relative">
                            <div className="absolute inset-0 bg-brand-deepblue/20 mix-blend-multiply z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                            <img src="/tech_water.png" alt="Water Installation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="p-8 pb-10 flex-1 flex flex-col bg-white">
                            <h4 className="font-display text-2xl font-bold text-brand-navy mb-4">Vetted Technicians</h4>
                            <p className="text-brand-muted leading-relaxed font-sans cursor-default flex-1">
                                Every tech is fully licensed, insured, and thoroughly background-checked. Professionals you can trust inside your home.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="highlight-card bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col group border border-white/10 hover:-translate-y-2 transition-transform duration-300">
                        <div className="aspect-[4/3] overflow-hidden relative">
                            <div className="absolute inset-0 bg-brand-navy/20 mix-blend-multiply z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                            <img src="/tech_gas.png" alt="Gas Installation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="p-8 pb-10 flex-1 flex flex-col bg-white">
                            <h4 className="font-display text-2xl font-bold text-brand-navy mb-4">Stand-Behind Guarantee</h4>
                            <p className="text-brand-muted leading-relaxed font-sans cursor-default flex-1">
                                We sign our work. If something isn't perfect, we return and make it right immediately at no extra cost.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyTrueHome;
