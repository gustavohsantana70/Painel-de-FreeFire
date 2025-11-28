import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AimAssist from './pages/AimAssist';
import Network from './pages/Network';
import Sensitivity from './pages/Sensitivity';
import Files from './pages/Files';
import Settings from './pages/Settings';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/aim-assist" element={<AimAssist />} />
          <Route path="/network" element={<Network />} />
          <Route path="/sensitivity" element={<Sensitivity />} />
          <Route path="/files" element={<Files />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;