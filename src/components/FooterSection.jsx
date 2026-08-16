import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, ArrowUp } from 'lucide-react';

export default function FooterSection() {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-app-card border-t border-app-border text-app-muted text-sm transition-colors pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-app-border">
          
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block text-2xl font-black text-app-text tracking-tight font-kavoon">
              Tasty<span className="text-app-primary">Bites</span>.
            </Link>
            <p className="text-app-muted leading-relaxed max-w-sm text-xs sm:text-sm">
              Freshly prepared African dishes and customized meal prep delivered directly to your home, office, or event space across Accra.
            </p>

            <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-app-text">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-app-primary shrink-0" />
                <span>Airport Residential Area, Accra, Ghana</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-app-primary shrink-0" />
                <span>+233 (0) 24 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-app-primary shrink-0" />
                <span>orders@tastybites.com</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-app-text font-bold text-sm tracking-wide uppercase">Navigation</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#menu" onClick={(e) => handleSectionClick(e, 'menu')} className="hover:text-app-primary transition-colors">
                  Menu Options
                </a>
              </li>
              <li>
                <Link to="/booking" className="hover:text-app-primary transition-colors">
                  Pre-Orders & Catering
                </Link>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleSectionClick(e, 'contact')} className="hover:text-app-primary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-app-text font-bold text-sm tracking-wide uppercase">Delivery Hours</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex flex-col">
                <span className="text-app-text font-medium">Monday – Saturday</span>
                <span className="text-app-muted text-xs">11:00 AM – 10:00 PM</span>
              </li>
              <li className="flex flex-col pt-1">
                <span className="text-app-text font-medium">Sunday</span>
                <span className="text-app-muted text-xs">12:00 PM – 9:00 PM</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-app-text font-bold text-sm tracking-wide uppercase">Stay Updated</h4>
            <p className="text-xs text-app-muted leading-relaxed">
              Subscribe to get weekly menu updates, discount codes, and special holiday pre-order deals.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-app-bg border border-app-border rounded-xl px-3.5 py-2.5 text-xs text-app-text placeholder:text-app-muted/60 focus:outline-none focus:ring-2 focus:ring-app-primary/50 transition pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-app-primary text-white rounded-lg hover:opacity-90 transition flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-green-500 font-medium pt-1">
                  Thanks for subscribing!
                </p>
              )}
            </form>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-app-muted text-center sm:text-left">
            &copy; {new Date().getFullYear()} Tasty Bites. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <button onClick={scrollToTop} className="p-2 bg-app-bg border border-app-border rounded-lg text-app-muted hover:text-app-primary hover:border-app-primary transition-colors flex items-center gap-1.5" aria-label="Scroll to top">
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}