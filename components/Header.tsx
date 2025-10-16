
import React from 'react';
import { Page, User } from '../types';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import UserIcon from './icons/UserIcon';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  cartItemCount: number;
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, cartItemCount, user, onLogout }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-3xl font-bold text-gray-800 cursor-pointer" onClick={() => onNavigate(Page.HOME)}>
          COR
        </div>
        <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(Page.HOME); }} className="text-gray-600 hover:text-gray-900 transition-colors">الرئيسية</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(Page.PRODUCTS); }} className="text-gray-600 hover:text-gray-900 transition-colors">المنتجات</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">من نحن</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">اتصل بنا</a>
        </nav>
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative cursor-pointer" onClick={() => onNavigate(Page.CART)}>
            <ShoppingCartIcon />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
          {user ? (
             <div className="relative group">
                <div className="cursor-pointer">
                    <UserIcon />
                </div>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible">
                    <div className="px-4 py-2 text-sm text-gray-700">مرحباً, {user.name}</div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">ملفي الشخصي</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">تسجيل الخروج</a>
                </div>
            </div>
          ) : (
            <div className="cursor-pointer" onClick={() => onNavigate(Page.LOGIN)}>
                <UserIcon />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
