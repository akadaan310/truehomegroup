import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MapPin, Mail, Phone, Clock, Globe } from 'lucide-react';

const ContactInfoCard = ({ icon: Icon, title, content, link, delay }) => {
    return (
        <a href={link} className={`contact-card opacity-0 translate-y-8 flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-xl border border-brand-muted/10 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group`}>
            <div className={`w-14 h-14 rounded-2xl bg-brand-navy/5 text-brand-navy flex items-center justify-center mb-6 group-hover:bg-brand-sage group-hover:text-white transition-colors duration-300`}>
                <Icon size={28} />
            </div>
            <h3 className="font-display font-bold text-xl text-brand-dark mb-2">{title}</h3>
            <p className="text-brand-muted font-sans" dangerouslySetInnerHTML={{ __html: content }}></p>
        </a>
    )
}

const Contact = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        gsap.to('.contact-card', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
            }
        });
    }, { scope: sectionRef });

    return (
        <section id="contact" ref={sectionRef} className="py-24 lg:py-32 bg-brand-white relative z-10 border-t border-brand-muted/10">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
                    <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-deepblue tracking-tight mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-xl text-brand-muted font-sans font-medium">
                        Need an installation or have a question? We're here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
                    <ContactInfoCard
                        icon={MapPin}
                        title="Office"
                        content="720 Seneca St<br/>Ste 107<br/>Seattle, WA 98101"
                        link="https://maps.app.goo.gl/d7Pwskp6WspQnDb49"
                        delay={0}
                    />
                    <ContactInfoCard
                        icon={Phone}
                        title="Phone Support"
                        content="<strong class='text-brand-navy text-lg'>(425) 399-5065</strong><br/>Mon-Sat, 8am - 6pm"
                        link="tel:4253995065"
                        delay={0.1}
                    />
                    <ContactInfoCard
                        icon={Mail}
                        title="Email Us"
                        content="appliances@<br/>truehomegroup.com"
                        link="mailto:appliances@truehomegroup.com"
                        delay={0.2}
                    />
                    <ContactInfoCard
                        icon={Clock}
                        title="Working Hours"
                        content="Monday - Saturday<br/>8:00 AM - 6:00 PM<br/>Sunday: Closed"
                        link="#contact"
                        delay={0.3}
                    />
                    <ContactInfoCard
                        icon={Globe}
                        title="Service Areas"
                        content="King County<br/>Pierce County<br/>Thurston County<br/><span class='text-brand-sage text-xs font-semibold mt-1 inline-block'>★ All surrounding greater Seattle area</span>"
                        link="#contact"
                        delay={0.4}
                    />
                </div>
            </div>
        </section>
    );
};

export default Contact;
