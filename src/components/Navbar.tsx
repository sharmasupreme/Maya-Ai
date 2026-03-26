/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sun, Moon, Phone, LayoutDashboard, Home, Briefcase, Scale, UserPlus, LogIn, Menu, X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentView: string;
  setView: (view: any) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export default function Navbar({ currentView, setView, isDarkMode, toggleTheme, isAuthenticated, onLogout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (view: any) => {
    setView(view);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick(isAuthenticated ? 'dashboard' : 'home')}>
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
            <span className="text-lg font-semibold tracking-tight dark:text-white">
              Maya <span className="text-orange-600">Restaurant</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {!isAuthenticated ? (
              <>
                <button 
                  onClick={() => setView('home')}
                  className={`text-sm font-medium transition-colors ${currentView === 'home' ? 'text-orange-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                >
                  Home
                </button>
                <button 
                  onClick={() => setView('services')}
                  className={`text-sm font-medium transition-colors ${currentView === 'services' ? 'text-orange-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                >
                  Services
                </button>
                <button 
                  onClick={() => setView('comparison')}
                  className={`text-sm font-medium transition-colors ${currentView === 'comparison' ? 'text-orange-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                >
                  AI vs Human
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setView('dashboard')}
                  className={`text-sm font-medium transition-colors ${currentView === 'dashboard' ? 'text-orange-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setView('reception')}
                  className={`text-sm font-medium transition-colors ${currentView === 'reception' ? 'text-orange-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                >
                  Try Maya
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />
            
            {isAuthenticated ? (
              <button 
                onClick={onLogout}
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-4">
                <button 
                  onClick={() => setView('login')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
                <button 
                  onClick={() => setView('register')}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors shadow-sm"
                >
                  Register
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {!isAuthenticated ? (
                <>
                  <button onClick={() => handleNavClick('home')} className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300">Home</button>
                  <button onClick={() => handleNavClick('services')} className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300">Services</button>
                  <button onClick={() => handleNavClick('comparison')} className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300">AI vs Human</button>
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
                    <button onClick={() => handleNavClick('login')} className="flex items-center gap-2 px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300">
                      <LogIn className="w-4 h-4" /> Login
                    </button>
                    <button onClick={() => handleNavClick('register')} className="w-full bg-orange-600 text-white px-4 py-3 rounded-xl text-center font-bold">Register</button>
                  </div>
                </>
              ) : (
                <>
                  <button onClick={() => handleNavClick('dashboard')} className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300">Dashboard</button>
                  <button onClick={() => handleNavClick('reception')} className="block w-full text-left px-4 py-2 text-base font-medium text-orange-600 font-bold">Try Maya</button>
                  <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-base font-medium text-red-600">Logout</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
