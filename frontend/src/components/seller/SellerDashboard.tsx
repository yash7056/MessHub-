import React, { useState, useEffect } from 'react';
import { 
  Store, 
  Menu, 
  DollarSign, 
  Clock, 
  Star, 
  Users, 
  Edit3, 
  Save,
  X,
  Plus,
  Minus,
  Eye,
  TrendingUp,
  ChefHat,
  Leaf
} from 'lucide-react';
import { messAPI } from '../../services/api';

const SellerDashboard: React.FC = () => {
  const [messId, setMessId] = useState('');
  const [messName, setMessName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isVeg, setIsVeg] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [editingMenu, setEditingMenu] = useState(false);
  const [menuData, setMenuData] = useState<{ lunch: string[]; dinner: string[] }>({
    lunch: [],
    dinner: []
  });
  const [prices, setPrices] = useState({
    lunch: 80,
    dinner: 90
  });
  const [reviews, setReviews] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);

  const loadSellerMess = async () => {
    setIsLoading(true);
    try {
      const mess = await messAPI.getSellerMess();
      setMessId(mess._id || mess.id);
      setMessName(mess.name);
      setAddress(mess.address);
      setPhone(mess.phone);
      setIsVeg(mess.isVeg ?? true);
      setIsOpen(mess.isOpen);
      setMenuData(mess.todaysMenu || { lunch: [], dinner: [] });
      setPrices({
        lunch: mess.lunchPrice || 80,
        dinner: mess.dinnerPrice || 90
      });
      setReviews(mess.reviews || []);
      
      setStats([
        { label: "Today's Orders", value: '24', icon: Users, color: 'bg-orange-100 text-orange-600', trend: '+12%' },
        { label: 'Average Rating', value: mess.rating.toString(), icon: Star, color: 'bg-yellow-100 text-yellow-600', trend: `${mess.reviewCount} Reviews` },
        { label: 'Revenue Today', value: `₹${(24 * mess.lunchPrice).toLocaleString()}`, icon: DollarSign, color: 'bg-green-100 text-green-600', trend: '+18%' },
        { label: 'Total Reviews', value: mess.reviewCount.toString(), icon: Menu, color: 'bg-blue-100 text-blue-600', trend: `+${mess.reviewCount}` }
      ]);
    } catch (error) {
      console.error('Failed to load seller mess profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSellerMess();
  }, []);

  const handleStatusToggle = async () => {
    try {
      const updated = await messAPI.updateSellerMess({ isOpen: !isOpen });
      setIsOpen(updated.isOpen);
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleMenuSave = async () => {
    if (editingMenu) {
      try {
        const cleanLunch = menuData.lunch.filter(item => item.trim() !== '');
        const cleanDinner = menuData.dinner.filter(item => item.trim() !== '');
        
        await messAPI.updateSellerMess({ 
          todaysMenu: { lunch: cleanLunch, dinner: cleanDinner } 
        });
        setMenuData({ lunch: cleanLunch, dinner: cleanDinner });
        setEditingMenu(false);
        alert('Menu updated successfully!');
      } catch (error) {
        alert('Failed to save menu changes');
      }
    } else {
      setEditingMenu(true);
    }
  };

  const handlePricesSave = async () => {
    try {
      await messAPI.updateSellerMess({ 
        lunchPrice: prices.lunch, 
        dinnerPrice: prices.dinner 
      });
      alert('Pricing updated successfully!');
    } catch (error) {
      alert('Failed to update meal pricing');
    }
  };

  const handleProfileSave = async () => {
    if (!messName.trim() || !address.trim() || !phone.trim()) {
      alert('All settings fields are required');
      return;
    }
    try {
      await messAPI.updateSellerMess({
        name: messName,
        address,
        phone,
        isVeg
      });
      alert('Mess settings saved successfully!');
    } catch (error) {
      alert('Failed to update mess settings');
    }
  };

  const addMenuItem = (mealType: 'lunch' | 'dinner') => {
    setMenuData({
      ...menuData,
      [mealType]: [...menuData[mealType], '']
    });
  };

  const removeMenuItem = (mealType: 'lunch' | 'dinner', index: number) => {
    setMenuData({
      ...menuData,
      [mealType]: menuData[mealType].filter((_, i) => i !== index)
    });
  };

  const updateMenuItem = (mealType: 'lunch' | 'dinner', index: number, value: string) => {
    const newMenu = [...menuData[mealType]];
    newMenu[index] = value;
    setMenuData({
      ...menuData,
      [mealType]: newMenu
    });
  };

  const getInitials = (name: string) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-600 font-semibold">Loading your Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{messName || 'Seller Dashboard'}</h1>
              <p className="text-gray-600 mt-1">Manage your mess and serve delicious meals</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-xl font-semibold ${
                isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {isOpen ? '🟢 Open' : '🔴 Closed'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-right">
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.trend}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Control */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <Store className="h-6 w-6 mr-3 text-orange-600" />
                  Mess Status
                </h2>
                <button
                  onClick={handleStatusToggle}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                    isOpen 
                      ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
                      : 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                  }`}
                >
                  {isOpen ? 'Close Mess' : 'Open Mess'}
                </button>
              </div>
              <div className={`p-4 rounded-xl ${isOpen ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className={`font-medium ${isOpen ? 'text-green-800' : 'text-red-800'}`}>
                  {isOpen 
                    ? '✅ Your mess is currently open and accepting orders.' 
                    : '❌ Your mess is closed. Open it to start accepting orders.'
                  }
                </p>
              </div>
            </div>

            {/* Menu Management */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <ChefHat className="h-6 w-6 mr-3 text-orange-600" />
                  Today's Menu
                </h2>
                <button
                  onClick={handleMenuSave}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg ${
                    editingMenu 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                  }`}
                >
                  {editingMenu ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                  <span>{editingMenu ? 'Save Changes' : 'Edit Menu'}</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Lunch Menu */}
                <div className="bg-orange-50 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-orange-800 mb-4 text-center">🍽️ Lunch Menu</h3>
                  <div className="space-y-3">
                    {menuData.lunch.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {editingMenu ? (
                          <>
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => updateMenuItem('lunch', index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-800"
                              placeholder="Enter menu item"
                            />
                            <button
                              onClick={() => removeMenuItem('lunch', index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <span className="flex-1 px-3 py-2 bg-white rounded-lg font-medium text-gray-800">
                            {item}
                          </span>
                        )}
                      </div>
                    ))}
                    {editingMenu && (
                      <button
                        onClick={() => addMenuItem('lunch')}
                        className="w-full px-3 py-2 border-2 border-dashed border-orange-300 rounded-lg text-orange-600 hover:border-orange-400 hover:bg-orange-50 transition-colors flex items-center justify-center font-medium"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                      </button>
                    )}
                  </div>
                </div>

                {/* Dinner Menu */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-blue-800 mb-4 text-center">🌙 Dinner Menu</h3>
                  <div className="space-y-3">
                    {menuData.dinner.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {editingMenu ? (
                          <>
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => updateMenuItem('dinner', index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800"
                              placeholder="Enter menu item"
                            />
                            <button
                              onClick={() => removeMenuItem('dinner', index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <span className="flex-1 px-3 py-2 bg-white rounded-lg font-medium text-gray-800">
                            {item}
                          </span>
                        )}
                      </div>
                    ))}
                    {editingMenu && (
                      <button
                        onClick={() => addMenuItem('dinner')}
                        className="w-full px-3 py-2 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center font-medium"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <DollarSign className="h-6 w-6 mr-3 text-green-600" />
                  Meal Pricing
                </h2>
                <button
                  onClick={handlePricesSave}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all transform hover:scale-105 shadow-sm"
                >
                  Save Prices
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-4">
                  <label className="block text-sm font-bold text-green-800 mb-3 text-center">💰 Lunch Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                    <input
                      type="number"
                      value={prices.lunch}
                      onChange={(e) => setPrices({...prices, lunch: parseInt(e.target.value) || 0})}
                      className="w-full pl-8 pr-4 py-4 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-xl font-bold bg-white"
                    />
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <label className="block text-sm font-bold text-blue-800 mb-3 text-center">🌙 Dinner Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                    <input
                      type="number"
                      value={prices.dinner}
                      onChange={(e) => setPrices({...prices, dinner: parseInt(e.target.value) || 0})}
                      className="w-full pl-8 pr-4 py-4 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-xl font-bold bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mess Profile Settings */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold flex items-center mb-6">
                <Store className="h-6 w-6 mr-3 text-indigo-600" />
                Mess Profile Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mess Name</label>
                  <input
                    type="text"
                    value={messName}
                    onChange={(e) => setMessName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Food Category</label>
                    <select
                      value={isVeg ? 'veg' : 'non-veg'}
                      onChange={(e) => setIsVeg(e.target.value === 'veg')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-800 font-medium"
                    >
                      <option value="veg">Vegetarian Only (Veg)</option>
                      <option value="non-veg">Veg & Non-Vegetarian</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleProfileSave}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-md mt-2"
                >
                  Save Mess Settings
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold flex items-center mb-4">
                <Eye className="h-5 w-5 mr-2 text-purple-600" />
                Customer Preview
              </h2>
              <div className="bg-gradient-to-br from-orange-50 to-blue-50 rounded-xl p-4 border-2 border-dashed border-gray-300">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-1">
                  <h3 className="font-bold text-gray-900">{messName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
                <div className="mb-2">
                  {isVeg ? (
                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded border border-green-200 font-bold">
                      <Leaf className="h-3 w-3 text-green-500 fill-green-500" /> Veg
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-xs px-2 py-0.5 rounded border border-red-200 font-bold">
                      Non-Veg
                    </span>
                  )}
                </div>
                <div className="flex justify-between mb-3 text-sm">
                  <span className="font-semibold">₹{prices.lunch} Lunch</span>
                  <span className="font-semibold">₹{prices.dinner} Dinner</span>
                </div>
                <div className="text-xs text-gray-600">
                  <div className="mb-1"><strong>Lunch:</strong> {menuData.lunch.slice(0, 2).join(', ') || 'None'}...</div>
                  <div><strong>Dinner:</strong> {menuData.dinner.slice(0, 2).join(', ') || 'None'}...</div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold flex items-center mb-6">
                <Star className="h-5 w-5 mr-2 text-yellow-600" />
                Recent Reviews
              </h2>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {reviews.length > 0 ? (
                  reviews.map((review, idx) => (
                    <div key={review._id || idx} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {getInitials(review.customerName)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-900 text-sm truncate mr-2">{review.customerName}</span>
                            <div className="flex items-center flex-shrink-0">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 text-xs mb-1 break-words">{review.comment}</p>
                          <p className="text-[10px] text-gray-400">{formatDate(review.date)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 text-center py-4">No reviews yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;