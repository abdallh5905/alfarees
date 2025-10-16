
import React from 'react';
import { CartItem } from '../types';
import TrashIcon from './icons/TrashIcon';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';


interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, onUpdateQuantity, onRemoveFromCart }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-6 py-12 min-h-[60vh]">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">سلة التسوق</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">سلتك فارغة.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-grow">
            <div className="bg-white shadow-md rounded-lg">
                <ul className="divide-y divide-gray-200">
                    {cartItems.map(item => (
                        <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center justify-between">
                            <div className="flex items-center mb-4 sm:mb-0">
                                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-md object-cover mr-6" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-gray-600">{item.price.toFixed(2)} ر.س</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6 space-x-reverse">
                                <div className="flex items-center border rounded-md">
                                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-2 text-gray-600 hover:bg-gray-100"><PlusIcon /></button>
                                    <span className="px-4 py-1">{item.quantity}</span>
                                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-2 text-gray-600 hover:bg-gray-100"><MinusIcon /></button>
                                </div>
                                <p className="font-bold w-24 text-center">{(item.price * item.quantity).toFixed(2)} ر.س</p>
                                <button onClick={() => onRemoveFromCart(item.id)} className="text-red-500 hover:text-red-700">
                                    <TrashIcon />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
          </div>
          <div className="lg:w-1/3">
             <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">ملخص الطلب</h2>
                <div className="flex justify-between mb-4 text-lg">
                    <span>المجموع الفرعي</span>
                    <span>{subtotal.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between mb-4 text-lg">
                    <span>الشحن</span>
                    <span>مجاني</span>
                </div>
                 <div className="border-t border-gray-200 my-4"></div>
                <div className="flex justify-between font-bold text-xl mb-6">
                    <span>المجموع الإجمالي</span>
                    <span>{subtotal.toFixed(2)} ر.س</span>
                </div>
                <button className="w-full bg-gray-800 text-white py-3 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors duration-300">
                    إتمام الشراء
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
