// This file contains the initial/base products for the store.
// Products added via the product-entry-tool will be loaded from localStorage.
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'ثوب رجالي فاخر',
    price: 350.00,
    image: 'https://picsum.photos/seed/thobe/400/500',
    description: 'ثوب بتصميم عصري وأنيق مصنوع من أجود أنواع الأقمشة لراحة مطلقة.',
    category: 'رجالي',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['أبيض', 'كريمي'],
  },
  {
    id: 2,
    name: 'شماغ أحمر كلاسيكي',
    price: 120.00,
    image: 'https://picsum.photos/seed/shemagh/400/500',
    description: 'شماغ قطني 100% بنقشة مميزة يضيف لمسة من الأصالة لإطلالتك.',
    category: 'اكسسوار',
    sizes: ['مقاس واحد'],
    colors: ['أحمر', 'أبيض'],
  },
  {
    id: 3,
    name: 'فستان سهرة أنيق',
    price: 750.00,
    image: 'https://picsum.photos/seed/dress/400/500',
    description: 'فستان طويل بتطريز يدوي فاخر، مثالي للمناسبات الخاصة.',
    category: 'نسائي',
    sizes: ['S', 'M', 'L'],
    colors: ['أسود', 'ذهبي', 'فضي'],
  },
  {
    id: 4,
    name: 'عباية سوداء بتطريز ذهبي',
    price: 550.00,
    image: 'https://picsum.photos/seed/abaya/400/500',
    description: 'عباية عملية وأنيقة بقماش الكريب الفاخر مع تطريز ذهبي على الأكمام.',
    category: 'نسائي',
    sizes: ['مقاس واحد'],
    colors: ['أسود', 'ذهبي'],
  },
  {
    id: 5,
    name: 'تيشيرت قطني بشعار COR',
    price: 95.00,
    image: 'https://picsum.photos/seed/tshirt/400/500',
    description: 'تيشيرت أساسي ومريح مصنوع من القطن الناعم، متوفر بعدة ألوان.',
    category: 'للجنسين',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['أسود', 'أبيض', 'رمادي'],
  },
  {
    id: 6,
    name: 'بنطلون جينز عصري',
    price: 280.00,
    image: 'https://picsum.photos/seed/jeans/400/500',
    description: 'بنطلون جينز بقصة مريحة يناسب جميع إطلالاتك اليومية.',
    category: 'للجنسين',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['أزرق'],
  },
   {
    id: 7,
    name: 'جاكيت جلدي أنيق',
    price: 650.00,
    image: 'https://picsum.photos/seed/jacket/400/500',
    description: 'جاكيت من الجلد الطبيعي بتصميم كلاسيكي يضيف لمسة جريئة لمظهرك.',
    category: 'رجالي',
    sizes: ['M', 'L', 'XL'],
    colors: ['أسود', 'بني'],
  },
  {
    id: 8,
    name: 'بلوزة حريرية ناعمة',
    price: 320.00,
    image: 'https://picsum.photos/seed/blouse/400/500',
    description: 'بلوزة من الحرير الناعم بأكمام طويلة وقصة فضفاضة لمظهر أنثوي جذاب.',
    category: 'نسائي',
    sizes: ['S', 'M', 'L'],
    colors: ['أبيض', 'وردي'],
  },
  {
    id: 9,
    name: 'طقم ملابس أطفال قطني',
    price: 180.00,
    image: 'https://picsum.photos/seed/kids-set/400/500',
    description: 'طقم مريح وأنيق للأطفال مصنوع من القطن العضوي الناعم.',
    category: 'أطفال',
    sizes: ['S', 'M'],
    colors: ['أزرق', 'رمادي'],
  },
  {
    id: 10,
    name: 'فستان بناتي مورد',
    price: 220.00,
    image: 'https://picsum.photos/seed/kids-dress/400/500',
    description: 'فستان صيفي للبنات بنقشة زهور مبهجة وقماش خفيف.',
    category: 'أطفال',
    sizes: ['S', 'M', 'L'],
    colors: ['وردي', 'أبيض'],
  },
  {
    id: 11,
    name: 'محفظة جلدية كلاسيكية',
    price: 250.00,
    image: 'https://picsum.photos/seed/wallet/400/500',
    description: 'محفظة من الجلد الطبيعي بتصميم عملي وأنيق وعدة جيوب.',
    category: 'اكسسوار',
    sizes: ['مقاس واحد'],
    colors: ['أسود', 'بني'],
  },
  {
    id: 12,
    name: 'نظارة شمسية عصرية',
    price: 450.00,
    image: 'https://picsum.photos/seed/sunglasses/400/500',
    description: 'نظارة شمسية بإطار أنيق وعدسات توفر حماية كاملة من الأشعة فوق البنفسجية.',
    category: 'اكسسوار',
    sizes: ['مقاس واحد'],
    colors: ['أسود'],
  }
];

export const SHIPPING_COST = 50.00;

export const SAUDI_REGIONS = [
  'الرياض', 'مكة المكرمة', 'المدينة المنورة', 'القصيم', 
  'المنطقة الشرقية', 'عسير', 'تبوك', 'حائل', 
  'الحدود الشمالية', 'جازان', 'نجران', 'الباحة', 'الجوف'
];

interface Coupon {
  type: 'percentage' | 'flat';
  value: number;
}

export const VALID_COUPONS: { [key: string]: Coupon } = {
  'COR15': { type: 'percentage', value: 0.15 }, // 15% discount
};

export const ALL_SIZES = ['S', 'M', 'L', 'XL', 'XXL', 'مقاس واحد'];
export const ALL_COLORS = {
  'أبيض': '#FFFFFF',
  'كريمي': '#F5F5DC',
  'أحمر': '#DC2626',
  'أسود': '#000000',
  'ذهبي': '#FFD700',
  'فضي': '#C0C0C0',
  'رمادي': '#808080',
  'أزرق': '#3B82F6',
  'بني': '#A52A2A',
  'وردي': '#EC4899',
};