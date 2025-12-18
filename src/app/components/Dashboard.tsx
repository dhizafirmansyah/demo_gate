import { useState, useEffect } from 'react';
import { Train, Activity } from 'lucide-react';
import { Gate, gates } from '../data/gates';

interface DashboardProps {
  onGateSelect: (gateId: string) => void;
}

export function Dashboard({ onGateSelect }: DashboardProps) {
  const [trainPosition, setTrainPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrainPosition((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Closed':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Railway Gate Monitoring System</h1>
          <p className="text-gray-600">Real-time monitoring and control dashboard</p>
        </div>

        {/* Map Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2>Live Map View</h2>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
              <Activity className="w-4 h-4 text-green-600 animate-pulse" />
              <span className="text-sm text-green-700">Live</span>
            </div>
          </div>
          
          {/* Mock Map with Railway Track */}
          <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl overflow-hidden">
            {/* Grid lines to simulate map */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(10)].map((_, i) => (
                <div key={`h-${i}`} className="absolute w-full border-t border-gray-300" style={{ top: `${i * 10}%` }} />
              ))}
              {[...Array(10)].map((_, i) => (
                <div key={`v-${i}`} className="absolute h-full border-l border-gray-300" style={{ left: `${i * 10}%` }} />
              ))}
            </div>

            {/* Railway Track (curved path) */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <path
                d="M 50 50 Q 200 100, 400 150 T 800 250 Q 950 280, 1100 300"
                stroke="#002D72"
                strokeWidth="6"
                fill="none"
                strokeDasharray="12 8"
                opacity="0.6"
              />
              <path
                d="M 50 60 Q 200 110, 400 160 T 800 260 Q 950 290, 1100 310"
                stroke="#002D72"
                strokeWidth="6"
                fill="none"
                strokeDasharray="12 8"
                opacity="0.6"
              />
            </svg>

            {/* Gate Markers with Radius */}
            {gates.map((gate, index) => {
              const positions = [
                { left: '15%', top: '25%' },
                { left: '35%', top: '40%' },
                { left: '50%', top: '55%' },
                { left: '70%', top: '50%' },
                { left: '85%', top: '65%' }
              ];
              const pos = positions[index] || { left: '50%', top: '50%' };

              return (
                <div
                  key={gate.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: pos.left, top: pos.top }}
                >
                  {/* 500m Radius Circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-blue-300 bg-blue-100 opacity-30" />
                  
                  {/* Gate Marker */}
                  <button
                    onClick={() => onGateSelect(gate.id)}
                    className="relative z-10 w-10 h-10 rounded-full bg-white shadow-lg border-2 flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ borderColor: gate.status === 'Open' ? '#22c55e' : gate.status === 'Closed' ? '#ef4444' : '#eab308' }}
                  >
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: gate.status === 'Open' ? '#22c55e' : gate.status === 'Closed' ? '#ef4444' : '#eab308' }}
                    />
                  </button>
                  
                  {/* Gate Label */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-white px-3 py-1 rounded-full shadow-md border border-gray-200">
                      <p className="text-xs">{gate.name.split(' - ')[0]}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Animated Train Icon */}
            <div
              className="absolute transition-all duration-100 ease-linear transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                left: `${15 + trainPosition * 0.7}%`,
                top: `${25 + Math.sin(trainPosition * 0.1) * 15}%`
              }}
            >
              <div className="bg-[#002D72] rounded-lg p-2 shadow-lg">
                <Train className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Gate Status Table */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="mb-6">Gate Status Overview</h2>
          
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-gray-600">Gate ID</th>
                  <th className="text-left py-4 px-4 text-gray-600">Gate Name</th>
                  <th className="text-left py-4 px-4 text-gray-600">Location</th>
                  <th className="text-left py-4 px-4 text-gray-600">Status</th>
                  <th className="text-left py-4 px-4 text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {gates.map((gate) => (
                  <tr key={gate.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{gate.id}</span>
                    </td>
                    <td className="py-4 px-4">{gate.name}</td>
                    <td className="py-4 px-4 text-gray-600">{gate.location}</td>
                    <td className="py-4 px-4">
                      <span className={`px-4 py-2 rounded-full border ${getStatusColor(gate.status)}`}>
                        {gate.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => onGateSelect(gate.id)}
                        className="px-4 py-2 bg-[#002D72] text-white rounded-full hover:bg-[#001f52] transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
