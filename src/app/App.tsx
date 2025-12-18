import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { GateDetail } from './components/GateDetail';
import { GateList } from './components/GateList';
import { Settings } from './components/Settings';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'map' | 'gates' | 'settings'>('dashboard');
  const [selectedGateId, setSelectedGateId] = useState<string | null>(null);

  const handleGateSelect = (gateId: string) => {
    setSelectedGateId(gateId);
  };

  const handleBackToDashboard = () => {
    setSelectedGateId(null);
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    // If a gate is selected, show the detail view
    if (selectedGateId) {
      return <GateDetail gateId={selectedGateId} onBack={handleBackToDashboard} />;
    }

    // Otherwise, show the current view
    switch (currentView) {
      case 'dashboard':
      case 'map':
        return <Dashboard onGateSelect={handleGateSelect} />;
      case 'gates':
        return <GateList onGateSelect={handleGateSelect} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onGateSelect={handleGateSelect} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      {renderContent()}
    </div>
  );
}
