import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onBuyNow }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-transform duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col">
      <div className="relative overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-4 text-center flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-xl font-bold text-gray-900">{product.price.toFixed(2)} ر.س</p>
        </div>
        <div className="flex space-x-2 space-x-reverse mt-4">
          <button
            onClick={() => onBuyNow(product)}
            className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors duration-300 text-sm font-semibold"
          >
            اشتر الآن
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-white text-gray-800 border border-gray-800 py-2 px-4 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors duration-300 text-sm font-semibold"
          >
            أضف إلى السلة
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;