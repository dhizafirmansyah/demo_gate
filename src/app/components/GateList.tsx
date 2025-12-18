import { Search, MapPin } from 'lucide-react';
import { Gate, gates } from '../data/gates';
import { useState } from 'react';

interface GateListProps {
  onGateSelect: (gateId: string) => void;
}

export function GateList({ onGateSelect }: GateListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGates = gates.filter(gate =>
    gate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gate.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-500';
      case 'Closed':
        return 'bg-red-500';
      case 'Maintenance':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Gate List</h1>
          <p className="text-gray-600">Browse and manage all railway gates</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by gate name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#002D72] focus:border-transparent"
            />
          </div>
        </div>

        {/* Gate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGates.map((gate) => (
            <div
              key={gate.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => onGateSelect(gate.id)}
            >
              {/* Card Header with Status */}
              <div className="bg-gradient-to-br from-[#002D72] to-[#004a9c] p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className={`px-4 py-2 rounded-full border ${getStatusColor(gate.status)}`}>
                    {gate.status}
                  </div>
                </div>
                
                <h3 className="mb-2">{gate.name}</h3>
                <p className="text-sm text-blue-100">{gate.id}</p>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">{gate.location}</p>
                </div>

                {/* Sensor Status Summary */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-3">Sensor Health</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {gate.sensors.map((sensor, index) => {
                      const statusColor = sensor.status === 'Good' ? 'bg-green-500' :
                                        sensor.status === 'Warning' ? 'bg-yellow-500' : 'bg-red-500';
                      return (
                        <div key={index} className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full">
                          <div className={`w-2 h-2 rounded-full ${statusColor}`} />
                          <span className="text-xs text-gray-700">{sensor.health}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => onGateSelect(gate.id)}
                  className="w-full py-3 bg-[#002D72] text-white rounded-2xl hover:bg-[#001f52] transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredGates.length === 0 && (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <p className="text-gray-500">No gates found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
