import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Zap
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import TradingChart from './TradingChart';
import SignalsFeed from './SignalsFeed';
import RiskManagement from './RiskManagement';
import PerformanceAnalytics from './PerformanceAnalytics';
import AlertSystem from './AlertSystem';

const Dashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'signals', label: 'Signals', icon: <Zap className="w-5 h-5" /> },
    { id: 'trading', label: 'Trading', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'risk', label: 'Risk Management', icon: <Shield className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <Activity className="w-5 h-5" /> },
  ];

  const stats = [
    {
      label: 'Total Profit',
      value: '$47,230',
      change: '+12.3%',
      positive: true,
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      label: 'Win Rate',
      value: '87.4%',
      change: '+2.1%',
      positive: true,
      icon: <Target className="w-6 h-6" />
    },
    {
      label: 'Active Signals',
      value: '24',
      change: '+5',
      positive: true,
      icon: <Zap className="w-6 h-6" />
    },
    {
      label: 'Risk Score',
      value: '2.1%',
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
            <span className="text-xl font-bold text-white">TraderEdge Pro</span>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-400">Welcome back,</div>
            <div className="text-lg font-semibold text-white">{user.name}</div>
            <div className="text-sm text-blue-400 capitalize">{user.membershipTier} Member</div>
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
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
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
                <span className="text-white font-semibold text-sm">{user.name.charAt(0)}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
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