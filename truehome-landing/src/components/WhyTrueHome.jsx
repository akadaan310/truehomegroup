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
        gsap.fromTo('.highlight-col',
            { y: 40, opacity: 0 },
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
        <section id="why-truehome" ref={sectionRef} className="relative py-32 lg:py-48 bg-brand-navy overflow-hidden">
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
                <div className="max-w-4xl mb-24 lg:mb-32">
                    <p className="text-xl md:text-2xl text-brand-white/80 font-sans font-medium mb-6">
                        Most installation services treat your home like a job site.
                    </p>
                    <div ref={textRef} className="font-serif italic text-5xl md:text-6xl lg:text-[100px] leading-[1.1] text-brand-white">
                        {prepareText("We treat it like")}
                        <strong className="text-brand-amber font-serif italic font-bold"> our own.</strong>
                    </div>
                </div>

                {/* Differentiators Grid */}
                <div className="highlights-grid grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pt-16 border-t border-brand-white/10">
                    <div className="highlight-col">
                        <h4 className="font-display text-xl font-bold text-white mb-3">No Shortcuts</h4>
                        <p className="text-brand-white/70 leading-relaxed font-sans cursor-default">
                            Code-compliant, by-the-book installs, every time. We never compromise on safety or quality to save time.
                        </p>
                    </div>
                    <div className="highlight-col">
                        <h4 className="font-display text-xl font-bold text-white mb-3">Vetted Technicians</h4>
                        <p className="text-brand-white/70 leading-relaxed font-sans cursor-default">
                            Every tech is fully licensed, insured, and thoroughly background-checked. Professionals you can trust inside your home.
                        </p>
                    </div>
                    <div className="highlight-col">
                        <h4 className="font-display text-xl font-bold text-white mb-3">Stand-Behind Guarantee</h4>
                        <p className="text-brand-white/70 leading-relaxed font-sans cursor-default">
                            We sign our work. If something isn't perfect, we return and make it right immediately at no extra cost.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyTrueHome;
