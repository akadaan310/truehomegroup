import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
    {
        author: "Sarah M.",
        location: "Tampa, FL",
        text: "They installed our new gas range and I was nervous about the gas line. The tech explained every step, checked for leaks three times, and left the kitchen cleaner than they found it.",
        rating: 5,
    },
    {
        author: "James T.",
        location: "St. Petersburg, FL",
        text: "We bought a massive built-in refrigerator that Best Buy said they couldn't fit. TrueHome measured, made micro adjustments to our cabinetry trim, and installed it flawlessly. True professionals.",
        rating: 5,
    },
    {
        author: "Elena R.",
        location: "Clearwater, FL",
        text: "Punctual, polite, and extremely knowledgeable. Our washing machine setup was complicated due to the old house plumbing, but they retrofitted the connections safely and effectively.",
        rating: 5,
    },
    {
        author: "Michael P.",
        location: "Wesley Chapel, FL",
        text: "I appreciate any contractor who puts down drop cloths before bringing their toolbox inside. Top-tier service from start to finish. I won't use anyone else for appliance installs.",
        rating: 5,
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 4500);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        gsap.fromTo('.quote-content', { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        gsap.fromTo('.quote-content', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    return (
        <section id="testimonials" className="py-24 lg:py-32 bg-brand-white relative border-t border-brand-muted/10 z-10 overflow-hidden">
            <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
                <Quote size={400} className="text-brand-navy" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-dark tracking-tight mb-4">
                            Homeowner Approved
                        </h2>
                        <p className="text-xl text-brand-muted font-sans font-medium">
                            Don't just take our word for it.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full border border-brand-dark/10 flex items-center justify-center text-brand-dark hover:bg-white hover:shadow-md transition-all"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full border border-brand-dark/10 flex items-center justify-center text-brand-dark hover:bg-white hover:shadow-md transition-all"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl p-10 md:p-16 lg:p-20 relative border border-brand-muted/5 min-h-[400px] flex items-center">
                    <div className="quote-content w-full max-w-4xl">
                        <div className="flex gap-1 mb-8">
                            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 text-brand-amber fill-brand-amber" />
                            ))}
                        </div>

                        <p className="font-serif italic text-3xl md:text-4xl text-brand-dark leading-relaxed mb-10">
                            "{testimonials[currentIndex].text}"
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy font-display font-bold text-xl">
                                {testimonials[currentIndex].author.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-lg text-brand-dark tracking-tight">{testimonials[currentIndex].author}</p>
                                <p className="text-brand-muted text-sm">{testimonials[currentIndex].location}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-3 mt-10">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                if (idx !== currentIndex) {
                                    gsap.fromTo('.quote-content', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
                                    setCurrentIndex(idx);
                                }
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-brand-amber text-brand-amber w-8' : 'bg-brand-dark/20'}`}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
