import React, { useState, useEffect } from 'react';
import { Mess } from '../../data/mockData';
import MessCard from './MessCard';
import FilterBar from './FilterBar';
import { MapPin, Search, Map, List, Filter } from 'lucide-react';
import { messAPI } from '../../services/api';

const CustomerDashboard: React.FC = () => {
  const [messes, setMesses] = useState<Mess[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    maxDistance: 5,
    minRating: 0,
    maxPrice: 200,
    onlyOpen: false,
    foodType: 'all' as 'all' | 'veg' | 'non-veg'
  });

  const fetchMesses = async () => {
    setIsLoading(true);
    try {
      const data = await messAPI.getAll({
        search: searchQuery,
        maxDistance: filters.maxDistance,
        minRating: filters.minRating,
        maxPrice: filters.maxPrice,
        onlyOpen: filters.onlyOpen,
        foodType: filters.foodType
      });
      
      const mappedMesses = data.map((m: any) => ({
        ...m,
        id: m._id || m.id
      }));
      
      setMesses(mappedMesses);
    } catch (error) {
      console.error('Failed to fetch messes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search query changes
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchMesses();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, filters]);

  const sortedMesses = [...messes].sort((a, b) => {
    if (sortBy === 'distance') {
      return a.distance - b.distance;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'price-asc') {
      return Math.min(a.lunchPrice, a.dinnerPrice) - Math.min(b.lunchPrice, b.dinnerPrice);
    }
    if (sortBy === 'price-desc') {
      return Math.min(b.lunchPrice, b.dinnerPrice) - Math.min(a.lunchPrice, a.dinnerPrice);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Mess</h1>
              <p className="text-gray-600 mt-1">Discover delicious homely meals near you</p>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by mess name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2 text-orange-500" />
            <span className="font-medium">
              {isLoading ? 'Searching...' : `${sortedMesses.length} messes found near you`}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all ${
                showFilters 
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>

            {/* View Mode Toggle */}
            <div className="flex bg-white border border-gray-300 rounded-xl p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center px-3 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'list' 
                    ? 'bg-orange-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="h-4 w-4 mr-1" />
                List
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center px-3 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'map' 
                    ? 'bg-orange-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Map className="h-4 w-4 mr-1" />
                Map
              </button>
            </div>

            {/* Sort Dropdown */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="distance">Sort by Distance</option>
              <option value="rating">Sort by Rating</option>
              <option value="price-asc">Sort by Price (Low to High)</option>
              <option value="price-desc">Sort by Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-6 animate-fade-in-down">
            <FilterBar filters={filters} onFiltersChange={setFilters} />
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading messes...</p>
          </div>
        ) : viewMode === 'map' ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="bg-gray-100 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Map className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Map View Coming Soon</h3>
            <p className="text-gray-600">Interactive map with mess locations will be available soon!</p>
          </div>
        ) : (
          <>
            {sortedMesses.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedMesses.map((mess, index) => (
                  <div
                    key={mess.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <MessCard mess={mess} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">No messes found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn't find any messes matching your criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      maxDistance: 5,
                      minRating: 0,
                      maxPrice: 200,
                      onlyOpen: false,
                      foodType: 'all'
                    });
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <footer className="mt-12 py-6 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} MessHub. All rights reserved to Yash Dargad.</p>
      </footer>
    </div>
  );
};

export default CustomerDashboard;