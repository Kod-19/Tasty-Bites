import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Globe
} from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ fullName: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <section id="contact" className="bg-app-bg py-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-app-text tracking-tight">
            Get in Touch
          </h2>
          <p className="mt-2 text-app-muted text-base max-w-xl mx-auto">
            Have questions about our catering, menu, or want to reserve a table? Send us a message or reach out directly!
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Contact Info & Socials */}
          <div className="lg:col-span-5 bg-app-bg p-6 sm:p-8 rounded-2xl flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold text-app-text mb-6">Contact Details</h3>

              {/* Info Items */}
              <div className="space-y-6 text-app-muted">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 text-app-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-app-text text-sm">Location</h4>
                    <p className="text-sm mt-0.5 leading-relaxed">
                      Reading, UK
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 text-app-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-app-text text-sm">Phone</h4>
                    <a href='tel:+44 7300 487808'>+44 7300 487808</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 text-app-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-app-text text-sm">Email</h4>
                    <a href='mailto:dawsonthelma9@gmail.com'>dawsonthelma9@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 text-app-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-app-text text-sm">Opening Hours</h4>
                    <p className="text-sm mt-0.5">Mon - Sat: 11:00 AM - 10:00 PM</p>
                    <p className="text-sm">Sunday: 12:00 PM - 9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links (Inline SVGs to prevent Lucide brand icon errors) */}
            <div className="mt-10 pt-6 border-t border-app-border">
              <h4 className="font-semibold text-app-text text-sm mb-4">Follow Us</h4>
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-app-muted hover:text-app-primary hover:border-app-primary transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-app-muted hover:text-app-primary hover:border-app-primary transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-app-muted hover:text-app-primary hover:border-app-primary transition-colors"
                  aria-label="X"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Website */}
                <a
                  href="#"
                  className="text-app-muted hover:text-app-primary hover:border-app-primary transition-colors"
                  aria-label="Website"
                >
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Detailed Contact Form */}
          <div className="lg:col-span-7 bg-app-card border border-app-border rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-app-text mb-6">Send Us a Message</h3>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-600 text-sm font-medium">
                Thank you! Your message has been sent successfully. We'll get back to you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold uppercase text-app-muted mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full bg-app-bg-subtle border border-app-border rounded-xl px-4 py-3 text-app-text placeholder:text-app-muted/60 text-sm focus:outline-none focus:ring-2 focus:ring-app-primary/50 transition"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase text-app-muted mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+44 7123 456789"
                    className="w-full bg-app-bg-subtle border border-app-border rounded-xl px-4 py-3 text-app-text placeholder:text-app-muted/60 text-sm focus:outline-none focus:ring-2 focus:ring-app-primary/50 transition"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase text-app-muted mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full bg-app-bg-subtle border border-app-border rounded-xl px-4 py-3 text-app-text placeholder:text-app-muted/60 text-sm focus:outline-none focus:ring-2 focus:ring-app-primary/50 transition"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-bold uppercase text-app-muted mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-app-bg-subtle border border-app-border rounded-xl px-4 py-3 text-app-text text-sm focus:outline-none focus:ring-2 focus:ring-app-primary/50 transition"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Feedback">Feedback / Suggestions</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase text-app-muted mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Let us know how we can help you..."
                  className="w-full bg-app-bg-subtle border border-app-border rounded-xl px-4 py-3 text-app-text placeholder:text-app-muted/60 text-sm focus:outline-none focus:ring-2 focus:ring-app-primary/50 transition resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-app-primary text-white font-bold py-3.5 px-6 rounded-xl hover:opacity-90 transition active:scale-[0.99] flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}