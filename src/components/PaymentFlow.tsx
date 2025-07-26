import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import PaymentIntegration from './PaymentIntegration';
import { useUser } from '../contexts/UserContext';

const PaymentFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();
  
  // Get selected plan from location state or default
  const selectedPlan = location.state?.selectedPlan || {
    name: 'Professional',
    price: 99,
    period: 'month'
  };

  const handlePaymentComplete = () => {
    // Update user with premium membership
    if (user) {
      setUser({
        ...user,
        membershipTier: selectedPlan.name.toLowerCase() as 'basic' | 'professional' | 'institutional' | 'elite'
      });
    }
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  const handleSkipPayment = () => {
    // Allow users to skip payment and use free trial
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">TraderEdge Pro</h1>
            </div>
          </div>

          <div className="text-right">
            <div className="text-white font-semibold">Complete Your Setup</div>
            <div className="text-sm text-gray-400">Step 2 of 2</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Complete Your Subscription
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Start your 14-day free trial and get instant access to all premium features
            </p>
          </div>

          {/* Payment Integration */}
          <PaymentIntegration 
            selectedPlan={selectedPlan}
            onPaymentComplete={handlePaymentComplete}
          />

          {/* Skip Payment Option */}
          <div className="text-center mt-8">
            <button
              onClick={handleSkipPayment}
              className="text-gray-400 hover:text-blue-400 transition-colors text-sm underline"
            >
              Skip payment and start free trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFlow;