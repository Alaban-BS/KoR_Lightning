'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError(t('login.error.required', { defaultValue: 'Please enter your username' }));
      return;
    }
    
    // Set authentication in localStorage
    localStorage.setItem('authenticated', 'true');
    localStorage.setItem('username', username);
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>{t('login.title', { defaultValue: 'Login' })}</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="username">{t('login.username', { defaultValue: 'Username' })}</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            placeholder={t('login.usernamePlaceholder', { defaultValue: 'Enter your username' })}
          />
        </div>
        <button type="submit">{t('login.submit', { defaultValue: 'Login' })}</button>
      </form>
    </div>
  );
} 