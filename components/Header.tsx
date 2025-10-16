import React, { useState } from 'react';
import { Page, User } from '../types';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import UserIcon from './icons/UserIcon';

interface HeaderProps {
  onNavigate: (page: Page, category?: string) => void;
  cartItemCount: number;
  user: User | null;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, cartItemCount, user, onLogout, searchQuery, onSearchChange, onSearchSubmit }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isClothingSubMenuOpen, setIsClothingSubMenuOpen] = useState(false);

    const handleSearchFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearchSubmit();
        setIsMobileMenuOpen(false);
    };

    const handleMobileLinkClick = (page: Page, category?: string) => {
        onNavigate(page, category);
        setIsMobileMenuOpen(false);
        setIsClothingSubMenuOpen(false);
    };
  
    return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-3xl font-bold text-gray-800 cursor-pointer" onClick={() => onNavigate(Page.HOME)}>
          COR
        </div>

        {/* --- Desktop Navigation --- */}
        <div className="hidden md:flex flex-1 items-center justify-center">
            <nav className="flex items-center space-x-8 space-x-reverse">
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(Page.HOME); }} className="text-gray-600 hover:text-gray-900 transition-colors">الرئيسية</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(Page.PRODUCTS); }} className="text-gray-600 hover:text-gray-900 transition-colors">كل المنتجات</a>
              
              <div className="relative group">
                <button className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none">
                  الملابس
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible">
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(Page.PRODUCTS, 'رجالي'); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">ملابس رجالي</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(Page.PRODUCTS, 'نسائي'); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">ملابس حريمي</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(Page.PRODUCTS, 'أطفال'); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">ملابس أطفال</a>
                </div>
              </div>

              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(Page.PRODUCTS, 'اكسسوار'); }} className="text-gray-600 hover:text-gray-900 transition-colors">اكسسوارات</a>
            </nav>
            <div className="flex-1 max-w-xs lg:max-w-sm ml-8">
                <form onSubmit={handleSearchFormSubmit}>
                     <input
                        type="search"
                        placeholder="ابحث عن منتج..."
                        className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </form>
            </div>
        </div>
        {/* --- End Desktop Navigation --- */}


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
          {/* --- Mobile Menu Button --- */}
          <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-gray-800 focus:outline-none" aria-label="Toggle menu">
                {isMobileMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                )}
              </button>
          </div>
        </div>
      </div>
      
      {/* --- Mobile Menu Dropdown --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
            <div className="p-4">
               <form onSubmit={handleSearchFormSubmit}>
                    <input
                        type="search"
                        placeholder="ابحث عن منتج..."
                        className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </form>
            </div>
            <nav className="flex flex-col pb-4">
                <a href="#" onClick={(e) => { e.preventDefault(); handleMobileLinkClick(Page.HOME); }} className="px-6 py-3 text-gray-700 hover:bg-gray-100">الرئيسية</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleMobileLinkClick(Page.PRODUCTS); }} className="px-6 py-3 text-gray-700 hover:bg-gray-100">كل المنتجات</a>
                <div>
                    <button onClick={() => setIsClothingSubMenuOpen(!isClothingSubMenuOpen)} className="w-full flex justify-between items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
                        <span>الملابس</span>
                        <svg className={`w-5 h-5 transition-transform duration-300 ${isClothingSubMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {isClothingSubMenuOpen && (
                        <div className="bg-gray-50">
                            <a href="#" onClick={(e) => { e.preventDefault(); handleMobileLinkClick(Page.PRODUCTS, 'رجالي'); }} className="block pr-10 pl-6 py-3 text-sm text-gray-700 hover:bg-gray-200">ملابس رجالي</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleMobileLinkClick(Page.PRODUCTS, 'نسائي'); }} className="block pr-10 pl-6 py-3 text-sm text-gray-700 hover:bg-gray-200">ملابس حريمي</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleMobileLinkClick(Page.PRODUCTS, 'أطفال'); }} className="block pr-10 pl-6 py-3 text-sm text-gray-700 hover:bg-gray-200">ملابس أطفال</a>
                        </div>
                    )}
                </div>
                <a href="#" onClick={(e) => { e.preventDefault(); handleMobileLinkClick(Page.PRODUCTS, 'اكسسوار'); }} className="px-6 py-3 text-gray-700 hover:bg-gray-100">اكسسوارات</a>
            </nav>
        </div>
      )}

    </header>
  );
};

export default Header;