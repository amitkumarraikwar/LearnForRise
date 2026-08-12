'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';
      const res = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: password.trim() }),
      });

      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem('lfr_admin_token', data.token);
        localStorage.setItem('lfr_admin_user', JSON.stringify(data.user));
        router.push('/admin');
      } else {
        setError(data.message || 'Invalid Username or Password');
      }
    } catch (err) {
      setError('Unable to connect to authentication server. Check connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-[#0F9D6E] shadow-sm">
            <Image
              src="/logo.jpg"
              alt="LearnForRise Logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-[var(--text-main)] tracking-tight">
            Admin <span className="text-[#0F9D6E] dark:text-[#10B981]">Authentication</span>
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Sign in to access the LearnForRise management portal
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E]"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-[#0F9D6E]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] font-semibold"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#0F9D6E] text-white font-semibold text-xs sm:text-sm shadow-md hover:opacity-90 disabled:opacity-50 transition-opacity mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to Admin Panel'}
          </button>
        </form>

        {/* Credentials Notice Box */}
        <div className="p-3.5 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[11px] text-[var(--text-muted)] leading-relaxed space-y-1 text-center">
          <p className="font-semibold text-[var(--text-main)]">Default Credentials:</p>
          <p>Username: <strong className="text-[#0F9D6E]">admin</strong></p>
          <p>Password: <strong className="text-[#0F9D6E]">admin12345</strong></p>
        </div>
      </div>
    </div>
  );
}
