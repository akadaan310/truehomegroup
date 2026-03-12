import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-brand-navy rounded-t-[3rem] text-brand-white pt-20 pb-8 px-6 mt-32 relative z-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
                {/* Brand Column */}
                <div className="md:col-span-5 flex flex-col items-start gap-6">
                    <img src="/Logo.png" alt="TrueHome Group Logo" className="h-24 sm:h-40 w-auto object-contain brightness-0 invert origin-left drop-shadow-md" />

                    <div className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-2 mt-4 border border-white/10">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="font-mono text-xs uppercase tracking-wider text-green-400 font-medium">System Operational</span>
                        <span className="font-mono text-xs tracking-wide text-brand-white/60 ml-2 border-l border-white/20 pl-3">All technicians available</span>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="md:col-span-3">
                    <h4 className="font-display font-semibold text-lg mb-6 text-white">Quick Links</h4>
                    <ul className="space-y-4">
                        <li><a href="#" className="text-brand-white/70 hover:text-brand-sage text-sm transition-colors">Home</a></li>
                        <li><a href="#services" className="text-brand-white/70 hover:text-brand-sage text-sm transition-colors">Services</a></li>
                        <li><a href="#why-truehome" className="text-brand-white/70 hover:text-brand-sage text-sm transition-colors">About us</a></li>
                        <li><a href="#testimonials" className="text-brand-white/70 hover:text-brand-sage text-sm transition-colors">Reviews</a></li>
                        <li><a href="#contact" className="text-brand-white/70 hover:text-brand-sage text-sm transition-colors">Contact</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="md:col-span-4">
                    <h4 className="font-display font-semibold text-lg mb-6 text-white">Contact Us</h4>
                    <ul className="space-y-4 text-sm text-brand-white/70">
                        <li>
                            <a href="mailto:appliances@truehomegroup.com" className="hover:text-brand-sage transition-colors flex items-center gap-2">
                                Appliances@truehomegroup.com
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            (425) 399-5065
                        </li>
                        <li className="mt-6 pt-6 border-t border-white/10">
                            <span className="block text-white font-medium mb-1">Service Area</span>
                            We proudly serve the greater Seattle Area with fully licensed and insured professionals.
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-6xl mx-auto pt-8 border-t border-brand-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-white/50">
                <p>&copy; {new Date().getFullYear()} TrueHome Appliances. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-brand-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-brand-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
