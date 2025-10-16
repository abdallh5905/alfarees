import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import FiltersSidebar from './FiltersSidebar';
import { ALL_SIZES, ALL_COLORS } from '../constants';

interface ProductsPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  searchQuery: string;
  category: string | null;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products, onAddToCart, onBuyNow, searchQuery, category }) => {
  const [filters, setFilters] = useState({
    price: 1000,
    sizes: [] as string[],
    colors: [] as string[],
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  const handleClearFilters = () => {
    setFilters({
      price: 1000,
      sizes: [],
      colors: [],
    });
  };

  const getPageTitle = () => {
    if (searchQuery) return `نتائج البحث عن: "${searchQuery}"`;
    if (category) {
      const categoryMap: { [key: string]: string } = {
        'رجالي': 'قسم الملابس الرجالية',
        'نسائي': 'قسم الملابس النسائية',
        'أطفال': 'قسم ملابس الأطفال',
        'اكسسوار': 'قسم الاكسسوارات',
        'للجنسين': 'قسم للرجال والنساء',
      };
      return categoryMap[category] || `قسم ${category}`;
    }
    return 'جميع المنتجات';
  };

  const filteredProducts = useMemo(() => {
    return products
    .filter(product => { // Category filter
      if (!category) return true;
      if (category === 'للجنسين') return product.category === 'للجنسين';
      if (product.category === 'للجنسين') return true;
      return product.category === category;
    })
    .filter(product => // Search filter
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(product => // Price filter
      product.price <= filters.price
    )
    .filter(product => // Size filter
      filters.sizes.length === 0 || filters.sizes.some(size => product.sizes.includes(size))
    )
    .filter(product => // Color filter
      filters.colors.length === 0 || filters.colors.some(color => product.colors.includes(color))
    );
  }, [products, category, searchQuery, filters]);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        {getPageTitle()}
      </h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2-reverse space-x-2 bg-white p-3 rounded-lg shadow-md border hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          aria-controls="filters-sidebar"
          aria-expanded={showFilters}
        >
          <svg xmlns="http://www.w.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 12h10M11 20h2" />
          </svg>
          <span className="font-semibold text-gray-700">{showFilters ? 'إخفاء الفلاتر' : 'عرض الفلاتر'}</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {showFilters && (
          <aside id="filters-sidebar" className="lg:col-span-1">
            <FiltersSidebar 
              allSizes={ALL_SIZES}
              allColors={ALL_COLORS}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </aside>
        )}

        <main className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4 col-span-1'}>
          {filteredProducts.length > 0 ? (
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${showFilters ? 'xl:grid-cols-3' : 'xl:grid-cols-4'} gap-8`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onBuyNow={onBuyNow} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-white rounded-lg shadow-md p-8">
                 <p className="text-center text-gray-600 text-2xl font-semibold">عذراً، لا توجد منتجات تطابق بحثك.</p>
                 <p className="text-center text-gray-500 text-lg mt-2">حاول تعديل الفلاتر أو مسحها لرؤية المزيد.</p>
                 <button 
                    onClick={handleClearFilters} 
                    className="mt-6 bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition-colors"
                >
                    مسح جميع الفلاتر
                </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;