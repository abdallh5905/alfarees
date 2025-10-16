
import React, { useState } from 'react';
import { Page, User } from '../types';

interface RegisterPageProps {
  onRegister: (user: User) => void;
  onNavigate: (page: Page) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("كلمتا المرور غير متطابقتين!");
      return;
    }
    const newUser: User = { id: Date.now(), name, email };
    onRegister(newUser);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            إنشاء حساب جديد
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">الاسم الكامل</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="الاسم الكامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address-reg" className="sr-only">البريد الإلكتروني</label>
              <input
                id="email-address-reg"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password-reg" className="sr-only">كلمة المرور</label>
              <input
                id="password-reg"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
             <div>
              <label htmlFor="confirm-password" className="sr-only">تأكيد كلمة المرور</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="تأكيد كلمة المرور"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              إنشاء حساب
            </button>
          </div>
        </form>
         <div className="text-sm text-center">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(Page.LOGIN); }} className="font-medium text-gray-600 hover:text-gray-500">
                لديك حساب بالفعل؟ سجل الدخول
            </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
