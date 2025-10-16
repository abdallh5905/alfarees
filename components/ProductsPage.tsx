
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductsPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products, onAddToCart }) => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">جميع المنتجات</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
