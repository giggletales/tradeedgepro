import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Zap, Crown, Shield, ArrowLeft, Activity } from 'lucide-react';
import Header from './Header';

const MembershipPlans = () => {
  const plans = [
    {
      name: 'TraderEdge Basic',
      price: 29,
      period: 'month',
      description: 'Perfect for beginners starting their trading journey',
      icon: <Shield className="w-8 h-8" />,
      color: 'border-gray-600',
      bgColor: 'bg-gray-800',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
      features: [
        'Access to 3 major pairs (EUR/USD, GBP/USD, USD/JPY)',
        '5 signals per day',
        'Basic chart analysis',
        'Email notifications only',
        'Community forum access',
        'Basic educational materials',
        'Standard customer support'
      ]
    },
    {
      name: 'TraderEdge Professional',
      price: 79,
      period: 'month',
      description: 'Most popular choice for serious traders',
      icon: <Star className="w-8 h-8" />,
      color: 'border-blue-500',
      bgColor: 'bg-blue-500/10',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      popular: true,
      features: [
        'All 5 major pairs (XAU/USD, GBP/USD, USD/JPY, EUR/USD, AUD/USD)',
        'Unlimited daily signals',
        'Full TradingView integration with advanced indicators',
        'Multi-timeframe analysis',
        'SMS + Email + Push notifications',
        'Priority customer support',
        'Advanced educational webinars',
        'Risk management tools',
        'Performance analytics dashboard'
      ]
    },
    {
      name: 'TraderEdge Institutional',
      price: 199,
      period: 'month',
      description: 'Advanced features for institutional-level trading',
      icon: <Zap className="w-8 h-8" />,
      color: 'border-yellow-500',
      bgColor: 'bg-yellow-500/10',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
      features: [
        'Everything in Professional tier',
        'AI-powered personalized signals',
        'Direct broker integration with one-click trading',
        'Advanced ICT and SMC analysis',
        'Custom risk parameters',
        'Personal trading coach consultation (monthly)',
        'Priority signal delivery (sub-second latency)',
        'Custom dashboard layouts',
        'API access for automated trading',
        'Dedicated account manager'
      ]
    },
    {
      name: 'TraderEdge Elite',
      price: 399,
      period: 'month',
      description: 'Ultimate trading experience for professionals',
      icon: <Crown className="w-8 h-8" />,
      color: 'border-purple-500',
      bgColor: 'bg-purple-500/10',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      features: [
        'Everything in Institutional tier',
        'Dedicated account manager',
        'Custom signal development based on trading style',
        'Private Discord/Telegram channels with experts',
        'Weekly one-on-one strategy sessions',
        'Custom indicator development',
        'Hedge fund level market analysis',
        'Early access to new features',
        'VIP customer support (24/7)',
        'Quarterly strategy review sessions'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <Header />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Link to="/" className="inline-flex items-center space-x-2 text-primary-500 hover:text-primary-400 mb-8">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Choose Your Trading Plan</h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
              Select the perfect plan to accelerate your trading success with institutional-grade signals and analysis.
            </p>
            
            <div className="bg-primary-600/20 border border-primary-500 rounded-xl p-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 text-primary-400 mb-2">
                <Star className="w-5 h-5" />
                <span className="font-semibold">14-Day Free Trial</span>
              </div>
              <p className="text-sm text-gray-300">
                Start with TraderEdge Professional features for free. No credit card required.
              </p>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl border-2 ${plan.color} ${plan.bgColor} backdrop-blur-sm p-8 ${
                  plan.popular ? 'transform scale-105 shadow-2xl' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="text-primary-500 mb-4 flex justify-center">
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className={`w-full ${plan.buttonColor} text-white py-3 rounded-lg font-semibold transition-colors text-center block`}
                >
                  {index === 1 ? 'Start Free Trial' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-display font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Can I change plans anytime?</h3>
                  <p className="text-gray-400">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Is there a free trial?</h3>
                  <p className="text-gray-400">Yes, we offer a 14-day free trial of our Professional tier with no credit card required.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">What payment methods do you accept?</h3>
                  <p className="text-gray-400">We accept all major credit cards, PayPal, Apple Pay, Google Pay, and cryptocurrency payments (Bitcoin, Ethereum, USDT).</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">How accurate are the signals?</h3>
                  <p className="text-gray-400">Our AI-powered signals maintain an average accuracy of 85-95% across all major currency pairs.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Can I cancel anytime?</h3>
                  <p className="text-gray-400">Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Do you offer refunds?</h3>
                  <p className="text-gray-400">We offer a 30-day money-back guarantee if you're not satisfied with our service.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-primary-600/20 to-dark-800/50 rounded-2xl p-12 border border-dark-700">
              <h2 className="text-3xl font-display font-bold text-white mb-4">Ready to Start Trading Like a Pro?</h2>
              <p className="text-lg text-gray-400 mb-8">
                Join thousands of successful traders who trust TraderEdge Pro for their funded account success.
              </p>
              <Link
                to="/register"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center space-x-2 shadow-lg"
              >
                <span>Start Your Free Trial</span>
                <Star className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPlans;