import React from 'react';
import { Search, MapPin, Star, Users, ChefHat, Clock, ArrowRight, Play } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
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
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">For Sellers</a>
              <button
                onClick={onGetStarted}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Login / Signup
              </button>
            </div>

            <button
              onClick={onGetStarted}
              className="md:hidden bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium transition-all"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-orange-50 rounded-full text-orange-700 text-sm font-medium mb-8 animate-fade-in-up">
              <Star className="h-4 w-4 mr-2" />
              Trusted by 10,000+ Students
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in-up animation-delay-200">
              Find Affordable
              <span className="block bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                Mess Services
              </span>
              Near You
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
              Discover homely, budget-friendly meals from trusted mess owners in your area. 
              Perfect for students and working professionals.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12 animate-fade-in-up animation-delay-600">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-2 flex items-center">
                  <div className="flex items-center flex-1 px-4">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <input
                      type="text"
                      placeholder="Enter your location (e.g., Koramangala, Bangalore)"
                      className="flex-1 py-4 text-lg focus:outline-none placeholder-gray-400"
                    />
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center">
                    <Search className="h-5 w-5 mr-2" />
                    Find Mess
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up animation-delay-800">
              <button
                onClick={onGetStarted}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Find Mess Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              <button
                onClick={onGetStarted}
                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center"
              >
                Are you a Mess Owner?
                <ChefHat className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Students Love MessHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make finding affordable, homely meals as easy as ordering from your favorite app
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center p-8 rounded-2xl hover:bg-orange-50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Hyper-Local</h3>
              <p className="text-gray-600">Find mess services within walking distance from your location</p>
            </div>

            <div className="group text-center p-8 rounded-2xl hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <ChefHat className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Daily Menus</h3>
              <p className="text-gray-600">Check today's menu and prices before visiting any mess</p>
            </div>

            <div className="group text-center p-8 rounded-2xl hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Verified Reviews</h3>
              <p className="text-gray-600">Read authentic reviews from fellow students and professionals</p>
            </div>

            <div className="group text-center p-8 rounded-2xl hover:bg-purple-50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Real-time Status</h3>
              <p className="text-gray-600">Know which messes are open and serving fresh meals right now</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
              <div className="text-xl opacity-90">Happy Students</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-xl opacity-90">Verified Messes</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-xl opacity-90">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Find Your Perfect Mess?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students who have found their favorite mess through MessHub
          </p>
          <button
            onClick={onGetStarted}
            className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-xl text-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <ChefHat className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                  MessHub
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Connecting hungry students with quality mess services across India. 
                Find affordable, homely meals near you.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-orange-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">For Sellers</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-orange-600 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Help Center</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 MessHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;