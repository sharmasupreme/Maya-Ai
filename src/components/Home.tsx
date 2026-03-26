/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Phone, CheckCircle, Clock, Globe, Zap, Users, ShieldCheck, ArrowRight } from 'lucide-react';

interface HomeProps {
  setView: (view: any) => void;
}

export default function Home({ setView }: HomeProps) {
  return (
    <div className="w-full pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center gap-12 mb-24">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 space-y-8 text-center lg:text-left"
        >
          <div className="inline-block px-4 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold uppercase tracking-wider rounded-full">
            The Future of Restaurant Hospitality
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] text-gray-900 dark:text-white">
            Maya: Your AI <br />
            <span className="text-orange-600">Restaurant Host.</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Welcome your guests with Maya, the first AI receptionist specifically trained for Nepali restaurants. 
            She handles table bookings, menu inquiries, and reservations with a warm "Namaste" 24/7.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => setView('reception')}
              className="flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-500/20"
            >
              <Phone className="w-5 h-5" />
              Try Maya Live
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800 aspect-[4/3]">
            <img 
              src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=800" 
              alt="AI Female Robot Host answering a call" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
        </motion.div>
      </section>

      {/* Why AI? Section */}
      <section className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Maya for Your Restaurant?</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            In the busy world of dining, human hosts can get overwhelmed. Maya ensures every guest is greeted and every table is managed perfectly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Clock className="w-8 h-8 text-blue-500" />,
              title: "Never Miss a Booking",
              desc: "Maya handles reservations at any hour, ensuring your tables are always filled and your guests are always heard."
            },
            {
              icon: <Globe className="w-8 h-8 text-green-500" />,
              title: "Multilingual Welcome",
              desc: "Whether your guests speak Nepali or English, Maya greets them with cultural warmth and linguistic precision."
            },
            {
              icon: <Zap className="w-8 h-8 text-orange-500" />,
              title: "Instant Menu Guidance",
              desc: "Maya can explain your specials, ingredients, and dietary options instantly from your custom menu database."
            },
            {
              icon: <Users className="w-8 h-8 text-purple-500" />,
              title: "Handle Peak Hours",
              desc: "During the dinner rush, Maya can handle dozens of calls simultaneously, taking the pressure off your floor staff."
            },
            {
              icon: <ShieldCheck className="w-8 h-8 text-red-500" />,
              title: "Professional & Polite",
              desc: "Maya is always patient and welcoming, maintaining your restaurant's high standards of hospitality on every call."
            },
            {
              icon: <CheckCircle className="w-8 h-8 text-teal-500" />,
              title: "Smart Table Management",
              desc: "Maya stays synced with your live dashboard, knowing exactly which tables are available for walk-ins or bookings."
            }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ideas Section */}
      <section className="mb-24 bg-gray-900 dark:bg-gray-950 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Elevate Your <br />
              <span className="text-orange-500">Dining Experience.</span>
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Table Reservations</h4>
                  <p className="text-gray-400 text-sm">Automate bookings for individuals, families, or large corporate groups.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Menu Inquiries</h4>
                  <p className="text-gray-400 text-sm">Let Maya explain your signature dishes and today's special Nepali thali.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Event Hosting</h4>
                  <p className="text-gray-400 text-sm">Handle inquiries for parties, weddings, and private dining room availability.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400" alt="Fine Dining" className="rounded-2xl shadow-lg transform translate-y-8" referrerPolicy="no-referrer" />
            <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=400" alt="Restaurant Interior" className="rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
          </div>
        </div>
        {/* Abstract background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/10 skew-x-12 transform translate-x-1/4" />
      </section>
    </div>
  );
}
