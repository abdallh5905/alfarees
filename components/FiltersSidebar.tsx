import React from 'react';

interface Filters {
  price: number;
  sizes: string[];
  colors: string[];
}

interface FiltersSidebarProps {
  allSizes: string[];
  allColors: { [key: string]: string };
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
  onClearFilters: () => void;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  allSizes,
  allColors,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const handleSizeChange = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ sizes: newSizes });
  };

  const handleColorChange = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    onFilterChange({ colors: newColors });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h3 className="text-xl font-bold">الفلاتر</h3>
        <button onClick={onClearFilters} className="text-sm text-gray-600 hover:text-gray-900">
          مسح الكل
        </button>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">السعر</h4>
        <input
          type="range"
          min="50"
          max="1000"
          step="10"
          value={filters.price}
          onChange={e => onFilterChange({ price: Number(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>50 ر.س</span>
          <span>حتى {filters.price} ر.س</span>
          <span>1000 ر.س</span>
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6 border-t pt-4">
        <h4 className="font-semibold mb-3">المقاس</h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.map(size => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`px-4 py-1.5 border rounded-md text-sm transition-colors ${
                filters.sizes.includes(size)
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      
      {/* Color Filter */}
      <div className="border-t pt-4">
        <h4 className="font-semibold mb-3">اللون</h4>
        <div className="flex flex-wrap gap-3">
          {Object.entries(allColors).map(([name, code]) => (
            <button
              key={name}
              onClick={() => handleColorChange(name)}
              title={name}
              style={{ backgroundColor: code }}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition-transform transform hover:scale-110 ${
                filters.colors.includes(name) ? 'ring-2 ring-offset-2 ring-gray-800' : ''
              } ${code === '#FFFFFF' ? 'border-gray-400' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;
