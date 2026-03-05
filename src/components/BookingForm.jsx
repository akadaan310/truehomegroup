import React, { useState } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        appliance_type: '',
        other_appliance: '',
        preferred_date: '',
        notes: '',
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    // Get tomorrow's date for the min date picker
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        // Prepare payload
        const payload = { ...formData };
        if (payload.appliance_type !== 'Other') {
            delete payload.other_appliance;
        }

        try {
            // In Vercel, the API is available on the same origin under /api/
            // For local Vite dev, we might use a proxy or full URL
            const apiUrl = import.meta.env.VITE_API_URL || '';
            const response = await fetch(`${apiUrl}/api/book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form. Please try again.');
            }

            setStatus('success');
        } catch (error) {
            console.error('Booking Error:', error);
            setStatus('error');
            setErrorMessage(error.message || 'An unexpected error occurred.');
        }
    };

    if (status === 'success') {
        return (
            <section id="book" className="py-24 bg-brand-white relative z-10">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <div className="bg-white rounded-[2.5rem] p-12 lg:p-20 shadow-2xl border border-brand-muted/10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-8">
                            <CheckCircle size={40} className="text-green-600" />
                        </div>
                        <h2 className="font-display font-bold text-4xl text-brand-dark mb-4">You're booked!</h2>
                        <p className="text-xl text-brand-muted max-w-lg mb-8">
                            We'll review your request and confirm with you at <strong className="text-brand-navy">{formData.email}</strong> within the hour.
                        </p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="text-brand-amber font-semibold hover:underline"
                        >
                            Book another installation
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="book" className="py-24 lg:py-32 bg-brand-white relative z-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Context */}
                <div className="max-w-xl">
                    <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-dark tracking-tight mb-6">
                        Book Your Installation
                    </h2>
                    <p className="text-xl text-brand-muted font-sans font-medium mb-10">
                        Takes less than 2 minutes. We'll confirm within 1 hour.
                    </p>

                    <ul className="space-y-6">
                        <li className="flex gap-4 items-start">
                            <div className="bg-brand-sage/10 rounded-full p-2 mt-1">
                                <CheckCircle size={20} className="text-brand-sage" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-brand-dark">No Upfront Fees</h4>
                                <p className="text-brand-muted text-sm mt-1">You won't be charged until the installation is complete and tested.</p>
                            </div>
                        </li>
                        <li className="flex gap-4 items-start">
                            <div className="bg-brand-sage/10 rounded-full p-2 mt-1">
                                <CheckCircle size={20} className="text-brand-sage" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-brand-dark">Direct Communication</h4>
                                <p className="text-brand-muted text-sm mt-1">Speak directly with your assigned technician before they arrive.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Right Form */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-brand-muted/10">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-sm font-semibold text-brand-navy">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="bg-brand-white border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-brand-amber transition-colors duration-200 text-brand-dark"
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-sm font-semibold text-brand-navy">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-brand-white border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-brand-amber transition-colors duration-200 text-brand-dark"
                                    placeholder="jane@example.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="phone" className="text-sm font-semibold text-brand-navy">Phone Number (Optional)</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="bg-brand-white border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-brand-amber transition-colors duration-200 text-brand-dark"
                                    placeholder="(555) 123-4567"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="preferred_date" className="text-sm font-semibold text-brand-navy">Preferred Date *</label>
                                <input
                                    type="date"
                                    id="preferred_date"
                                    name="preferred_date"
                                    required
                                    min={minDate}
                                    value={formData.preferred_date}
                                    onChange={handleChange}
                                    className="bg-brand-white border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-brand-amber transition-colors duration-200 text-brand-dark font-sans"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="appliance_type" className="text-sm font-semibold text-brand-navy">Appliance Type *</label>
                            <select
                                id="appliance_type"
                                name="appliance_type"
                                required
                                value={formData.appliance_type}
                                onChange={handleChange}
                                className="bg-brand-white border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-brand-amber transition-colors duration-200 text-brand-dark cursor-pointer"
                            >
                                <option value="" disabled>Select an appliance...</option>
                                <optgroup label="Tier 1 – Electric">
                                    <option value="Refrigerator">Refrigerator</option>
                                    <option value="Dishwasher">Dishwasher</option>
                                    <option value="Washer/Dryer">Washer/Dryer</option>
                                    <option value="Electric Range">Electric Range</option>
                                    <option value="Wall Oven">Wall Oven</option>
                                    <option value="Microwave">Microwave</option>
                                    <option value="Electric Cooktop">Electric Cooktop</option>
                                    <option value="Freezer">Freezer</option>
                                </optgroup>
                                <optgroup label="Tier 2 – Water & Vent">
                                    <option value="Fridge Water Line">Fridge Water Line</option>
                                    <option value="Range Hood">Range Hood</option>
                                    <option value="Dryer Vent">Dryer Vent</option>
                                    <option value="Garbage Disposal">Garbage Disposal</option>
                                    <option value="Water Heater">Water Heater</option>
                                    <option value="Ice Maker">Ice Maker</option>
                                    <option value="Water Filtration">Water Filtration</option>
                                </optgroup>
                                <optgroup label="Tier 3 – Gas">
                                    <option value="Gas Range">Gas Range</option>
                                    <option value="Gas Dryer">Gas Dryer</option>
                                    <option value="Gas Water Heater">Gas Water Heater</option>
                                    <option value="Gas Cooktop">Gas Cooktop</option>
                                    <option value="Outdoor Gas Grill">Outdoor Gas Grill</option>
                                </optgroup>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {formData.appliance_type === 'Other' && (
                            <div className="flex flex-col gap-2 animate-in fade-in zoom-in duration-300">
                                <label htmlFor="other_appliance" className="text-sm font-semibold text-brand-navy">Please Specify *</label>
                                <input
                                    type="text"
                                    id="other_appliance"
                                    name="other_appliance"
                                    required
                                    value={formData.other_appliance}
                                    onChange={handleChange}
                                    className="bg-brand-white border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-brand-amber transition-colors duration-200 text-brand-dark"
                                    placeholder="What do you need installed?"
                                />
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label htmlFor="notes" className="text-sm font-semibold text-brand-navy">Notes & Special Instructions (Optional)</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={3}
                                className="bg-brand-white border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-brand-amber transition-colors duration-200 text-brand-dark resize-none"
                                placeholder="E.g. It needs to go up a flight of stairs, or there's an existing unit to remove."
                            ></textarea>
                        </div>

                        {status === 'error' && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-start gap-2">
                                <span className="font-bold">Error:</span> {errorMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="mt-4 group relative w-full flex items-center justify-center rounded-[1.5rem] bg-brand-amber px-8 py-5 text-lg font-bold text-white overflow-hidden transition-transform hover:scale-[1.02] disabled:opacity-75 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                            <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                            <span className="relative flex items-center gap-2">
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 size={24} className="animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    'Schedule My Installation'
                                )}
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default BookingForm;
