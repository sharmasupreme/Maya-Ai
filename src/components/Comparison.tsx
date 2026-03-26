/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Check, X, Users, Zap, Clock, Globe, ShieldCheck, DollarSign } from 'lucide-react';

export default function Comparison() {
  const comparisonData = [
    {
      feature: "Availability",
      ai: "24/7, 365 days a year. No breaks, no holidays.",
      human: "Limited to business hours. Requires shifts and breaks.",
      icon: <Clock className="w-5 h-5" />
    },
    {
      feature: "Language Support",
      ai: "Fluent in Nepali & English instantly. No training needed.",
      human: "Depends on individual skills. May require specific hiring.",
      icon: <Globe className="w-5 h-5" />
    },
    {
      feature: "Response Time",
      ai: "Instant. Answers multiple calls simultaneously.",
      human: "Requires 'please hold'. One call at a time.",
      icon: <Zap className="w-5 h-5" />
    },
    {
      feature: "Consistency",
      ai: "100% consistent. Always follows guidelines perfectly.",
      human: "Varies with mood, fatigue, and personal factors.",
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      feature: "Cost",
      ai: "Low monthly subscription. No benefits or overhead.",
      human: "High salary, insurance, benefits, and training costs.",
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      feature: "Scalability",
      ai: "Instantly scales to handle 100s of calls.",
      human: "Requires hiring and training more staff.",
      icon: <Users className="w-5 h-5" />
    }
  ];

  return (
    <div className="w-full pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">AI vs Human Receptionist</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Compare the efficiency, cost, and reliability of Maya against traditional human-led reception.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="py-6 px-4 text-sm font-bold uppercase tracking-wider text-gray-400">Feature</th>
              <th className="py-6 px-4 text-lg font-bold text-orange-600">Maya AI Agent</th>
              <th className="py-6 px-4 text-lg font-bold text-gray-900 dark:text-white">Human Receptionist</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {comparisonData.map((row, idx) => (
              <motion.tr 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
              >
                <td className="py-8 px-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400">
                      {row.icon}
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">{row.feature}</span>
                  </div>
                </td>
                <td className="py-8 px-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{row.ai}</span>
                  </div>
                </td>
                <td className="py-8 px-4">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{row.human}</span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">The Verdict</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            While human receptionists bring a personal touch, Maya provides the reliability and efficiency that modern businesses need to scale. 
            By automating routine inquiries, you free up your human staff to handle complex tasks that require emotional intelligence and nuanced decision-making.
          </p>
          <div className="p-6 bg-orange-50 dark:bg-orange-900/10 rounded-3xl border border-orange-100 dark:border-orange-900/30">
            <h4 className="font-bold text-orange-700 dark:text-orange-400 mb-2">Hybrid Approach</h4>
            <p className="text-sm text-orange-600 dark:text-orange-300">
              Many businesses use Maya as the first line of defense, handling 80% of routine calls and only escalating complex issues to humans.
            </p>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img src="https://picsum.photos/seed/compare/800/600" alt="Comparison" className="w-full h-auto" referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>
  );
}
