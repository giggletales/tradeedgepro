import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, TrendingUp, Bell, User, LogOut, Settings } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, setUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const userMenuElement = document.getElementById('user-menu');
      if (userMenuElement && !userMenuElement.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
    setShowUserMenu(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getMembershipBadge = (tier: string) => {
    const badges = {
      elite: { color: 'bg-purple-600', text: 'ELITE' },
      institutional: { color: 'bg-yellow-600', text: 'INST' },
      professional: { color: 'bg-blue-600', text: 'PRO' },
      basic: { color: 'bg-gray-600', text: 'BASIC' }
    };
    return badges[tier as keyof typeof badges] || badges.basic;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-950/95 backdrop-blur-md border-b border-gray-800 shadow-lg' 
        : 'bg-gray-950/80 backdrop-blur-sm border-b border-gray-800/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <TrendingUp className="w-7 h-7 text-green-400 group-hover:text-green-300 transition-colors" />
              <div className="absolute -inset-1 bg-green-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
              TraderEdge Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-green-400' 
                  : 'text-gray-300 hover:text-green-400'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/membership" 
              className={`font-medium transition-colors ${
                isActive('/membership') 
                  ? 'text-green-400' 
                  : 'text-gray-300 hover:text-green-400'
              }`}
            >
              Pricing
            </Link>
            <a 
              href="#features" 
              className="text-gray-300 hover:text-green-400 transition-colors font-medium"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-gray-300 hover:text-green-400 transition-colors font-medium"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About
            </a>
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Notification Bell */}
                <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </button>

                {/* User Menu */}
                <div className="relative" id="user-menu">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className={`text-xs px-1.5 py-0.5 rounded ${getMembershipBadge(user.membershipTier).color} text-white`}>
                          {getMembershipBadge(user.membershipTier).text}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-1">
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <TrendingUp className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <div className="border-t border-gray-700 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-600/20 hover:text-red-300 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-green-400 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                >
                  Start Free Trial
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 rounded-b-lg">
              <nav className="flex flex-col space-y-2">
                <Link 
                  to="/" 
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/') 
                      ? 'text-green-400 bg-green-600/20' 
                      : 'text-gray-300 hover:text-green-400 hover:bg-gray-800'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  to="/membership" 
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/membership') 
                      ? 'text-green-400 bg-green-600/20' 
                      : 'text-gray-300 hover:text-green-400 hover:bg-gray-800'
                  }`}
                >
                  Pricing
                </Link>
                <a 
                  href="#features" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-green-400 hover:bg-gray-800 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Features
                </a>
                <a 
                  href="#about" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-green-400 hover:bg-gray-800 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  About
                </a>
                
                {/* Mobile Auth Section */}
                <div className="pt-4 border-t border-gray-700">
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-3 py-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{user.name}</div>
                            <div className={`text-xs px-1.5 py-0.5 rounded ${getMembershipBadge(user.membershipTier).color} text-white inline-block`}>
                              {getMembershipBadge(user.membershipTier).text}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/dashboard"
                        className="block px-3 py-2 rounded-md text-base font-medium bg-green-600 hover:bg-green-700 text-white transition-colors"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-red-600/20 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-green-400 hover:bg-gray-800 transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="block px-3 py-2 rounded-md text-base font-medium bg-green-600 hover:bg-green-700 text-white transition-colors"
                      >
                        Start Free Trial
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
