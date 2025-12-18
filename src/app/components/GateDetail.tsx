import { useState } from 'react';
import { ArrowLeft, Video, Lock, Unlock, AlertTriangle, Activity, Clock } from 'lucide-react';
import { Gate, gates } from '../data/gates';
import { Progress } from './ui/progress';

interface GateDetailProps {
  gateId: string;
  onBack: () => void;
}

export function GateDetail({ gateId, onBack }: GateDetailProps) {
  const gate = gates.find(g => g.id === gateId);
  const [isOperating, setIsOperating] = useState(false);

  if (!gate) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Gate not found</p>
      </div>
    );
  }

  const handleOperation = (action: string) => {
    setIsOperating(true);
    setTimeout(() => {
      setIsOperating(false);
      alert(`${action} command sent to ${gate.name}`);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Good':
        return 'text-green-600';
      case 'Warning':
        return 'text-yellow-600';
      case 'Error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#002D72] mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2">{gate.name}</h1>
              <p className="text-gray-600">{gate.location}</p>
            </div>
            <div className={`px-6 py-3 rounded-2xl border-2 ${
              gate.status === 'Open' ? 'bg-green-100 border-green-300 text-green-700' :
              gate.status === 'Closed' ? 'bg-red-100 border-red-300 text-red-700' :
              'bg-yellow-100 border-yellow-300 text-yellow-700'
            }`}>
              <p className="text-sm">Status</p>
              <p>{gate.status}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* CCTV Feed 1 */}
          <div className="bg-white rounded-3xl shadow-lg p-6 lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-[#002D72]" />
                <h3>{gate.cctvFeeds[0].name}</h3>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-red-50 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs text-red-700">LIVE</span>
              </div>
            </div>
            
            {/* Mock CCTV Feed with AI Overlay */}
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden">
              {/* Simulated camera feed background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
              
              {/* AI Detection Overlays */}
              <svg className="absolute inset-0 w-full h-full">
                {/* Bounding box 1 */}
                <rect x="20%" y="30%" width="25%" height="35%" fill="none" stroke="#22c55e" strokeWidth="2" />
                <text x="21%" y="28%" fill="#22c55e" fontSize="12">Vehicle Detected</text>
                
                {/* Bounding box 2 */}
                <rect x="55%" y="45%" width="20%" height="30%" fill="none" stroke="#eab308" strokeWidth="2" />
                <text x="56%" y="43%" fill="#eab308" fontSize="12">Pedestrian</text>
                
                {/* Detection lines */}
                <line x1="10%" y1="70%" x2="90%" y2="70%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
              
              {/* Camera info overlay */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
                <p className="text-white text-xs">{gate.cctvFeeds[0].id}</p>
                <p className="text-gray-300 text-xs">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>

          {/* CCTV Feed 2 */}
          <div className="bg-white rounded-3xl shadow-lg p-6 lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-[#002D72]" />
                <h3>{gate.cctvFeeds[1].name}</h3>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-red-50 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs text-red-700">LIVE</span>
              </div>
            </div>
            
            {/* Mock CCTV Feed with AI Overlay */}
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden">
              {/* Simulated camera feed background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
              
              {/* AI Detection Overlays */}
              <svg className="absolute inset-0 w-full h-full">
                {/* Track detection */}
                <rect x="15%" y="40%" width="70%" height="15%" fill="none" stroke="#3b82f6" strokeWidth="2" />
                <text x="16%" y="38%" fill="#3b82f6" fontSize="12">Track Clear</text>
                
                {/* Gate barrier */}
                <line x1="45%" y1="25%" x2="55%" y2="75%" stroke="#22c55e" strokeWidth="3" />
                <circle cx="45%" cy="25%" r="8" fill="#22c55e" />
              </svg>
              
              {/* Camera info overlay */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
                <p className="text-white text-xs">{gate.cctvFeeds[1].id}</p>
                <p className="text-gray-300 text-xs">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="bg-white rounded-3xl shadow-lg p-6 lg:col-span-1">
            <h3 className="mb-6">Control Center</h3>
            
            <div className="space-y-4">
              <button
                onClick={() => handleOperation('Manual Open')}
                disabled={isOperating || gate.status === 'Open'}
                className="w-full py-4 bg-[#002D72] text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-[#001f52] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:scale-105"
              >
                <Unlock className="w-5 h-5" />
                Manual Open
              </button>
              
              <button
                onClick={() => handleOperation('Manual Close')}
                disabled={isOperating || gate.status === 'Closed'}
                className="w-full py-4 bg-gray-500 text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:scale-105"
              >
                <Lock className="w-5 h-5" />
                Manual Close
              </button>
              
              <button
                onClick={() => handleOperation('Emergency Alarm')}
                disabled={isOperating}
                className="w-full py-4 bg-red-500 text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:scale-105"
              >
                <AlertTriangle className="w-5 h-5" />
                Trigger Alarm
              </button>
            </div>

            {isOperating && (
              <div className="mt-4 p-4 bg-blue-50 rounded-2xl">
                <p className="text-sm text-blue-700 text-center">Processing command...</p>
              </div>
            )}
          </div>
        </div>

        {/* Sensor Health & Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sensor Health */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-[#002D72]" />
              <h3>Sensor Health</h3>
            </div>
            
            <div className="space-y-6">
              {gate.sensors.map((sensor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{sensor.name}</span>
                    <span className={`text-sm ${getStatusColor(sensor.status)}`}>
                      {sensor.health}%
                    </span>
                  </div>
                  
                  {/* Circular progress representation using linear progress */}
                  <div className="relative">
                    <Progress 
                      value={sensor.health} 
                      className="h-3"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      sensor.status === 'Good' ? 'bg-green-500' :
                      sensor.status === 'Warning' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                    <span className={`text-xs ${getStatusColor(sensor.status)}`}>
                      {sensor.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Logs */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-[#002D72]" />
              <h3>Activity Logs</h3>
            </div>
            
            <div className="space-y-4">
              {gate.logs.map((log, index) => (
                <div key={index} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{log.action}</p>
                    <p className="text-xs text-gray-600 mt-1">{log.user}</p>
                    <p className="text-xs text-gray-400 mt-1">{log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
