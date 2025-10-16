// FIX: Replaced placeholder content with a functional App component to resolve module errors.
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import CartPage from './components/CartPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { Page, Product, CartItem, User } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from the JSON file
    fetch('./products.json')
      .then(response => response.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [currentPage, category]);

  const handleNavigate = (page: Page, newCategory?: string) => {
    setCurrentPage(page);
    setCategory(newCategory || null);
    // If navigating to products without a category, clear any previous category
    if (page === Page.PRODUCTS && typeof newCategory === 'undefined') {
      setCategory(null);
    }
     // If navigating away from product page, clear search
    if (page !== Page.PRODUCTS) {
      setSearchQuery('');
      setActiveSearchQuery('');
    }
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const itemInCart = prevItems.find(item => item.id === product.id);
      if (itemInCart) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    // Maybe show a confirmation toast here in a real app
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    setCurrentPage(Page.CART);
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentPage(Page.HOME);
  };
  
  const handleRegister = (newUser: User) => {
    setUser(newUser);
    setCurrentPage(Page.HOME);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = () => {
    setActiveSearchQuery(searchQuery);
    setCurrentPage(Page.PRODUCTS);
    setCategory(null); // Clear category when performing a new search
  };


  const renderPage = () => {
    if (loading) {
      return <div className="flex justify-center items-center h-screen"><p className="text-2xl">جاري تحميل المنتجات...</p></div>;
    }

    switch (currentPage) {
      case Page.HOME:
        return <HomePage products={products} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} onNavigate={handleNavigate} />;
      case Page.PRODUCTS:
        return <ProductsPage products={products} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} searchQuery={activeSearchQuery} category={category} />;
      case Page.CART:
        return <CartPage cartItems={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveFromCart={handleRemoveFromCart} />;
      case Page.LOGIN:
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case Page.REGISTER:
        return <RegisterPage onRegister={handleRegister} onNavigate={handleNavigate} />;
      default:
        return <HomePage products={products} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} onNavigate={handleNavigate} />;
    }
  };

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50" dir="rtl">
      <Header 
        onNavigate={handleNavigate}
        cartItemCount={cartItemCount}
        user={user}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;