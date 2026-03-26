/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, Database, Settings, LayoutDashboard, Zap, Globe, ShieldCheck } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Phone className="w-8 h-8 text-orange-600" />,
      title: "Table Reservations",
      desc: "Maya handles all incoming booking requests, managing your floor capacity in real-time without human intervention."
    },
    {
      icon: <Database className="w-8 h-8 text-blue-600" />,
      title: "Menu Guidance",
      desc: "Train Maya on your full menu, including ingredients, allergens, and daily specials to assist curious diners."
    },
    {
      icon: <LayoutDashboard className="w-8 h-8 text-green-600" />,
      title: "Live Table Tracking",
      desc: "Maya stays updated with your dashboard, knowing exactly which tables are Available, Taken, or Reserved."
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      title: "Event Bookings",
      desc: "Automate inquiries for large parties, private dining rooms, and special celebrations like birthdays or weddings."
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-600" />,
      title: "Cultural Hospitality",
      desc: "A warm 'Namaste' in Nepali or a professional greeting in English—Maya adapts to every guest's preference."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-red-600" />,
      title: "Guest Feedback",
      desc: "Maya can collect post-dining feedback and record special requests for a guest's next visit."
    }
  ];

  return (
    <div className="w-full pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">Restaurant Services</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Maya provides a specialized suite of hospitality features designed to streamline your restaurant's front-of-house.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.02 }}
            className="p-10 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="mb-8 p-5 bg-gray-50 dark:bg-gray-900 rounded-3xl inline-block">
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 bg-orange-600 rounded-[3rem] p-12 md:p-20 text-white text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Transform Your Reception?</h2>
        <p className="text-orange-100 max-w-2xl mx-auto mb-12 text-lg">
          Join hundreds of Nepali businesses that are already using Maya to improve their customer service and operational efficiency.
        </p>
        <button className="bg-white text-orange-600 px-10 py-4 rounded-2xl font-bold hover:bg-orange-50 transition-all shadow-lg">
          Get Started Now
        </button>
      </div>
    </div>
  );
}
