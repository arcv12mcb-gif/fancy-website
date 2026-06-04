import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Gem,
  Menu,
  X,
  Car,
  Store,
  CreditCard,
  Package,
  Award,
  MapPin,
  Phone,
  Mail,
  Star,
} from "lucide-react";

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-[1000px] h-[1000px] bg-purple-600/70 rounded-full blur-[180px] animate-pulse top-[-300px] left-[-300px]" />
      <div className="absolute w-[900px] h-[900px] bg-pink-500/60 rounded-full blur-[180px] animate-pulse bottom-[-250px] right-[-250px]" />
      <div className="absolute w-[800px] h-[800px] bg-blue-500/50 rounded-full blur-[180px] animate-pulse top-[30%] left-[50%]" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20" />
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Gem className="text-purple-400" />
          Euphoria
        </div>

        <div className="hidden md:flex gap-10 text-white/70 text-sm">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#testimonials">Reviews</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 text-white/70 space-y-2">
          <a href="#home" className="block">Home</a>
          <a href="#features" className="block">Features</a>
          <a href="#testimonials" className="block">Reviews</a>
          <a href="#contact" className="block">Contact</a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center text-center relative overflow-hidden px-6 pt-28 pb-16"
    >
      <AnimatedBackground />

      <div className="relative max-w-6xl mx-auto">
        <div className="inline-flex items-center rounded-full bg-purple-500/10 border border-purple-500/20 px-5 py-2 text-sm mb-8">
          <Award className="h-4 w-4 mr-2 text-purple-400" />
          Locally Owned & Operated
        </div>

        <motion.h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-tight mb-6">
          <span className="bg-gradient-to-r from-purple-300 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Euphoria Jewelry
          </span>
          <br />
          <span className="text-white">
            Where Elegance Meets Accessibility
          </span>
        </motion.h1>

        <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto mb-12 leading-relaxed">
          Experience exceptional jewelry with full accessibility features,
          flexible service options, and personalized care in Lincoln, Nebraska.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5 mb-20">
          <button className="bg-purple-500 hover:bg-purple-600 px-10 py-5 rounded-full text-xl font-semibold transition">
            Shop Collection
          </button>

          <button className="border border-white/20 hover:bg-white/10 px-10 py-5 rounded-full text-xl font-semibold transition">
            Visit Store
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
          <div>
            <div className="text-5xl md:text-6xl font-bold text-purple-400">
              100%
            </div>
            <div className="text-lg text-white/70 mt-2">Accessible</div>
          </div>

          <div>
            <div className="text-5xl md:text-6xl font-bold text-purple-400">
              4+
            </div>
            <div className="text-lg text-white/70 mt-2">Service Options</div>
          </div>

          <div>
            <div className="text-5xl md:text-6xl font-bold text-purple-400">
              24/7
            </div>
            <div className="text-lg text-white/70 mt-2">Online Support</div>
          </div>

          <div>
            <div className="text-5xl md:text-6xl font-bold text-purple-400">
              5★
            </div>
            <div className="text-lg text-white/70 mt-2">Rated Service</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: Car, title: "Accessible", desc: "Fully wheelchair accessible store." },
  { icon: Store, title: "Service Options", desc: "Pickup, delivery, and in-store shopping." },
  { icon: CreditCard, title: "Payments", desc: "All major cards accepted." },
  { icon: Package, title: "Fast Service", desc: "Quick and efficient customer experience." },
  { icon: Award, title: "Local Business", desc: "Proudly locally owned and operated." },
];

function Features() {
  return (
    <section id="features" className="py-28 max-w-6xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-12">
        Why Choose Euphoria
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            <f.icon className="text-purple-400 mb-3" />
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-white/60 text-sm mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const data = [
    { name: "Sarah Johnson", text: "Beautiful jewelry and great service." },
    { name: "Michael Chen", text: "Perfect engagement ring experience." },
    { name: "Emily Davis", text: "My favorite jewelry store." },
  ];

  return (
    <section id="testimonials" className="py-28 max-w-6xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-12">
        What Customers Say
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {data.map((t, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex gap-1 text-yellow-400 mb-3">
              <Star size={16} />
              <Star size={16} />
              <Star size={16} />
              <Star size={16} />
              <Star size={16} />
            </div>
            <p className="text-white/70 mb-4">"{t.text}"</p>
            <p className="font-semibold">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-28 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-4xl font-bold mb-6">Visit Us Today</h2>

          <div className="space-y-4 text-white/60">
            <p className="flex gap-3 items-center">
              <MapPin className="text-purple-400" /> Lincoln, Nebraska
            </p>
            <p className="flex gap-3 items-center">
              <Phone className="text-purple-400" /> Call us anytime
            </p>
            <p className="flex gap-3 items-center">
              <Mail className="text-purple-400" /> support@euphoria.com
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4">Send Message</h3>

          <input
            className="w-full mb-3 p-3 bg-black/40 border border-white/10 rounded-lg outline-none focus:border-purple-400"
            placeholder="Name"
          />
          <input
            className="w-full mb-3 p-3 bg-black/40 border border-white/10 rounded-lg outline-none focus:border-purple-400"
            placeholder="Email"
          />
          <textarea
            className="w-full mb-3 p-3 bg-black/40 border border-white/10 rounded-lg outline-none focus:border-purple-400"
            rows="4"
            placeholder="Message"
          />

          <button className="w-full bg-purple-500 py-3 rounded-lg hover:bg-purple-600 transition">
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 border-t border-white/10 text-white/60">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold mb-2">Euphoria</h3>
          <p>Luxury jewelry in Lincoln, Nebraska.</p>
        </div>

        <div>
          <h4 className="text-white mb-2">Links</h4>
          <p>Home</p>
          <p>Features</p>
          <p>Contact</p>
        </div>

        <div>
          <h4 className="text-white mb-2">Services</h4>
          <p>Shopping</p>
          <p>Delivery</p>
          <p>Pickup</p>
        </div>

        <div>
          <h4 className="text-white mb-2">Social</h4>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>TikTok</p>
        </div>
      </div>

      <p className="text-center text-white/40 mt-10">
        © 2026 Euphoria Jewelry
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}