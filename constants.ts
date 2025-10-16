// FIX: Replaced placeholder content with actual constant definitions.
import { Product } from './types';

// Sizes for product filters
export const ALL_SIZES: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// Colors for product filters
export const ALL_COLORS: { [key: string]: string } = {
  'أسود': '#000000',
  'أبيض': '#FFFFFF',
  'رمادي': '#808080',
  'أحمر': '#FF0000',
  'أزرق': '#0000FF',
  'أخضر': '#008000',
  'أصفر': '#FFFF00',
  'بيج': '#F5F5DC',
};

// Shipping cost
export const SHIPPING_COST = 25.00;

// List of Saudi regions for shipping
export const SAUDI_REGIONS: string[] = [
  'الرياض',
  'مكة المكرمة',
  'المدينة المنورة',
  'القصيم',
  'الشرقية',
  'عسير',
  'تبوك',
  'حائل',
  'الحدود الشمالية',
  'جازان',
  'نجران',
  'الباحة',
  'الجوف',
];

// Valid coupon codes
export const VALID_COUPONS: { [key: string]: { type: 'percentage'; value: number } } = {
  'SAVE10': { type: 'percentage', value: 0.10 },
  'COR20': { type: 'percentage', value: 0.20 },
};
