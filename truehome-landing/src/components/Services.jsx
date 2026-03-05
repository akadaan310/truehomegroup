import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Zap, Droplets, Flame, ChevronDown, Check, Trash2, CalendarClock, PhoneCall } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, badge, colorClass, appliances, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            if (isExpanded) {
                gsap.to(contentRef.current, { height: 'auto', duration: 0.4, ease: 'power2.out' });
                gsap.to(contentRef.current.children, { autoAlpha: 1, duration: 0.3, delay: 0.1 });
            } else {
                gsap.to(contentRef.current.children, { autoAlpha: 0, duration: 0.2 });
                gsap.to(contentRef.current, { height: 0, duration: 0.4, ease: 'power2.inOut' });
            }
        }
    }, [isExpanded]);

    return (
        <div className="service-card opacity-0 translate-y-8 bg-white rounded-[2rem] shadow-lg border border-brand-muted/5 p-8 transition-all hover:-translate-y-2 hover:shadow-xl flex flex-col h-full group relative overflow-hidden">
            {/* Accent Header */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white ${colorClass}`}>
                <Icon size={24} />
            </div>

            <h3 className="font-display font-bold text-2xl mb-2 text-brand-dark">{title}</h3>
            <p className="text-brand-muted mb-6 flex-grow">{description}</p>

            {badge && (
                <div className="inline-block bg-brand-amber/10 border border-brand-amber/20 text-brand-amber text-xs font-bold px-3 py-1.5 rounded-full mb-6 max-w-max">
                    {badge}
                </div>
            )}

            {/* Expandable Section */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full py-3 border-t border-brand-muted/10 font-semibold text-sm text-brand-navy hover:text-brand-amber transition-colors outline-none"
            >
                <span>{isExpanded ? 'Hide Appliances' : 'See All Appliances'}</span>
                <ChevronDown size={18} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            <div ref={contentRef} className="h-0 overflow-hidden opacity-100 flex flex-col justify-end">
                <ul className="pt-4 space-y-3">
                    {appliances.map((app, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-brand-muted">
                            <Check size={16} className={`mt-0.5 flex-shrink-0 ${colorClass.replace('bg-', 'text-')}`} />
                            <span>{app}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const Services = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.to('.service-card', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 75%',
            }
        });

        gsap.fromTo('.addon-chip', { y: 20, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.addons-container',
                start: 'top 85%',
            }
        });
    }, { scope: containerRef });

    const tiers = [
        {
            icon: Zap,
            title: 'Electric Installation',
            description: 'Standard plug-and-play and hardwired electric household appliances.',
            colorClass: 'bg-brand-sage',
            appliances: ['Dishwashers', 'Washers & Dryers', 'Electric Ranges & Cooktops', 'Wall Ovens', 'Microwaves', 'Refrigerators', 'Freezers']
        },
        {
            icon: Droplets,
            title: 'Water & Vent Hookups',
            description: 'Plumbing connections and complex ventilation systems.',
            colorClass: 'bg-brand-navy',
            appliances: ['Fridge Water Lines', 'Dishwasher Plumbing', 'Dryer Vents', 'Range Hoods', 'Garbage Disposals', 'Water Heaters', 'Ice Makers', 'Water Filtration']
        },
        {
            icon: Flame,
            title: 'Gas Appliances',
            description: 'Rigorous, leak-tested installations for all home gas equipment.',
            colorClass: 'bg-brand-amber',
            badge: 'Performed by Gas-Certified Pros',
            appliances: ['Gas Ranges', 'Gas Cooktops', 'Gas Dryers', 'Gas Water Heaters', 'Outdoor Gas Grills', 'Gas Fireplaces']
        }
    ];

    return (
        <section id="services" ref={containerRef} className="py-24 lg:py-32 bg-brand-white relative z-10">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
                    <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-dark tracking-tight mb-4">
                        What We Install
                    </h2>
                    <p className="text-xl text-brand-muted font-sans font-medium">
                        Every major home appliance, installed with precision.
                    </p>
                </div>

                {/* Tier Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-20">
                    {tiers.map((tier, idx) => (
                        <ServiceCard key={idx} index={idx} {...tier} />
                    ))}
                </div>

                {/* Add-ons Row */}
                <div className="addons-container flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                    <div className="addon-chip flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm border border-brand-muted/10 text-sm font-semibold text-brand-dark">
                        <Trash2 size={18} className="text-brand-muted" /> Haul-Away & Removal
                    </div>
                    <div className="addon-chip flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm border border-brand-muted/10 text-sm font-semibold text-brand-dark">
                        <CalendarClock size={18} className="text-brand-muted" /> Same-Day & Next-Day Availability
                    </div>
                    <div className="addon-chip flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm border border-brand-muted/10 text-sm font-semibold text-brand-dark">
                        <PhoneCall size={18} className="text-brand-muted" /> Free Installation Consulting
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
