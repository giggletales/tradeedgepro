import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Target, Users, BarChart3, Zap, CheckCircle, Star, ArrowRight, Activity, Globe, Award, Clock } from 'lucide-react';
import Header from './Header';

const LandingPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "85-95% Signal Accuracy",
      description: "Advanced AI algorithms with institutional-grade analysis delivering consistent profitability across all market conditions",
      color: "text-green-400"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Professional Risk Management",
      description: "Automated position sizing and stop-loss optimization with real-time risk monitoring and drawdown protection",
      color: "text-blue-400"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Funded Account Mastery",
      description: "Specialized strategies for FTMO, MyForexFunds, The5%ers, and 25+ prop firm challenges with proven success rates",
      color: "text-purple-400"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "ICT & SMC Analysis",
      description: "Advanced market structure concepts including Fair Value Gaps, Order Blocks, and institutional trading methodologies",
      color: "text-yellow-400"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Real-Time Signal Delivery",
      description: "Live market data with sub-second signal delivery via SMS, email, push notifications, and Telegram integration",
      color: "text-red-400"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Complete Market Coverage",
      description: "70+ trading pairs including major/minor Forex, cryptocurrencies, gold, silver, and commodity markets",
      color: "text-cyan-400"
    }
  ];

  const testimonials = [
    {
      name: "Marcus Thompson",
      role: "FTMO $200K Funded Trader",
      content: "TraderEdge Pro helped me pass my FTMO challenge in just 2 weeks. The signal accuracy and risk management are incredible. Already withdrawn $47K!",
      rating: 5,
      profit: "+$47,230",
      image: "MT",
      timeframe: "3 months ago"
    },
    {
      name: "Sarah Chen",
      role: "Institutional Day Trader",
      content: "The ICT and SMC analysis features are game-changing. Finally, a platform that understands professional market structure trading.",
      rating: 5,
      profit: "+$93,450",
      image: "SC",
      timeframe: "2 months ago"
    },
    {
      name: "David Rodriguez",
      role: "MyForexFunds Elite Trader",
      content: "Risk management tools are outstanding. Scaled from $10K to $500K funded account using their signals and following their trading plans.",
      rating: 5,
      profit: "+$125,800",
      image: "DR",
      timeframe: "1 month ago"
    }
  ];

  const stats = [
    { number: "95%", label: "Signal Accuracy", description: "Verified across 10,000+ trades" },
    { number: "$2.8M+", label: "Trader Profits", description: "Generated in 2024 alone" },
    { number: "15,247", label: "Active Traders", description: "Worldwide community" },
    { number: "24/7", label: "Market Coverage", description: "All major sessions" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-transparent to-blue-600/10"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Live Market Status */}
            <div className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">
                Weekend Markets • Forex Closed • {currentTime.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })} IST
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              TraderEdge <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Pro</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              Where Professional Trading Meets Artificial Intelligence
            </p>
            <p className="text-base text-gray-400 mb-10 max-w-2xl mx-auto">
              Institutional-grade signals with <span className="text-green-400 font-semibold">85-95% accuracy</span> for serious traders seeking funded account success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-xl hover:shadow-green-500/25"
              >
                Start 14-Day Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/membership"
                className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                View Pricing Plans
              </Link>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                  <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">{stat.number}</div>
                  <div className="text-white font-medium mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-400">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Professional-Grade Trading Arsenal</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Institutional-quality tools and analysis designed for serious traders seeking consistent profitability and funded account success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 group hover:transform hover:scale-105">
                <div className={`${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Trusted by Elite Traders Worldwide</h2>
            <p className="text-lg text-gray-400 mb-2">Real results from professional traders using TraderEdge Pro</p>
            <div className="flex items-center justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-gray-300">4.9/5 from 2,847 reviews</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 group">
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{testimonial.image}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                      <div className="text-xs text-gray-500">{testimonial.timeframe}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold text-lg">{testimonial.profit}</div>
                    <div className="text-xs text-gray-400">Total Profit</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900/20 via-gray-900/50 to-blue-900/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-3xl p-12 border border-gray-700">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Join the <span className="text-green-400">Elite 5%</span> of Traders?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform your trading with institutional-grade signals and join thousands of successful funded traders earning consistent profits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-green-500/25"
              >
                Start Free Trial Today
              </Link>
              <Link
                to="/membership"
                className="border-2 border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                View All Plans
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>24/7 Support Included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-bold text-white">TraderEdge Pro</h3>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Professional trading signals platform designed for funded account success. Join the elite community of profitable traders worldwide.
              </p>
              <div className="flex items-center space-x-4">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">Verified by 15,000+ traders</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/dashboard" className="hover:text-green-400 transition-colors">Live Dashboard</Link></li>
                <li><Link to="/membership" className="hover:text-green-400 transition-colors">Pricing Plans</Link></li>
                <li><Link to="/signals" className="hover:text-green-400 transition-colors">Signal Feed</Link></li>
                <li><Link to="/analytics" className="hover:text-green-400 transition-colors">Performance Analytics</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Support & Legal</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>&copy; 2025 TraderEdge Pro. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Trading involves substantial risk of loss. Past performance does not guarantee future results.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
