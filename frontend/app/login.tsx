'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from './services/api'; // API function to handle login

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const { access_token } = await login(email, password);
      localStorage.setItem('token', access_token);  // Store token in localStorage
      router.push('/cms/dashboard');  // Redirect to Admin CMS dashboard
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
