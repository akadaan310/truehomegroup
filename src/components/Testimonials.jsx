import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
    {
        author: "Sarah M.",
        location: "Bellevue, WA",
        text: "They installed our new gas range and I was nervous about the gas line. The tech explained every step, checked for leaks three times, and left the kitchen cleaner than they found it.",
        rating: 5,
        image: "/review1.JPEG"
    },
    {
        author: "James T.",
        location: "Seattle, WA",
        text: "We bought a massive built-in refrigerator that Best Buy said they couldn't fit. TrueHome measured, made micro adjustments to our cabinetry trim, and installed it flawlessly. True professionals.",
        rating: 5,
        image: "/review2.JPEG"
    },
    {
        author: "Elena R.",
        location: "Issaquah, WA",
        text: "Punctual, polite, and extremely knowledgeable. Our washing machine setup was complicated due to the old house plumbing, but they retrofitted the connections safely and effectively.",
        rating: 5,
        image: "/review3.JPEG"
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 6000); // Increased duration slightly for better readability with images
        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        gsap.fromTo('.testimonial-content', { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' });
        gsap.fromTo('.testimonial-image', { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' });
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        gsap.fromTo('.testimonial-content', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' });
        gsap.fromTo('.testimonial-image', { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' });
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    return (
        <section id="testimonials" className="py-24 lg:py-32 bg-brand-white relative border-t border-brand-muted/10 z-10 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 p-32 opacity-[0.03] pointer-events-none rotate-12">
                <Quote size={600} className="text-brand-navy" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-dark tracking-tight mb-4">
                            Homeowner Approved
                        </h2>
                        <p className="text-xl text-brand-muted font-sans font-medium">
                            Premium installations through the eyes of our clients.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full border border-brand-dark/10 flex items-center justify-center text-brand-dark hover:bg-white hover:shadow-md transition-all group"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full border border-brand-dark/10 flex items-center justify-center text-brand-dark hover:bg-white hover:shadow-md transition-all group"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border border-brand-muted/5 min-h-[500px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
                        {/* Image Column */}
                        <div className="lg:col-span-5 relative h-64 lg:h-auto overflow-hidden">
                            <div className="testimonial-image absolute inset-0 w-full h-full">
                                <img
                                    src={testimonials[currentIndex].image}
                                    alt={`Installation for ${testimonials[currentIndex].author}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-brand-navy/10 mix-blend-multiply transition-opacity duration-300"></div>
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="lg:col-span-7 p-10 md:p-16 lg:p-20 flex flex-col justify-center">
                            <div className="testimonial-content">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-brand-amber fill-brand-amber" />
                                    ))}
                                </div>

                                <div className="mb-8 relative">
                                    <Quote size={40} className="text-brand-sage/20 absolute -top-6 -left-4" />
                                    <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-brand-dark leading-relaxed relative z-10">
                                        "{testimonials[currentIndex].text}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-brand-muted/10">
                                    <div className="w-14 h-14 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy font-display font-bold text-xl border border-brand-navy/10">
                                        {testimonials[currentIndex].author.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-brand-dark tracking-tight">{testimonials[currentIndex].author}</p>
                                        <p className="text-brand-muted text-sm font-medium">{testimonials[currentIndex].location}</p>
                                    </div>
                                </div>
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
                                    gsap.fromTo('.testimonial-content', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
                                    gsap.fromTo('.testimonial-image', { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' });
                                    setCurrentIndex(idx);
                                }
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-brand-deepblue text-brand-deepblue w-8' : 'bg-brand-dark/20'}`}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
