import React from 'react';
import { LogOut, User, ChefHat } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <ChefHat className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                MessHub
              </h1>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900">{user.name}</span>
                  <div className="flex items-center">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      user.role === 'seller' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {user.role === 'seller' ? '👨‍🍳 Seller' : '🎓 Student'}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;