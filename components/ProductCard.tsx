
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-transform duration-300 hover:shadow-xl hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-xl font-bold text-gray-900 mb-4">{product.price.toFixed(2)} ر.س</p>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors duration-300"
        >
          أضف إلى السلة
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
