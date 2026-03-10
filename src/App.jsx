import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Services from './components/Services';
import WhyTrueHome from './components/WhyTrueHome';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
    return (
        <div className="relative overflow-x-hidden text-brand-dark font-sans bg-brand-white">
            <Navbar />
            <main>
                <Hero />
                <TrustBar />
                <Services />
                <WhyTrueHome />
                <HowItWorks />
                <Testimonials />
                <Contact />
                <BookingForm />
            </main>
            <Footer />
        </div>
    );
}

export default App;
