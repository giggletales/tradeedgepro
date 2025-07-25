import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useTradingPlan } from '../contexts/TradingPlanContext';
import Header from './Header';

const PropFirmSelection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFirm, setSelectedFirm] = useState('');
  const navigate = useNavigate();
  const { updatePropFirm } = useTradingPlan();

  const propFirms = [
    {
      name: 'FTMO',
      logo: '🏆',
      description: 'Leading prop firm with 2-step evaluation',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 10,
        profitTarget: 10,
        minTradingDays: 10,
        maxPositionSize: 2,
        scalingTarget: 10,
        challengeTypes: ['2-step', 'instant-funding'],
        accountSizes: [10000, 25000, 50000, 100000, 200000]
      },
      popular: true
    },
    {
      name: 'MyForexFunds',
      logo: '💰',
      description: 'Flexible evaluation with multiple account types',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 12,
        profitTarget: 8,
        minTradingDays: 5,
        maxPositionSize: 3,
        scalingTarget: 8,
        challengeTypes: ['1-step', '2-step', 'instant-funding'],
        accountSizes: [5000, 10000, 25000, 50000, 100000, 200000, 300000]
      }
    },
    {
      name: 'The5%ers',
      logo: '🎯',
      description: 'Unique scaling model with high-frequency trading',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 4,
        profitTarget: 6,
        minTradingDays: 6,
        maxPositionSize: 1,
        scalingTarget: 6,
        challengeTypes: ['1-step', '2-step'],
        accountSizes: [4000, 6000, 10000, 20000, 40000, 100000]
      }
    },
    {
      name: 'FundedNext',
      logo: '🚀',
      description: 'Fast-growing prop firm with competitive conditions',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 10,
        profitTarget: 8,
        minTradingDays: 5,
        maxPositionSize: 2,
        scalingTarget: 8,
        challengeTypes: ['1-step', '2-step', 'instant-funding'],
        accountSizes: [6000, 15000, 25000, 50000, 100000, 200000]
      }
    },
    {
      name: 'Apex Trader Funding',
      logo: '⚡',
      description: 'Futures-focused prop firm with flexible rules',
      rules: {
        dailyLoss: 3,
        maxDrawdown: 6,
        profitTarget: 8,
        minTradingDays: 10,
        maxPositionSize: 10,
        scalingTarget: 8,
        challengeTypes: ['1-step', '2-step'],
        accountSizes: [25000, 50000, 100000, 150000, 250000]
      }
    },
    {
      name: 'TopStep',
      logo: '📈',
      description: 'Established futures prop firm with proven track record',
      rules: {
        dailyLoss: 2,
        maxDrawdown: 4,
        profitTarget: 6,
        minTradingDays: 8,
        maxPositionSize: 5,
        scalingTarget: 6,
        challengeTypes: ['1-step', '2-step'],
        accountSizes: [50000, 100000, 150000]
      }
    },
    {
      name: 'Lux Trading Firm',
      logo: '💎',
      description: 'Premium prop firm with high capital allocation',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 10,
        profitTarget: 8,
        minTradingDays: 4,
        maxPositionSize: 2,
        scalingTarget: 8,
        challengeTypes: ['1-step', '2-step', 'instant-funding'],
        accountSizes: [10000, 25000, 50000, 100000, 200000, 500000]
      }
    },
    {
      name: 'E8 Markets',
      logo: '🌟',
      description: 'Innovative prop firm with trader-friendly conditions',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 8,
        profitTarget: 8,
        minTradingDays: 5,
        maxPositionSize: 2,
        scalingTarget: 8,
        challengeTypes: ['1-step', '2-step'],
        accountSizes: [25000, 50000, 100000, 200000]
      }
    },
    {
      name: 'True Forex Funds',
      logo: '✅',
      description: 'Reliable prop firm with consistent payouts',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 12,
        profitTarget: 10,
        minTradingDays: 5,
        maxPositionSize: 2,
        scalingTarget: 10,
        challengeTypes: ['2-step', 'instant-funding'],
        accountSizes: [10000, 25000, 50000, 100000, 200000]
      }
    },
    {
      name: 'Funded Trading Plus',
      logo: '🔥',
      description: 'Growing prop firm with competitive profit splits',
      rules: {
        dailyLoss: 4,
        maxDrawdown: 8,
        profitTarget: 8,
        minTradingDays: 5,
        maxPositionSize: 2,
        scalingTarget: 8,
        challengeTypes: ['1-step', '2-step'],
        accountSizes: [10000, 25000, 50000, 100000]
      }
    },
    {
      name: 'Smart Prop Trader',
      logo: '🧠',
      description: 'AI-powered evaluation with smart risk management',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 10,
        profitTarget: 10,
        minTradingDays: 4,
        maxPositionSize: 2,
        scalingTarget: 10,
        challengeTypes: ['1-step', '2-step', 'instant-funding'],
        accountSizes: [25000, 50000, 100000, 200000]
      }
    },
    {
      name: 'Surge Trader',
      logo: '⚡',
      description: 'Fast evaluation process with quick payouts',
      rules: {
        dailyLoss: 3,
        maxDrawdown: 6,
        profitTarget: 6,
        minTradingDays: 3,
        maxPositionSize: 2,
        scalingTarget: 6,
        challengeTypes: ['1-step', '2-step'],
        accountSizes: [25000, 50000, 100000, 200000]
      }
    },
    {
      name: 'Goat Funded Trader',
      logo: '🐐',
      description: 'Unique prop firm with flexible trading conditions',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 8,
        profitTarget: 7,
        minTradingDays: 5,
        maxPositionSize: 2,
        scalingTarget: 7,
        challengeTypes: ['1-step', '2-step'],
        accountSizes: [10000, 25000, 50000, 100000]
      }
    },
    {
      name: 'Breakout Prop',
      logo: '📊',
      description: 'Breakout-focused prop firm with technical analysis',
      rules: {
        dailyLoss: 4,
        maxDrawdown: 8,
        profitTarget: 8,
        minTradingDays: 5,
        maxPositionSize: 2,
        scalingTarget: 8,
        challengeTypes: ['1-step', '2-step'],
        accountSizes: [25000, 50000, 100000]
      }
    },
    {
      name: 'Skilled Funded Trader',
      logo: '🎓',
      description: 'Education-focused prop firm with mentorship',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 10,
        profitTarget: 8,
        minTradingDays: 5,
        maxPositionSize: 2,
        scalingTarget: 8,
        challengeTypes: ['1-step', '2-step'],
        accountSizes: [10000, 25000, 50000, 100000]
      }
    },
    {
      name: 'Bespoke Funding',
      logo: '👔',
      description: 'Customized funding solutions for professional traders',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 12,
        profitTarget: 10,
        minTradingDays: 10,
        maxPositionSize: 3,
        scalingTarget: 10,
        challengeTypes: ['2-step', 'instant-funding'],
        accountSizes: [25000, 50000, 100000, 200000, 500000]
      }
    },
    {
      name: 'Audacity Capital',
      logo: '🎪',
      description: 'Bold prop firm with aggressive scaling opportunities',
      rules: {
        dailyLoss: 4,
        maxDrawdown: 8,
        profitTarget: 8,
        minTradingDays: 4,
        maxPositionSize: 2,
        scalingTarget: 8,
        challengeTypes: ['1-step', '2-step'],
        accountSizes: [25000, 50000, 100000, 200000]
      }
    },
    {
      name: 'City Traders Imperium',
      logo: '🏙️',
      description: 'London-based prop firm with institutional approach',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 10,
        profitTarget: 8,
        minTradingDays: 5,
        maxPositionSize: 2,
        scalingTarget: 8,
        challengeTypes: ['1-step', '2-step'],
        accountSizes: [10000, 25000, 50000, 100000]
      }
    },
    {
      name: 'Fidelcrest',
      logo: '🛡️',
      description: 'Reliable prop firm with consistent evaluation process',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 10,
        profitTarget: 10,
        minTradingDays: 10,
        maxPositionSize: 2,
        scalingTarget: 10,
        challengeTypes: ['2-step'],
        accountSizes: [10000, 25000, 50000, 100000, 200000]
      }
    },
    {
      name: 'Alpha Capital Group',
      logo: '🅰️',
      description: 'Professional prop firm with advanced risk management',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 8,
        profitTarget: 8,
        minTradingDays: 5,
        maxPositionSize: 2,
        scalingTarget: 8,
        challengeTypes: ['1-step', '2-step'],
        accountSizes: [25000, 50000, 100000, 200000]
      }
    },
    {
      name: 'Instant Funding Prop',
      logo: '⚡',
      description: 'Instant funding with no evaluation required',
      rules: {
        dailyLoss: 3,
        maxDrawdown: 6,
        profitTarget: 0,
        minTradingDays: 0,
        maxPositionSize: 1,
        scalingTarget: 0,
        challengeTypes: ['instant-funding'],
        accountSizes: [5000, 10000, 25000, 50000]
      }
    },
    {
      name: 'Traders Central',
      logo: '🎯',
      description: 'Community-focused prop firm with social trading',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 10,
        profitTarget: 8,
        minTradingDays: 5,
        maxPositionSize: 2,
        scalingTarget: 8,
        challengeTypes: ['1-step', '2-step'],
        accountSizes: [10000, 25000, 50000, 100000]
      }
    },
    {
      name: 'Maven Trading',
      logo: '📚',
      description: 'Educational prop firm with comprehensive training',
      rules: {
        dailyLoss: 4,
        maxDrawdown: 8,
        profitTarget: 8,
        minTradingDays: 5,
        maxPositionSize: 2,
        scalingTarget: 8,
        challengeTypes: ['1-step', '2-step'],
        accountSizes: [25000, 50000, 100000]
      }
    },
    {
      name: 'Rocket21',
      logo: '🚀',
      description: 'Fast-track prop firm with quick evaluation',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 8,
        profitTarget: 6,
        minTradingDays: 3,
        maxPositionSize: 2,
        scalingTarget: 6,
        challengeTypes: ['1-step'],
        accountSizes: [10000, 25000, 50000, 100000]
      }
    },
    {
      name: 'OFP (Our Funded Prop)',
      logo: '🏢',
      description: 'Established prop firm with traditional approach',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 10,
        profitTarget: 10,
        minTradingDays: 10,
        maxPositionSize: 2,
        scalingTarget: 10,
        challengeTypes: ['2-step'],
        accountSizes: [10000, 25000, 50000, 100000, 200000]
      }
    }
  ];

  const filteredFirms = propFirms.filter(firm =>
    firm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    firm.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedFirm) {
      const firm = propFirms.find(f => f.name === selectedFirm);
      if (firm) {
        updatePropFirm(firm);
        navigate('/setup/account');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <Header />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 text-blue-400 mb-4">
              <Building className="w-6 h-6" />
              <span className="text-sm font-medium">Step 1 of 5</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Select Your Prop Firm</h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Choose from 25+ supported prop firms. We'll automatically extract their rules and requirements.
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search prop firms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Prop Firms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredFirms.map((firm, index) => (
              <div
                key={index}
                onClick={() => setSelectedFirm(firm.name)}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:transform hover:scale-105 ${
                  selectedFirm === firm.name
                    ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/25'
                    : 'border-gray-700 bg-gray-800/60 hover:border-gray-600'
                } ${firm.popular ? 'ring-2 ring-yellow-500/50' : ''}`}
              >
                {firm.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                      POPULAR
                    </div>
                  </div>
                )}

                {selectedFirm === firm.name && (
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-blue-500 rounded-full p-1">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <div className="text-4xl mb-4">{firm.logo}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{firm.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{firm.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Daily Loss:</span>
                      <span className="text-white">{firm.rules.dailyLoss}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Max Drawdown:</span>
                      <span className="text-white">{firm.rules.maxDrawdown}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Profit Target:</span>
                      <span className="text-white">{firm.rules.profitTarget}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Challenge Types:</span>
                      <span className="text-white">{firm.rules.challengeTypes.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Firm Details */}
          {selectedFirm && (
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                {selectedFirm} - Detailed Rules
              </h3>
              
              {(() => {
                const firm = propFirms.find(f => f.name === selectedFirm);
                if (!firm) return null;
                
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-700/50 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-3">Risk Limits</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Daily Loss Limit:</span>
                          <span className="text-red-400">{firm.rules.dailyLoss}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Max Drawdown:</span>
                          <span className="text-red-400">{firm.rules.maxDrawdown}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Max Position Size:</span>
                          <span className="text-yellow-400">{firm.rules.maxPositionSize}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-700/50 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-3">Targets</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Profit Target:</span>
                          <span className="text-green-400">{firm.rules.profitTarget}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Min Trading Days:</span>
                          <span className="text-blue-400">{firm.rules.minTradingDays}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Scaling Target:</span>
                          <span className="text-green-400">{firm.rules.scalingTarget}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-700/50 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-3">Available Options</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Challenge Types:</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {firm.rules.challengeTypes.map((type, idx) => (
                              <span key={idx} className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Account Sizes:</span>
                          <div className="mt-1 text-white">
                            ${firm.rules.accountSizes[0].toLocaleString()} - ${firm.rules.accountSizes[firm.rules.accountSizes.length - 1].toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            
            <button
              onClick={handleContinue}
              disabled={!selectedFirm}
              className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                selectedFirm
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropFirmSelection;