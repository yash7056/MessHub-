import React, { useState } from 'react';
import { Mail, Phone, Lock, Eye, EyeOff, User, ArrowLeft, ChefHat, Users, Store, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthPageProps {
  onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'customer' | 'seller'>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    messName: '',
    messAddress: ''
  });

  const { login, signup, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      if (isLogin) {
        await login(formData.email, formData.password, role);
      } else {
        await signup({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          role,
          password: formData.password,
          messName: role === 'seller' ? formData.messName : undefined,
          messAddress: role === 'seller' ? formData.messAddress : undefined
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-blue-600 p-6 text-white">
          <button
            onClick={onBack}
            className="flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {isLogin ? 'Welcome Back!' : 'Join MessHub'}
            </h1>
            <p className="text-white/80">
              {isLogin ? 'Sign in to discover great meals' : 'Create your account today'}
            </p>
          </div>
        </div>

        <div className="p-8">
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {isLogin ? 'Login as' : 'Register as'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  role === 'customer'
                    ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Users className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Student</div>
                <div className="text-xs text-gray-500">Find mess</div>
              </button>
              <button
                type="button"
                onClick={() => setRole('seller')}
                className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  role === 'seller'
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <ChefHat className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Mess Owner</div>
                <div className="text-xs text-gray-500">List your mess</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter your mobile number"
                  />
                </div>
              </div>
            )}

            {!isLogin && role === 'seller' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mess / Restaurant Name</label>
                  <div className="relative">
                    <Store className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.messName}
                      onChange={(e) => setFormData({...formData, messName: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="e.g. Shree Krishna Mess"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mess Location Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.messAddress}
                      onChange={(e) => setFormData({...formData, messAddress: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="e.g. MG Road, Bangalore"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl ${
                role === 'customer'
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-orange-600 hover:text-orange-700 font-semibold"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;