import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Why Us', href: '#why-truehome' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Testimonials', href: '#testimonials' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-brand-navy/95 backdrop-blur-xl shadow-lg border-b border-brand-white/10 py-3'
                : 'bg-transparent py-6'
                }`}
        >
            <div className={`mx-auto max-w-7xl px-6 transition-all duration-300`}>
                <div className="flex items-center justify-between">
                    {/* Logo Area */}
                    <div className="flex items-center">
                        <a href="#" className="flex items-center gap-2">
                            <img
                                src="/Logo.png"
                                alt="TrueHome Group Logo"
                                className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-16 sm:h-20' : 'h-24 sm:h-40'} origin-left brightness-0 invert drop-shadow-lg`}
                            />
                        </a>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-2 bg-brand-navy/40 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-lg">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-5 py-2 rounded-full text-brand-white hover:text-white hover:bg-brand-amber/90 transition-all text-sm font-semibold tracking-wide"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#book"
                            className="hidden sm:inline-flex items-center justify-center rounded-full bg-brand-amber px-6 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105"
                        >
                            Book Now
                        </a>
                        <button
                            className="md:hidden text-white p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <div
                className={`md:hidden absolute top-full left-0 right-0 px-6 pt-2 pb-6 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
                    }`}
            >
                <div className="bg-brand-navy rounded-[2rem] p-6 flex flex-col gap-6 shadow-2xl border border-brand-white/10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-white text-lg font-medium"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#book"
                        onClick={() => setMobileMenuOpen(false)}
                        className="inline-flex items-center justify-center rounded-full bg-brand-amber px-6 py-3 text-base font-bold text-white"
                    >
                        Book Now
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
