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
      description: 'Leading prop firm with multiple account types and scaling up to $2M',
      rules: {
        dailyLoss: 5, // 5% of initial balance
        maxDrawdown: 10, // 10% of initial balance
        profitTarget: 10, // 10% Phase 1, 5% Phase 2
        phase2Target: 5,
        minTradingDays: 10, // 10 days per phase
        maxPositionSize: 2,
        scalingTarget: 10,
        challengeTypes: ['FTMO Challenge (Standard)', 'FTMO Swing Trading', 'FTMO Aggressive'],
        accountSizes: [10000, 25000, 50000, 100000, 200000],
        timeLimit: 30, // 30 days Phase 1, 60 days Phase 2
        leverage: 100, // 1:100 standard, 1:30 swing
        profitSplit: 80, // 80% trader, 90% after first withdrawal
        payoutSchedule: 'Bi-weekly',
        overnightPositions: false, // Forbidden on standard
        newsTrading: false, // Forbidden on standard
        weekendHolding: false,
        consistencyRule: true, // No single day >50% of total profit
        prohibitedStrategies: ['Martingale', 'Grid Trading', 'Latency Arbitrage', 'Tick Scalping EAs'],
        platforms: ['MetaTrader 4/5', 'cTrader', 'DXTrade'],
        instruments: ['Forex', 'Indices', 'Commodities', 'Crypto', 'Stocks'],
        resetPolicy: true,
        maxScaling: 2000000
      },
      popular: true
    },
    {
      name: 'Goat Funded Trader',
      logo: '🐐',
      description: 'No time limit challenges with unlimited resets',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 10,
        profitTarget: 10,
        phase2Target: 5,
        minTradingDays: 3,
        maxPositionSize: 3,
        scalingTarget: 10,
        challengeTypes: ['Two-Step No-Time-Limit', 'Two-Step Swing+', 'Two-Step Goat Challenge', 'Instant Funding'],
        accountSizes: [2500, 5000, 10000, 25000, 50000, 100000, 200000],
        timeLimit: null, // No time limit
        leverage: 100,
        profitSplit: 80, // Upgradeable to 100%
        payoutSchedule: 'Bi-weekly',
        overnightPositions: 'swing_only', // Allowed on Swing+ only
        newsTrading: true,
        weekendHolding: 'swing_only',
        prohibitedStrategies: ['Martingale', 'Latency Arbitrage', 'Copy Trading from External'],
        platforms: ['MetaTrader 4/5'],
        instruments: ['Forex', 'Gold', 'Indices'],
        resetPolicy: 'unlimited',
        scaling: '25% every 4 months'
      }
    },
    {
      name: 'The5%ers',
      logo: '🎯',
      description: 'Bootcamp program scaling from $20K to $4M with 100% profit split',
      rules: {
        dailyLoss: 0, // None on Bootcamp, 4% on Hyper Growth
        maxDrawdown: 5, // 5% per step Bootcamp, 8% Hyper Growth
        profitTarget: 6,
        phase2Target: 6,
        minTradingDays: 0,
        maxPositionSize: 1,
        scalingTarget: 6,
        challengeTypes: ['Bootcamp Program', 'Hyper Growth Challenge', 'High Stakes Trader'],
        accountSizes: [20000, 6000, 25000], // Starting amounts
        timeLimit: 365, // 12 months Bootcamp, 4 months Hyper Growth
        leverage: 10, // 1:10 Bootcamp, 1:100 others
        profitSplit: 50, // 50% → 75% → 100% progression
        payoutSchedule: 'Monthly',
        overnightPositions: true,
        newsTrading: true,
        weekendHolding: true,
        mandatoryStopLoss: true, // ≤2% of equity
        prohibitedStrategies: ['High-Frequency Trading', 'Latency Arbitrage'],
        platforms: ['MetaTrader 4/5'],
        instruments: ['Forex', 'Indices', 'Commodities'],
        inactivityRule: 30, // >30 days closes account
        scaling: 'Account doubles at profit milestones',
        maxScaling: 4000000
      }
    },
    {
      name: 'Apex Trader Funding',
      logo: '⚡',
      description: 'Futures-only prop firm with 100% profit on first $25K',
      rules: {
        dailyLoss: 0, // No daily loss limit
        maxDrawdown: 'trailing', // Trailing threshold varies
        profitTarget: 'varies', // $1,500 ($25K), $3,000 ($50K), etc.
        minTradingDays: 0,
        maxPositionSize: 10,
        challengeTypes: ['$25K Evaluation', '$50K Evaluation', '$100K Evaluation', '$150K Evaluation', '$250K Evaluation', '$300K Evaluation'],
        accountSizes: [25000, 50000, 100000, 150000, 250000, 300000],
        timeLimit: null, // Monthly subscription
        leverage: 'futures_standard',
        profitSplit: 100, // 100% first $25K, then 90%
        payoutSchedule: '8-day cycle',
        overnightPositions: true,
        newsTrading: true,
        weekendHolding: true,
        copyTrading: true, // Up to 20 accounts
        algorithmicTrading: true,
        platforms: ['Tradovate', 'Rithmic'],
        instruments: ['Futures Only (ES, NQ, YM, RTY, CL, GC)'],
        resetPolicy: true
      }
    },
    {
      name: 'MyFundedFX',
      logo: '💰',
      description: 'Flexible evaluation with up to 92.75% profit split',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 10,
        profitTarget: 8,
        phase2Target: 5,
        minTradingDays: 3,
        maxPositionSize: 2,
        scalingTarget: 8,
        challengeTypes: ['Two-Step Challenge', 'One-Step Challenge', 'Instant Funding (Accelerated)'],
        accountSizes: [25000, 50000, 100000, 200000, 300000],
        timeLimit: null, // No time limit
        leverage: 100,
        profitSplit: 80, // Up to 92.75% VIP
        payoutSchedule: 'Bi-weekly',
        overnightPositions: 'swing_only',
        newsTrading: true,
        weekendHolding: 'swing_only',
        eaTrading: true,
        prohibitedStrategies: ['Arbitrage', 'Tick Scalping Bots', 'Latency Trading'],
        platforms: ['MetaTrader 4/5', 'cTrader'],
        instruments: ['Forex', 'Indices', 'Commodities', 'Crypto'],
        scaling: '25% quarterly increase',
        resetPolicy: true
      }
    },
    {
      name: 'FundedNext',
      logo: '🚀',
      description: 'Scaling up to $4M with 95% profit split on Stellar accounts',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 10,
        profitTarget: 10,
        phase2Target: 5,
        minTradingDays: 0,
        maxPositionSize: 2,
        scalingTarget: 10,
        challengeTypes: ['Two-Phase Evaluation', 'Stellar 1-Step', 'Express Challenge', 'Consistency Challenge'],
        accountSizes: [6000, 15000, 25000, 50000, 100000, 200000],
        timeLimit: 60, // 60 days Phase 1, unlimited Phase 2
        leverage: 100,
        profitSplit: 60, // 60%-95%, Stellar starts at 90%
        payoutSchedule: 'Bi-weekly',
        overnightPositions: true,
        newsTrading: true,
        weekendHolding: true,
        prohibitedStrategies: ['Martingale', 'Latency Arbitrage', 'High-Frequency Scalping'],
        platforms: ['MetaTrader 4/5', 'cTrader'],
        instruments: ['100+ Forex Pairs', 'Indices', 'Commodities', 'Crypto'],
        scaling: '25% increase every 4 months',
        resetPolicy: true,
        maxScaling: 4000000
      }
    },
    {
      name: 'Topstep',
      logo: '📈',
      description: 'Futures-only with 100% profit on first $10K',
      rules: {
        dailyLoss: 'varies', // $1,000 ($50K), $2,000 ($100K), $3,000 ($150K)
        maxDrawdown: 'trailing', // Same as daily loss limits
        profitTarget: 'varies', // $3,000 ($50K), $6,000 ($100K), $9,000 ($150K)
        minTradingDays: 5,
        maxPositionSize: 10,
        challengeTypes: ['Trading Combine $50K', 'Trading Combine $100K', 'Trading Combine $150K'],
        accountSizes: [50000, 100000, 150000],
        timeLimit: null,
        leverage: 'futures_standard',
        profitSplit: 100, // 100% first $10K, then 90%
        payoutSchedule: 'Varies',
        overnightPositions: true,
        newsTrading: false, // Forbidden 1 min before/after high-impact news
        weekendHolding: true,
        platforms: ['Tradovate', 'Rithmic', 'NinjaTrader'],
        instruments: ['CME Futures Only'],
        resetPolicy: true
      }
    },
    {
      name: 'DNA Funded',
      logo: '🧬',
      description: 'Demo account with live mirroring, 800+ instruments',
      rules: {
        dailyLoss: 'varies', // 5% (One-Step), 6% (Two-Step), 4% (10-Day)
        maxDrawdown: 'varies', // 6% (One-Step), 10% (Two-Step), 5% (10-Day)
        profitTarget: 8,
        minTradingDays: 3,
        maxPositionSize: 2,
        scalingTarget: 8,
        challengeTypes: ['One-Step Challenge', 'Two-Step Challenge', '10-Day Challenge'],
        accountSizes: [5000, 10000, 25000, 50000, 100000, 200000],
        timeLimit: null, // No time cap
        leverage: 'varies', // 1:30 (One-Step), 1:50 (Two-Step)
        profitSplit: 80, // 80%-90%
        payoutSchedule: '14-day (7-day add-on available)',
        overnightPositions: true,
        newsTrading: true,
        weekendHolding: true,
        eaTrading: true,
        prohibitedStrategies: ['HFT', 'Grid Trading', 'Hedging', 'Latency Arbitrage'],
        platforms: ['MetaTrader 4/5'],
        instruments: ['800+ Instruments'],
        fundedStage: 'Demo with live mirroring',
        portfolioCap: 600000
      }
    },
    {
      name: 'FundingPips',
      logo: '💧',
      description: 'Scaling up to $2M with 100% profit split option',
      rules: {
        dailyLoss: 'varies', // 5% (standard), 3% (Pro), 5% (Zero)
        maxDrawdown: 'varies', // 10% (standard), 6% (Pro), 10% (Zero)
        profitTarget: 'varies', // 8%/5% (Two-Step), 6%/6% (Pro), 10% (One-Step)
        minTradingDays: 3,
        maxPositionSize: 2,
        challengeTypes: ['Two-Step Challenge', 'Two-Step Pro Challenge', 'One-Step Challenge', 'Zero Program (Instant)'],
        accountSizes: [5000, 10000, 25000, 50000, 100000],
        timeLimit: 'varies', // No limit on Pro, 30 days others
        leverage: 100,
        profitSplit: 80, // Up to 100% monthly on One-Step, 95% on Zero
        payoutSchedule: 'Bi-weekly',
        overnightPositions: true,
        newsTrading: true,
        weekendHolding: true,
        eaTrading: true,
        prohibitedStrategies: ['Copy-trading from external accounts'],
        platforms: ['MetaTrader 4/5'],
        instruments: ['Major Forex', 'Indices', 'Commodities'],
        maxScaling: 2000000
      }
    },
    {
      name: 'BrightFunded',
      logo: '☀️',
      description: 'Trade2Earn loyalty program with up to 100% profit split',
      rules: {
        dailyLoss: 5,
        maxDrawdown: 10,
        profitTarget: 'varies', // 10%/5% (Classic), 10% (Rapid), None (Instant)
        minTradingDays: 'varies', // 5 days (Classic), 1 day (Rapid)
        maxPositionSize: 2,
        challengeTypes: ['Classic Challenge', 'Rapid Challenge', 'Instant Challenge'],
        accountSizes: [5000, 10000, 25000, 50000, 100000, 200000],
        timeLimit: 30, // 30 days per phase
        leverage: 100,
        profitSplit: 100, // Up to 100%
        payoutSchedule: 'Bi-weekly',
        overnightPositions: true,
        newsTrading: true,
        weekendHolding: true,
        trade2EarnProgram: true,
        platforms: ['MetaTrader 4/5'],
        instruments: ['Forex', 'Indices', 'Commodities', 'Crypto'],
        resetPolicy: true
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