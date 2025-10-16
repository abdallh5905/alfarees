
import React, { useState, useCallback } from 'react';
import { Page, Product, CartItem, User } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import CartPage from './components/CartPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { PRODUCTS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleAddToCart = useCallback((productToAdd: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...productToAdd, quantity: 1 }];
    });
  }, []);

  const handleUpdateQuantity = useCallback((productId: number, newQuantity: number) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const handleRemoveFromCart = useCallback((productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const handleLogin = useCallback((user: User) => {
    setCurrentUser(user);
    handleNavigate(Page.HOME);
  }, [handleNavigate]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    handleNavigate(Page.HOME);
  }, [handleNavigate]);

  const handleRegister = useCallback((user: User) => {
    setCurrentUser(user);
    handleNavigate(Page.HOME);
  }, [handleNavigate]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <HomePage onNavigate={handleNavigate} onAddToCart={handleAddToCart} />;
      case Page.PRODUCTS:
        return <ProductsPage products={PRODUCTS} onAddToCart={handleAddToCart} />;
      case Page.CART:
        return <CartPage cartItems={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveFromCart={handleRemoveFromCart} />;
      case Page.LOGIN:
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case Page.REGISTER:
        return <RegisterPage onRegister={handleRegister} onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <Header 
        onNavigate={handleNavigate} 
        cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        user={currentUser}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
