import React from 'react';
import { Page, Product } from '../types';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

interface HomePageProps {
  onNavigate: (page: Page, category?: string) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onAddToCart, onBuyNow }) => {
    const featuredProducts = PRODUCTS.slice(0, 4);

    const categories = [
        {
            name: 'ملابس رجالية',
            image: 'https://picsum.photos/seed/men-category/500/500',
            categoryKey: 'رجالي',
        },
        {
            name: 'ملابس نسائية',
            image: 'https://picsum.photos/seed/women-category/500/500',
            categoryKey: 'نسائي',
        },
        {
            name: 'ملابس أطفال',
            image: 'https://picsum.photos/seed/kids-category/500/500',
            categoryKey: 'أطفال',
        },
        {
            name: 'اكسسوارات',
            image: 'https://picsum.photos/seed/acc-category/500/500',
            categoryKey: 'اكسسوار',
        },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-[60vh] text-white flex items-center"
                style={{ backgroundImage: `url('https://picsum.photos/seed/fashion-hero/1920/1080')` }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="container mx-auto px-6 text-center z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">تشكيلة الشتاء الجديدة</h1>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                        اكتشف أحدث تصاميمنا التي تجمع بين الأناقة والدفء لموسم لا يُنسى.
                    </p>
                    <button
                        onClick={() => onNavigate(Page.PRODUCTS)}
                        className="bg-white text-gray-900 font-bold py-3 px-8 rounded-md hover:bg-gray-200 transition-transform duration-300 transform hover:scale-105"
                    >
                        تسوق الآن
                    </button>
                </div>
            </section>
            
            {/* Categories Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">تسوق حسب القسم</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((cat) => (
                            <div
                                key={cat.name}
                                onClick={() => onNavigate(Page.PRODUCTS, cat.categoryKey)}
                                className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer h-64"
                            >
                                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-50">
                                    <h3 className="text-white text-2xl font-bold text-center p-2">{cat.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">المنتجات المميزة</h2>
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