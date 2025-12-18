import { Bell, Shield, Users, Database, Wifi } from 'lucide-react';

export function Settings() {
  const settingsSections = [
    {
      icon: Bell,
      color: 'bg-orange-100 text-orange-600',
      title: 'Notifications',
      description: 'Configure alert and notification preferences'
    },
    {
      icon: Shield,
      color: 'bg-blue-100 text-blue-600',
      title: 'Security',
      description: 'Manage access control and authentication'
    },
    {
      icon: Users,
      color: 'bg-green-100 text-green-600',
      title: 'User Management',
      description: 'Add or remove system operators'
    },
    {
      icon: Database,
      color: 'bg-purple-100 text-purple-600',
      title: 'Data Management',
      description: 'Configure data storage and backup'
    },
    {
      icon: Wifi,
      color: 'bg-red-100 text-red-600',
      title: 'Network Settings',
      description: 'Configure network and connectivity options'
    }
  ];

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Settings</h1>
          <p className="text-gray-600">Configure system preferences and options</p>
        </div>

        {/* Settings Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer hover:scale-105"
              >
                <div className={`w-16 h-16 rounded-full ${section.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="mb-2">{section.title}</h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </div>
            );
          })}
        </div>

        {/* System Information */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mt-6">
          <h3 className="mb-6">System Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-2xl">
              <p className="text-sm text-gray-600 mb-1">Version</p>
              <p>v2.5.3</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl">
              <p className="text-sm text-gray-600 mb-1">Last Update</p>
              <p>Dec 15, 2025</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl">
              <p className="text-sm text-gray-600 mb-1">Uptime</p>
              <p>45 days, 12 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
