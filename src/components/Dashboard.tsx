import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Shield, 
  Bell, 
  Settings,
  LogOut,
  Activity,
  Target,
  Users,
  Zap,
  CreditCard,
  Bitcoin
} from 'lucide-react';
import { useTradingPlan } from '../contexts/TradingPlanContext';
import TradingChart from './TradingChart';
import SignalsFeed from './SignalsFeed';
import RiskManagement from './RiskManagement';
import PerformanceAnalytics from './PerformanceAnalytics';
import AlertSystem from './AlertSystem';
import PaymentModal from './PaymentModal';

const Dashboard = () => {
  const { propFirm, accountConfig, riskConfig, tradingPlan } = useTradingPlan();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // If no trading plan data, redirect to setup
  if (!propFirm || !accountConfig || !riskConfig) {
    navigate('/setup/prop-firm');
    return null;
  }

  const handleBackToSetup = () => {
    navigate('/');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'signals', label: 'Signals', icon: <Zap className="w-5 h-5" /> },
    { id: 'trading', label: 'Trading', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'risk', label: 'Risk Management', icon: <Shield className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <Activity className="w-5 h-5" /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard className="w-5 h-5" /> },
  ];

  // Calculate current stats based on trading plan
  const currentBalance = accountConfig.size;
  const profitTarget = (accountConfig.size * (propFirm.rules?.profitTarget || 10)) / 100;
  const currentProfit = tradingPlan ? 
    tradingPlan.trades.reduce((sum, trade) => sum + (trade.expectedReturn || 0), 0) * 0.3 : 0; // 30% progress simulation
  const winRate = 87.4; // Simulated win rate
  const riskScore = riskConfig.riskPercentage;
  const stats = [
    {
      label: 'Total Profit',
      value: `$${Math.round(currentProfit).toLocaleString()}`,
      change: `+${((currentProfit / currentBalance) * 100).toFixed(1)}%`,
      positive: true,
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      label: 'Win Rate',
      value: `${winRate}%`,
      change: '+2.1%',
      positive: true,
      icon: <Target className="w-6 h-6" />
    },
    {
      label: 'Active Signals',
      value: tradingPlan ? tradingPlan.trades.length.toString() : '0',
      change: '+5',
      positive: true,
      icon: <Zap className="w-6 h-6" />
    },
    {
      label: 'Risk Score',
      value: `${riskScore}%`,
      change: '-0.3%',
      positive: true,
      icon: <Shield className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-white">FundedFlow Pro</span>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-400">Trading Account</div>
            <div className="text-lg font-semibold text-white">{propFirm.name}</div>
            <div className="text-sm text-blue-400">${accountConfig.size.toLocaleString()} Account</div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            
            {activeTab === 'payments' && (
              <div className="space-y-6">
                {/* Payment Overview */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Payment Center</h3>
                  <p className="text-gray-400 mb-6">
                    Manage your subscription and make secure payments using credit cards or cryptocurrency.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Stripe Payment */}
                    <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                      <div className="flex items-center space-x-3 mb-4">
                        <CreditCard className="w-8 h-8 text-blue-400" />
                        <div>
                          <h4 className="text-lg font-semibold text-white">Credit Card Payment</h4>
                          <p className="text-sm text-gray-400">Powered by Stripe</p>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-300 space-y-2 mb-6">
                        <li>• Instant processing</li>
                        <li>• All major cards accepted</li>
                        <li>• 3D Secure authentication</li>
                        <li>• PCI DSS compliant</li>
                      </ul>
                      <button
                        onClick={() => setShowPaymentModal(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                      >
                        Pay with Card
                      </button>
                    </div>

                    {/* Coingate Payment */}
                    <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                      <div className="flex items-center space-x-3 mb-4">
                        <Bitcoin className="w-8 h-8 text-orange-400" />
                        <div>
                          <h4 className="text-lg font-semibold text-white">Cryptocurrency Payment</h4>
                          <p className="text-sm text-gray-400">Powered by Coingate</p>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-300 space-y-2 mb-6">
                        <li>• 70+ cryptocurrencies</li>
                        <li>• Lower transaction fees</li>
                        <li>• Blockchain security</li>
                        <li>• Real-time rates</li>
                      </ul>
                      <button
                        onClick={() => setShowPaymentModal(true)}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors"
                      >
                        Pay with Crypto
                      </button>
                    </div>
                  </div>
                </div>
            <button 
                {/* Payment History */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Payment History</h3>
                  <div className="space-y-4">
                    {/* Sample payment history */}
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-blue-400" />
                        <div>
                          <div className="text-white font-medium">Professional Plan</div>
                          <div className="text-sm text-gray-400">Jan 15, 2025</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">$99.00</div>
                        <div className="text-sm text-green-400">Completed</div>
                      </div>
                    </div>
                    
                    <div className="text-center py-8 text-gray-400">
                      <p>No additional payment history available</p>
                    </div>
                  </div>
                </div>
              onClick={handleBackToSetup}
                {/* Security Notice */}
                <div className="bg-blue-600/20 border border-blue-600 rounded-xl p-6">
                  <div className="flex items-center space-x-2 text-blue-400 mb-3">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold">Security & Privacy</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    All payments are processed securely through industry-leading payment processors. 
                    We never store your payment information and all transactions are encrypted with 
                    bank-level security.
                  </p>
                </div>
              </div>
            )}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
            >
              <Link to="/" className="flex items-center space-x-3">
                <LogOut className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </button>
          </div>
        </div>
        
        {/* Payment Modal */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          planName="TraderEdge Pro"
          planPrice={99}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white capitalize">{activeTab} Center</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">T</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Account Status */}
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Account Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      ${currentBalance.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Account Balance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      ${profitTarget.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Profit Target</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">
                      {accountConfig.challengeType.replace('-', ' ').toUpperCase()}
                    </div>
                    <div className="text-sm text-gray-400">Challenge Type</div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="text-gray-400">{stat.icon}</div>
                      <div className={`text-sm font-medium ${
                        stat.positive ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {stat.change}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trading Plan Summary */}
              {tradingPlan && (
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Current Trading Plan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Plan Overview</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Timeline:</span>
                          <span className="text-white">{tradingPlan.timeline.total} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Trades:</span>
                          <span className="text-white">{tradingPlan.trades.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Risk per Trade:</span>
                          <span className="text-white">{riskConfig.riskPercentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Risk:Reward:</span>
                          <span className="text-white">1:{riskConfig.riskRewardRatio}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Phase 1 Progress:</span>
                          <span className="text-blue-400">30%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                        <div className="text-xs text-gray-400 mt-2">
                          Current profit: ${Math.round(currentProfit).toLocaleString()} / ${profitTarget.toLocaleString()} target
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Signals</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((signal) => (
                      <div key={signal} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div>
                          <div className="text-white font-medium">EUR/USD</div>
                          <div className="text-sm text-gray-400">Long @ 1.0985</div>
                        </div>
                        <div className="text-green-400 font-semibold">+2.3%</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Market Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Sydney</span>
                      <span className="text-red-400">Closed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Tokyo</span>
                      <span className="text-red-400">Closed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">London</span>
                      <span className="text-green-400">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">New York</span>
                      <span className="text-green-400">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'signals' && <SignalsFeed />}
          {activeTab === 'trading' && <TradingChart />}
          {activeTab === 'risk' && <RiskManagement />}
          {activeTab === 'analytics' && <PerformanceAnalytics />}
          
          {/* Alert System - Available on all tabs */}
          {activeTab === 'trading' && (
            <div className="mt-6">
              <AlertSystem />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;