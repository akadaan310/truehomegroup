import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ShieldCheck, Flame, BadgeCheck, Star } from 'lucide-react';

const TrustBar = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
            '.trust-item',
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 90%',
                }
            }
        );
    }, { scope: containerRef });

    const items = [
        { icon: <ShieldCheck className="text-brand-navy w-6 h-6" />, label: 'Licensed & Insured Technicians' },
        { icon: <Flame className="text-blue-600 w-6 h-6" />, label: 'Gas & Water Certified' },
        { icon: <BadgeCheck className="text-brand-sage w-6 h-6" />, label: 'Workmanship Guarantee' },
        { icon: <Star className="text-yellow-500 w-6 h-6 fill-yellow-500" />, label: '5-Star Rated Service' },
    ];

    return (
        <section ref={containerRef} className="w-full bg-brand-white border-b border-brand-muted/10 py-8 relative z-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center">
                    {items.map((item, index) => (
                        <div key={index} className="trust-item flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left opacity-0">
                            <div className="flex-shrink-0 bg-white p-2.5 rounded-full shadow-sm border border-brand-muted/10">
                                {item.icon}
                            </div>
                            <span className="text-sm font-medium text-brand-dark leading-tight max-w-[140px]">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBar;
