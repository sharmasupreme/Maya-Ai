/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sun, Moon, Phone, LayoutDashboard, Home, Briefcase, Scale, UserPlus, LogIn } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setView: (view: any) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export default function Navbar({ currentView, setView, isDarkMode, toggleTheme, isAuthenticated, onLogout }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(isAuthenticated ? 'dashboard' : 'home')}>
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
            <span className="text-lg font-semibold tracking-tight dark:text-white">
              Maya <span className="text-orange-600">Restaurant</span>
            </span>
          </div>

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
              <>
                <button 
                  onClick={() => setView('login')}
                  className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
