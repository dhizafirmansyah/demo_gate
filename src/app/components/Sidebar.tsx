import { LayoutDashboard, Map, List, Settings } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'bg-blue-100 text-blue-600' },
    { id: 'map', icon: Map, label: 'Map View', color: 'bg-orange-100 text-orange-600' },
    { id: 'gates', icon: List, label: 'Gate List', color: 'bg-green-100 text-green-600' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'bg-purple-100 text-purple-600' }
  ];

  return (
    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 shadow-sm">
      <div className="mb-12">
        <div className="w-12 h-12 rounded-full bg-[#002D72] flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="white"/>
          </svg>
        </div>
      </div>
      
      <nav className="flex-1 space-y-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className="group flex flex-col items-center gap-1 relative"
            >
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isActive 
                    ? 'bg-[#002D72] text-white scale-110' 
                    : `${item.color} hover:scale-105`
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#002D72] rounded-l-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
