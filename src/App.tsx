import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MembershipPlans from './components/MembershipPlans';
import PropFirmSelection from './components/PropFirmSelection';
import AccountConfiguration from './components/AccountConfiguration';
import RiskConfiguration from './components/RiskConfiguration';
import TradingPlanGeneration from './components/TradingPlanGeneration';
import Dashboard from './components/Dashboard';
import { UserProvider } from './contexts/UserContext';
import { TradingPlanProvider } from './contexts/TradingPlanContext';

function App() {
  return (
    <UserProvider>
      <TradingPlanProvider>
        <Router>
          <div className="min-h-screen bg-gray-950">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/membership" element={<MembershipPlans />} />
              <Route path="/setup/prop-firm" element={<PropFirmSelection />} />
              <Route path="/setup/account" element={<AccountConfiguration />} />
              <Route path="/setup/risk" element={<RiskConfiguration />} />
              <Route path="/setup/plan" element={<TradingPlanGeneration />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </Router>
      </TradingPlanProvider>
    </UserProvider>
  );
}

export default App;