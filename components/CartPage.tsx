import React, { useState } from 'react';
import { CartItem } from '../types';
import TrashIcon from './icons/TrashIcon';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';
import { SHIPPING_COST, SAUDI_REGIONS, VALID_COUPONS } from '../constants';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, onUpdateQuantity, onRemoveFromCart }) => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = selectedRegion && cartItems.length > 0 ? SHIPPING_COST : 0;
  const total = subtotal - discount + shippingCost;

  const handleApplyCoupon = () => {
    const normalizedCode = couponCode.trim().toUpperCase();
    const coupon = VALID_COUPONS[normalizedCode];

    if(discount > 0) return;

    if (coupon) {
      let calculatedDiscount = 0;
      if (coupon.type === 'percentage') {
        calculatedDiscount = subtotal * coupon.value;
      }
      
      calculatedDiscount = Math.min(calculatedDiscount, subtotal); 
      setDiscount(calculatedDiscount);
      setCouponMessage(`تم تطبيق الكوبون بنجاح!`);
    } else {
      setDiscount(0);
      setCouponMessage('كود الكوبون غير صالح أو منتهي الصلاحية.');
    }
  };


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
                <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                        <span>المجموع الفرعي</span>
                        <span>{subtotal.toFixed(2)} ر.س</span>
                    </div>

                    <div className="border-t pt-4">
                        <label htmlFor="region" className="block text-md font-medium text-gray-700 mb-2">منطقة الشحن</label>
                        <select
                            id="region"
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                        >
                            <option value="">-- اختر منطقتك --</option>
                            {SAUDI_REGIONS.map(region => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-between text-lg">
                        <span>تكلفة الشحن</span>
                        <span>{shippingCost > 0 ? `${shippingCost.toFixed(2)} ر.س` : '---'}</span>
                    </div>

                    <div className="border-t pt-4">
                        <label htmlFor="coupon" className="block text-md font-medium text-gray-700 mb-2">كود الخصم</label>
                         <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                                type="text"
                                id="coupon"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="أدخل الكود هنا"
                                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-gray-500 focus:border-gray-500 sm:text-sm border-gray-300"
                                disabled={discount > 0}
                            />
                            <button
                                onClick={handleApplyCoupon}
                                disabled={discount > 0}
                                className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-l-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed"
                            >
                                تطبيق
                            </button>
                        </div>
                        {couponMessage && <p className={`mt-2 text-sm ${discount > 0 ? 'text-green-600' : 'text-red-600'}`}>{couponMessage}</p>}
                    </div>

                    {discount > 0 && (
                        <div className="flex justify-between text-lg text-green-600">
                            <span>الخصم</span>
                            <span>-{discount.toFixed(2)} ر.س</span>
                        </div>
                    )}
                </div>
                 <div className="border-t border-gray-200 my-4"></div>
                <div className="flex justify-between font-bold text-xl mb-6">
                    <span>المجموع الإجمالي</span>
                    <span>{total > 0 ? total.toFixed(2) : (0).toFixed(2)} ر.س</span>
                </div>
                <button className="w-full bg-gray-800 text-white py-3 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors duration-300 disabled:bg-gray-400" disabled={!selectedRegion}>
                    إتمام الشراء
                </button>
                {!selectedRegion && <p className="text-xs text-center text-red-500 mt-2">الرجاء اختيار منطقة الشحن للمتابعة.</p>}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;