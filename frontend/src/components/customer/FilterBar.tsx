import React from 'react';
import { Filter, MapPin, Star, DollarSign, Clock, Leaf } from 'lucide-react';

interface FilterBarProps {
  filters: {
    maxDistance: number;
    minRating: number;
    maxPrice: number;
    onlyOpen: boolean;
    foodType: 'all' | 'veg' | 'non-veg';
  };
  onFiltersChange: (filters: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange }) => {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center mb-6">
        <Filter className="h-5 w-5 text-orange-600 mr-2" />
        <h3 className="font-bold text-gray-900 text-lg">Filter Results</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Distance Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <MapPin className="h-4 w-4 inline mr-1 text-orange-500" />
            Max Distance
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={filters.maxDistance}
              onChange={(e) => updateFilter('maxDistance', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-orange"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0.5km</span>
              <span className="font-semibold text-orange-600">{filters.maxDistance} km</span>
              <span>10km</span>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <Star className="h-4 w-4 inline mr-1 text-yellow-500" />
            Min Rating
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={filters.minRating}
              onChange={(e) => updateFilter('minRating', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-yellow"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span className="font-semibold text-yellow-600">{filters.minRating}+ ⭐</span>
              <span>5</span>
            </div>
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <DollarSign className="h-4 w-4 inline mr-1 text-green-500" />
            Max Price
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="50"
              max="200"
              step="10"
              value={filters.maxPrice}
              onChange={(e) => updateFilter('maxPrice', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>₹50</span>
              <span className="font-semibold text-green-600">₹{filters.maxPrice}</span>
              <span>₹200</span>
            </div>
          </div>
        </div>

        {/* Food Type Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <Leaf className="h-4 w-4 inline mr-1 text-green-500" />
            Food Type
          </label>
          <select
            value={filters.foodType}
            onChange={(e) => updateFilter('foodType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
          >
            <option value="all">All Types</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
        </div>

        {/* Open Status Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <Clock className="h-4 w-4 inline mr-1 text-blue-500" />
            Availability
          </label>
          <label className="flex items-center p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={filters.onlyOpen}
              onChange={(e) => updateFilter('onlyOpen', e.target.checked)}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-sm font-medium text-gray-700">Only show open messes</span>
          </label>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Filters</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFiltersChange({ maxDistance: 1, minRating: 4, maxPrice: 100, onlyOpen: true, foodType: 'all' })}
            className="px-4 py-2 bg-orange-100 text-orange-700 rounded-xl text-sm font-medium hover:bg-orange-200 transition-colors"
          >
            🏃‍♂️ Nearby & Top Rated
          </button>
          <button
            onClick={() => onFiltersChange({ maxDistance: 5, minRating: 0, maxPrice: 80, onlyOpen: false, foodType: 'all' })}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-medium hover:bg-green-200 transition-colors"
          >
            💰 Budget Friendly
          </button>
          <button
            onClick={() => onFiltersChange({ maxDistance: 10, minRating: 4.5, maxPrice: 200, onlyOpen: false, foodType: 'veg' })}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-200 transition-colors"
          >
            🌟 Premium Veg
          </button>
          <button
            onClick={() => onFiltersChange({ maxDistance: 5, minRating: 0, maxPrice: 200, onlyOpen: false, foodType: 'all' })}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            🔄 Reset All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;