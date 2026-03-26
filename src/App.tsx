/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import MayaLive from './components/MayaLive';
import Configuration from './components/Configuration';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Services from './components/Services';
import Comparison from './components/Comparison';
import Login from './components/Login';
import Register from './components/Register';
import Preloader from './components/Preloader';
import { BusinessConfig, DEFAULT_CONFIG } from './types';

type View = 'home' | 'services' | 'comparison' | 'reception' | 'dashboard' | 'configuration' | 'login' | 'register';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('is_authenticated') === 'true';
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [config, setConfig] = useState<BusinessConfig>(() => {
    const saved = localStorage.getItem('maya_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_CONFIG, ...parsed };
      } catch (e) {
        console.error("Failed to parse saved config", e);
      }
    }
    return DEFAULT_CONFIG;
  });

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // View change preloader
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [view]);

  // Enforce Dashboard-only for authenticated users
  useEffect(() => {
    if (isAuthenticated && ['home', 'services', 'comparison', 'login', 'register'].includes(view)) {
      setView('dashboard');
    }
  }, [isAuthenticated, view]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('is_authenticated', 'true');
    setView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('is_authenticated');
    setView('home');
  };

  const handleSaveConfig = (newConfig: BusinessConfig) => {
    setConfig(newConfig);
    localStorage.setItem('maya_config', JSON.stringify(newConfig));
    setView('reception');
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const renderView = () => {
    switch (view) {
      case 'home':
        return <Home setView={setView} />;
      case 'services':
        return <Services />;
      case 'comparison':
        return <Comparison />;
      case 'login':
        return <Login setView={setView} onLogin={handleLogin} />;
      case 'register':
        return <Register setView={setView} onRegister={handleLogin} />;
      case 'reception':
        return (
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-24 pb-16 px-4">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-[10px] font-bold uppercase tracking-wider rounded-full">
                Active for: {config.name}
              </div>
              <h2 className="text-5xl md:text-6xl font-semibold leading-[1.1] text-gray-900 dark:text-white">
                Your Personal <br />
                <span className="text-gray-400 dark:text-gray-500">Nepali Restaurant Host.</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-md mx-auto lg:mx-0">
                {config.description} Maya is trained on your specific business data and ready to assist your customers.
              </p>
              
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">{(config.services || []).length}</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">Services</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">{(config.faq || []).length}</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">Knowledge Base</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">24/7</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">Availability</div>
                </div>
              </div>
            </div>
            <MayaLive config={config} setView={setView} isAuthenticated={isAuthenticated} />
          </div>
        );
      case 'dashboard':
        return (
          <div className="pt-24 pb-16 px-4 w-full flex justify-center">
            <Dashboard setView={setView} />
          </div>
        );
      default:
        return <Home setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a] transition-colors font-sans">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      <Navbar 
        currentView={view} 
        setView={setView} 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      
      <main className="w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              {renderView()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {!isAuthenticated && (
        <footer className="w-full max-w-7xl mx-auto px-4 py-12 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
            <span className="text-lg font-semibold tracking-tight dark:text-white">
              Maya <span className="text-orange-600">Restaurant</span>
            </span>
          </div>
          <div className="text-gray-400 text-[10px] uppercase tracking-widest">
            Powered by SupremeCreates. Restaurant Mode
          </div>
          <div className="flex gap-8 text-gray-500 dark:text-gray-400 text-xs">
            <button className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</button>
          </div>
        </footer>
      )}
    </div>
  );
}
