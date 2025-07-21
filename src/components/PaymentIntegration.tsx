import React, { useState } from 'react';
import { CreditCard, Smartphone, Bitcoin, Building, Check, Shield, Lock, AlertCircle } from 'lucide-react';

interface PaymentIntegrationProps {
  selectedPlan: {
    name: string;
    price: number;
    period: string;
  };
  onPaymentComplete: () => void;
}

const PaymentIntegration: React.FC<PaymentIntegrationProps> = ({ selectedPlan, onPaymentComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Visa, MasterCard, American Express',
      fees: 'No additional fees',
      enabled: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <Shield className="w-6 h-6" />,
      description: 'Pay with your PayPal account',
      fees: 'No additional fees',
      enabled: true
    },
    {
      id: 'stripe',
      name: 'Stripe Checkout',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Secure payment processing',
      fees: 'No additional fees',
      enabled: true
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Quick and secure payment',
      fees: 'No additional fees',
      enabled: true
    },
    {
      id: 'google',
      name: 'Google Pay',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Pay with Google Pay',
      fees: 'No additional fees',
      enabled: true
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: <Bitcoin className="w-6 h-6" />,
      description: 'Bitcoin, Ethereum, USDT',
      fees: 'Network fees apply',
      enabled: true
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: <Building className="w-6 h-6" />,
      description: 'Direct bank transfer',
      fees: '2-3 business days',
      enabled: true
    }
  ];

  // Card number formatting
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Expiry date formatting
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  // Card validation
  const validateCard = () => {
    const errors = [];
    
    if (!formData.cardNumber.replace(/\s/g, '') || formData.cardNumber.replace(/\s/g, '').length < 13) {
      errors.push('Valid card number is required');
    }
    
    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      errors.push('Valid expiry date is required (MM/YY)');
    }
    
    if (!formData.cvv || formData.cvv.length < 3) {
      errors.push('Valid CVV is required');
    }
    
    if (!formData.cardName.trim()) {
      errors.push('Cardholder name is required');
    }
    
    return errors;
  };

  // Stripe Payment Processing
  const processStripePayment = async () => {
    try {
      // In a real implementation, you would:
      // 1. Load Stripe.js
      // 2. Create payment intent on your backend
      // 3. Confirm payment with Stripe
      
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedPlan.price * 100, // Convert to cents
          currency: 'usd',
          plan: selectedPlan.name,
          metadata: {
            user_id: 'current_user_id',
            plan_type: selectedPlan.name
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Payment processing failed');
      }

      const { clientSecret } = await response.json();
      
      // Simulate successful payment for demo
      return { success: true, paymentIntent: { id: 'pi_' + Math.random().toString(36).substr(2, 9) } };
    } catch (error) {
      console.error('Stripe payment error:', error);
      return { success: false, error: 'Payment processing failed' };
    }
  };

  // PayPal Payment Processing
  const processPayPalPayment = async () => {
    try {
      // In a real implementation, you would integrate PayPal SDK
      // Create order and capture payment
      
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedPlan.price,
          currency: 'USD',
          plan: selectedPlan.name
        }),
      });

      if (!response.ok) {
        throw new Error('PayPal payment failed');
      }

      // Simulate successful payment for demo
      return { success: true, orderId: 'paypal_' + Math.random().toString(36).substr(2, 9) };
    } catch (error) {
      console.error('PayPal payment error:', error);
      return { success: false, error: 'PayPal payment failed' };
    }
  };

  // Cryptocurrency Payment Processing
  const processCryptoPayment = async () => {
    try {
      // In a real implementation, you would integrate with crypto payment processors
      // like CoinGate, BitPay, or Coinbase Commerce
      
      const response = await fetch('/api/crypto/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedPlan.price,
          currency: 'USD',
          crypto_currency: 'BTC', // or let user choose
          plan: selectedPlan.name
        }),
      });

      if (!response.ok) {
        throw new Error('Crypto payment failed');
      }

      // Simulate successful payment for demo
      return { success: true, paymentId: 'crypto_' + Math.random().toString(36).substr(2, 9) };
    } catch (error) {
      console.error('Crypto payment error:', error);
      return { success: false, error: 'Crypto payment failed' };
    }
  };

  // Apple Pay Processing
  const processApplePay = async () => {
    try {
      if (!window.ApplePaySession || !ApplePaySession.canMakePayments()) {
        throw new Error('Apple Pay is not available');
      }

      const paymentRequest = {
        countryCode: 'US',
        currencyCode: 'USD',
        supportedNetworks: ['visa', 'masterCard', 'amex'],
        merchantCapabilities: ['supports3DS'],
        total: {
          label: `TraderEdge Pro - ${selectedPlan.name}`,
          amount: selectedPlan.price.toString()
        }
      };

      // Simulate successful payment for demo
      return { success: true, paymentId: 'apple_' + Math.random().toString(36).substr(2, 9) };
    } catch (error) {
      console.error('Apple Pay error:', error);
      return { success: false, error: 'Apple Pay failed' };
    }
  };

  // Google Pay Processing
  const processGooglePay = async () => {
    try {
      // In a real implementation, you would integrate Google Pay API
      const paymentsClient = new window.google.payments.api.PaymentsClient({
        environment: 'TEST' // or 'PRODUCTION'
      });

      const paymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA']
          }
        }],
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPrice: selectedPlan.price.toString(),
          currencyCode: 'USD'
        }
      };

      // Simulate successful payment for demo
      return { success: true, paymentId: 'google_' + Math.random().toString(36).substr(2, 9) };
    } catch (error) {
      console.error('Google Pay error:', error);
      return { success: false, error: 'Google Pay failed' };
    }
  };

  // Bank Transfer Processing
  const processBankTransfer = async () => {
    try {
      // In a real implementation, you would integrate with bank transfer services
      // like Plaid, Yodlee, or direct ACH processing
      
      const response = await fetch('/api/bank-transfer/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedPlan.price,
          currency: 'USD',
          plan: selectedPlan.name,
          user_id: 'current_user_id'
        }),
      });

      if (!response.ok) {
        throw new Error('Bank transfer initiation failed');
      }

      // Simulate successful initiation for demo
      return { success: true, transferId: 'bank_' + Math.random().toString(36).substr(2, 9) };
    } catch (error) {
      console.error('Bank transfer error:', error);
      return { success: false, error: 'Bank transfer failed' };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      let paymentResult;

      // Validate card details for card payments
      if (selectedMethod === 'card' || selectedMethod === 'stripe') {
        const validationErrors = validateCard();
        if (validationErrors.length > 0) {
          setError(validationErrors.join(', '));
          setIsProcessing(false);
          return;
        }
      }

      // Process payment based on selected method
      switch (selectedMethod) {
        case 'card':
        case 'stripe':
          paymentResult = await processStripePayment();
          break;
        case 'paypal':
          paymentResult = await processPayPalPayment();
          break;
        case 'crypto':
          paymentResult = await processCryptoPayment();
          break;
        case 'apple':
          paymentResult = await processApplePay();
          break;
        case 'google':
          paymentResult = await processGooglePay();
          break;
        case 'bank':
          paymentResult = await processBankTransfer();
          break;
        default:
          throw new Error('Invalid payment method');
      }

      if (paymentResult.success) {
        setPaymentSuccess(true);
        
        // Store payment details
        localStorage.setItem('payment_details', JSON.stringify({
          method: selectedMethod,
          amount: selectedPlan.price,
          plan: selectedPlan.name,
          paymentId: paymentResult.paymentIntent?.id || paymentResult.orderId || paymentResult.paymentId,
          timestamp: new Date().toISOString()
        }));

        // Call success callback after 2 seconds
        setTimeout(() => {
          onPaymentComplete();
        }, 2000);
      } else {
        setError(paymentResult.error || 'Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    let processedValue = value;
    
    // Format card number
    if (field === 'cardNumber') {
      processedValue = formatCardNumber(value);
    }
    
    // Format expiry date
    if (field === 'expiryDate') {
      processedValue = formatExpiryDate(value);
    }
    
    // Limit CVV to 4 digits
    if (field === 'cvv') {
      processedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
    }

    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: processedValue
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: processedValue }));
    }
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  if (paymentSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-4">Payment Successful!</h2>
          <p className="text-gray-400 mb-6">
            Welcome to TraderEdge Pro {selectedPlan.name}! Your account is being set up.
          </p>
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">{selectedPlan.name}</span>
                <span className="text-white font-medium">${selectedPlan.price}/{selectedPlan.period}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">14-Day Free Trial</span>
                <span className="text-green-500 font-medium">-${selectedPlan.price}</span>
              </div>
              
              <div className="border-t border-gray-600 pt-4">
                <div className="flex justify-between">
                  <span className="text-white font-semibold">Total Today</span>
                  <span className="text-white font-bold">$0.00</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  You'll be charged ${selectedPlan.price} after your 14-day free trial ends.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-600/20 border border-blue-600 rounded-xl">
              <div className="flex items-center space-x-2 text-blue-400 mb-2">
                <Check className="w-4 h-4" />
                <span className="font-medium">Free Trial Benefits</span>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Full access to all features</li>
                <li>• Unlimited signals</li>
                <li>• No credit card required</li>
                <li>• Cancel anytime</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Payment Method</h3>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-600/20 border border-red-600 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            {/* Payment Method Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  disabled={!method.enabled}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedMethod === method.id
                      ? 'border-blue-500 bg-blue-500/20'
                      : method.enabled 
                        ? 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                        : 'border-gray-700 bg-gray-800 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={selectedMethod === method.id ? 'text-blue-400' : 'text-gray-400'}>
                      {method.icon}
                    </div>
                    <span className="text-white font-medium">{method.name}</span>
                  </div>
                  <p className="text-sm text-gray-400">{method.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{method.fees}</p>
                </button>
              ))}
            </div>

            {/* Payment Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {(selectedMethod === 'card' || selectedMethod === 'stripe') && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {selectedMethod === 'paypal' && (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">💳</div>
                  <p className="text-gray-400">You'll be redirected to PayPal to complete your payment</p>
                </div>
              )}

              {selectedMethod === 'crypto' && (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">₿</div>
                  <p className="text-gray-400 mb-4">Pay with Bitcoin, Ethereum, or USDT</p>
                  <p className="text-sm text-gray-500">You'll be redirected to our crypto payment processor</p>
                </div>
              )}

              {selectedMethod === 'apple' && (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🍎</div>
                  <p className="text-gray-400">Use Touch ID or Face ID to complete your payment</p>
                </div>
              )}

              {selectedMethod === 'google' && (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🟢</div>
                  <p className="text-gray-400">Complete your payment with Google Pay</p>
                </div>
              )}

              {selectedMethod === 'bank' && (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🏦</div>
                  <p className="text-gray-400 mb-4">Direct bank transfer</p>
                  <p className="text-sm text-gray-500">Processing takes 2-3 business days</p>
                </div>
              )}

              {/* Security Notice */}
              <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
                <div className="flex items-center space-x-2 text-blue-400 mb-2">
                  <Lock className="w-4 h-4" />
                  <span className="font-medium">Secure Payment</span>
                </div>
                <p className="text-sm text-gray-400">
                  Your payment information is encrypted and secure. We use industry-standard SSL encryption 
                  and never store your payment details.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <span>
                    {selectedMethod === 'bank' ? 'Initiate Bank Transfer' : 
                     selectedMethod === 'crypto' ? 'Pay with Crypto' :
                     'Start Free Trial'}
                  </span>
                )}
              </button>

              <p className="text-center text-sm text-gray-400">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentIntegration;
