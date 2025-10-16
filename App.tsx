import React, { useState, useCallback, useEffect } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [allProducts, setAllProducts] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    // Load products from localStorage and merge with initial products
    try {
      const customProductsJSON = localStorage.getItem('customCorProducts');
      if (customProductsJSON) {
        const customProducts: Product[] = JSON.parse(customProductsJSON);
        // Combine and remove duplicates, giving precedence to custom products if IDs clash
        const combined = [...PRODUCTS];
        const productIds = new Set(PRODUCTS.map(p => p.id));

        for (const customProduct of customProducts) {
          if (!productIds.has(customProduct.id)) {
            combined.push(customProduct);
            productIds.add(customProduct.id);
          }
        }
        setAllProducts(combined);
      }
    } catch (error) {
      console.error("Failed to load custom products from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (toastMessage) {
        const timer = setTimeout(() => {
            setToastMessage('');
        }, 3000); // Toast disappears after 3 seconds
        return () => clearTimeout(timer); // Cleanup timer
    }
  }, [toastMessage]);


  const handleNavigate = useCallback((page: Page, category?: string) => {
    setCurrentPage(page);
     if (page === Page.PRODUCTS) {
        setCategoryFilter(category || null);
        setSearchQuery(''); // Reset search when navigating via categories
    } else {
        setCategoryFilter(null);
    }
    window.scrollTo(0, 0);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    setCategoryFilter(null); // Clear category filter when searching
    handleNavigate(Page.PRODUCTS);
  }, [handleNavigate]);
  
  const addItemToCartLogic = (productToAdd: Product, prevItems: CartItem[]): CartItem[] => {
    const existingItem = prevItems.find(item => item.id === productToAdd.id);
    if (existingItem) {
        return prevItems.map(item =>
            item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
    }
    return [...prevItems, { ...productToAdd, quantity: 1 }];
  };

  const handleAddToCart = useCallback((productToAdd: Product) => {
    setCartItems(prevItems => addItemToCartLogic(productToAdd, prevItems));
    setToastMessage(`تمت إضافة "${productToAdd.name}" إلى السلة!`);
  }, []);

  const handleBuyNow = useCallback((productToBuy: Product) => {
    setCartItems(prevItems => addItemToCartLogic(productToBuy, prevItems));
    handleNavigate(Page.CART);
  }, [handleNavigate]);

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
        return <HomePage products={allProducts} onNavigate={handleNavigate} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />;
      case Page.PRODUCTS:
        return <ProductsPage products={allProducts} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} searchQuery={searchQuery} category={categoryFilter} />;
      case Page.CART:
        return <CartPage cartItems={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveFromCart={handleRemoveFromCart} />;
      case Page.LOGIN:
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case Page.REGISTER:
        return <RegisterPage onRegister={handleRegister} onNavigate={handleNavigate} />;
      default:
        return <HomePage products={allProducts} onNavigate={handleNavigate} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />;
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <Header 
        onNavigate={handleNavigate} 
        cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        user={currentUser}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      
      {toastMessage && (
        <div 
            key={Date.now()}
            className="fixed top-24 right-6 bg-green-600 text-white py-3 px-6 rounded-lg shadow-xl z-50 animate-fade-in-out"
        >
            <p>{toastMessage}</p>
        </div>
      )}
    </div>
  );
};

export default App;