'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../services/api';

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await registerUser(email, password);
      setSuccess(res?.message || 'User registered successfully');
      // after success, move user to login
      setTimeout(() => router.push('/login'), 800);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Registration failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>

      {error && (
        <div className="mb-4 p-3 border border-red-400 text-red-600 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <button
          className="text-blue-600 underline"
          onClick={() => router.push('/login')}
          type="button"
        >
          Login
        </button>
      </p>
    </div>
  );
}
