// FIX: Replaced placeholder content with a functional HomePage component to resolve module errors.
import React from 'react';
import { Product, Page } from '../types';
import ProductCard from './ProductCard';

interface HomePageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onNavigate: (page: Page, category?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, onAddToCart, onBuyNow, onNavigate }) => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800">مجموعة الشتاء الجديدة</h1>
          <p className="mt-4 text-lg text-gray-600">اكتشف أحدث التصاميم التي تجمع بين الدفء والأناقة.</p>
          <button
            onClick={() => onNavigate(Page.PRODUCTS)}
            className="mt-8 bg-gray-800 text-white py-3 px-8 rounded-md hover:bg-gray-700 transition-colors duration-300 font-semibold"
          >
            تسوق الآن
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">تسوق حسب الفئة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div onClick={() => onNavigate(Page.PRODUCTS, 'رجالي')} className="relative rounded-lg overflow-hidden cursor-pointer group">
            <img src="https://images.unsplash.com/photo-1488161628813-04466f872d24?q=80&w=2070&auto=format&fit=crop" alt="Men's Collection" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-3xl font-bold">ملابس رجالي</h3>
            </div>
          </div>
          <div onClick={() => onNavigate(Page.PRODUCTS, 'نسائي')} className="relative rounded-lg overflow-hidden cursor-pointer group">
            <img src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1887&auto=format&fit=crop" alt="Women's Collection" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-3xl font-bold">ملابس حريمي</h3>
            </div>
          </div>
          <div onClick={() => onNavigate(Page.PRODUCTS, 'اكسسوار')} className="relative rounded-lg overflow-hidden cursor-pointer group">
            <img src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop" alt="Accessories" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-3xl font-bold">اكسسوارات</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">المنتجات المميزة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onBuyNow={onBuyNow} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
