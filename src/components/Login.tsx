/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';

interface LoginProps {
  setView: (view: any) => void;
  onLogin: () => void;
}

export default function Login({ setView, onLogin }: LoginProps) {
  const [email, setEmail] = useState('admin@maya.ai');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@maya.ai' && password === 'password123') {
      onLogin();
    } else {
      setError('Invalid email or password. Use the demo credentials below.');
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl"
      >
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">M</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Log in to manage your Maya AI Receptionist
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-medium rounded-xl border border-red-100 dark:border-red-800">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none dark:text-white transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none dark:text-white transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500 dark:text-gray-400">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button type="button" className="font-medium text-orange-600 hover:text-orange-500">
                Forgot password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all shadow-lg shadow-orange-500/20"
          >
            Sign in
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="w-full inline-flex justify-center py-3 px-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              <Chrome className="w-5 h-5" />
            </button>
            <button className="w-full inline-flex justify-center py-3 px-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              <Github className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-900/20">
            <h4 className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider mb-2">Demo Credentials</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Email:</span> admin@maya.ai
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Password:</span> password123
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{' '}
          <button onClick={() => setView('register')} className="font-bold text-orange-600 hover:text-orange-500">
            Register now
          </button>
        </p>
      </motion.div>
    </div>
  );
}
