'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn, fetchUserProfile } from '@/lib/repo';
import { useAuthStore } from '@/lib/store/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const setUserId = useAuthStore((s) => s.setUserId);
  const setProfile = useAuthStore((s) => s.setProfile);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    try {
      setLoading(true);
      const { userId } = await signIn(email.trim(), password);
      const profile = await fetchUserProfile(userId);
      setProfile(profile);
      setUserId(userId);
      router.push('/quests');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: '#0a0a1a' }}>
      <div className="w-full max-w-[430px] min-h-screen flex flex-col">

        {/* Dark header */}
        <div className="px-6 pt-16 pb-8">
          <Link href="/welcome" className="inline-block mb-8 text-base" style={{ color: '#fbbf24' }}>
            ← Back
          </Link>
          <h1 className="text-white text-3xl font-bold">Welcome back</h1>
          <p className="mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Sign in to continue your journey
          </p>
        </div>

        {/* White card */}
        <div className="flex-1 bg-white rounded-t-3xl px-6 pt-10 pb-10">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">

            {error && (
              <div className="rounded-xl px-4 py-3 text-sm text-red-700 bg-red-50 border border-red-200">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#475569' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-amber-400"
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#0f172a',
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#475569' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-amber-400"
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#0f172a',
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl py-4 font-bold text-white text-base mt-2 transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-60 flex items-center justify-center"
              style={{ backgroundColor: '#4f46e5' }}
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>

            {/* Register link */}
            <p className="text-center mt-2" style={{ color: '#64748b' }}>
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-semibold" style={{ color: '#4f46e5' }}>
                Register
              </Link>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}
