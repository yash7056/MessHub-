import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import SellerDashboard from './components/seller/SellerDashboard';
import CustomerDashboard from './components/customer/CustomerDashboard';
import LoadingSpinner from './components/LoadingSpinner';

const AppContent: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return (
      <>
        <Navbar />
        {user.role === 'seller' ? <SellerDashboard /> : <CustomerDashboard />}
      </>
    );
  }

  if (showAuth) {
    return <AuthPage onBack={() => setShowAuth(false)} />;
  }

  return <LandingPage onGetStarted={() => setShowAuth(true)} />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;