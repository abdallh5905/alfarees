
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">COR</h3>
            <p className="text-gray-400">
              أناقة تليق بك. وجهتك الأولى لأحدث الأزياء في المملكة العربية السعودية.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300 transition-colors">الرئيسية</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">المنتجات</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">شروط الخدمة</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
             <ul className="space-y-2 text-gray-400">
              <li>البريد الإلكتروني: support@cor.sa</li>
              <li>الهاتف: +966 11 123 4567</li>
              <li>الرياض، المملكة العربية السعودية</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">تابعنا</h3>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.716-2.011-4.415-2.011-3.336 0-6.024 2.688-6.024 6.024 0 .477.054.942.158 1.385-4.997-.25-9.428-2.643-12.39-6.284-.518.891-.814 1.932-.814 3.028 0 2.09.986 3.935 2.502 5.013-.92-.029-1.782-.283-2.538-.699v.076c0 2.917 2.075 5.352 4.832 5.904-.506.138-1.037.21-1.584.21-.387 0-.765-.038-1.134-.108.766 2.392 2.99 4.132 5.626 4.18-2.06 1.614-4.664 2.576-7.49 2.576-.488 0-.97-.028-1.444-.084 2.662 1.705 5.836 2.7 9.24 2.7 11.088 0 17.152-9.191 17.152-17.152 0-.262-.006-.523-.017-.783.982-.714 1.836-1.61 2.512-2.612z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c-4.04.022-4.48 0-6.06.07-1.58.072-2.68.34-3.64.73-.96.39-1.76.94-2.54 1.72s-1.33 1.58-1.72 2.54c-.39.96-.658 2.06-.73 3.64-.07 1.58-.048 2.02 0 6.06.022 4.04 0 4.48.07 6.06.072 1.58.34 2.68.73 3.64.39.96.94 1.76 1.72 2.54s1.58 1.33 2.54 1.72c.96.39 2.06.658 3.64.73 1.58.07 2.02.048 6.06 0 4.04-.022 4.48 0 6.06-.07 1.58-.072 2.68-.34 3.64-.73.96-.39 1.76-.94 2.54-1.72s1.33-1.58 1.72-2.54c.39-.96.658-2.06.73-3.64.07-1.58.048-2.02 0-6.06-.022-4.04 0-4.48-.07-6.06-.072-1.58-.34-2.68-.73-3.64-.39-.96-.94-1.76-1.72-2.54s-1.58-1.33-2.54-1.72c-.96-.39-2.06-.658-3.64-.73-1.58-.07-2.02-.048-6.06 0zm-2.15 5.51a.48.48 0 100 .96h4.29a.48.48 0 100-.96h-4.29zm-1.87 3.51a3.6 3.6 0 117.2 0 3.6 3.6 0 01-7.2 0zm3.6-2.4a2.4 2.4 0 100 4.8 2.4 2.4 0 000-4.8z" clipRule="evenodd"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} متجر COR. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
