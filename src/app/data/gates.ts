export interface Gate {
  id: string;
  name: string;
  location: string;
  status: 'Open' | 'Closed' | 'Maintenance';
  latitude: number;
  longitude: number;
  cctvFeeds: {
    id: string;
    name: string;
  }[];
  sensors: {
    name: string;
    health: number;
    status: 'Good' | 'Warning' | 'Error';
  }[];
  logs: {
    timestamp: string;
    action: string;
    user: string;
  }[];
}

export const gates: Gate[] = [
  {
    id: 'G001',
    name: 'Gate 1 - Central Station',
    location: 'Jakarta Central, KM 12.5',
    status: 'Open',
    latitude: -6.1751,
    longitude: 106.8650,
    cctvFeeds: [
      { id: 'CAM1A', name: 'Track View North' },
      { id: 'CAM1B', name: 'Track View South' }
    ],
    sensors: [
      { name: 'Gate Motor', health: 95, status: 'Good' },
      { name: 'Barrier Sensor', health: 88, status: 'Good' },
      { name: 'Track Sensor', health: 92, status: 'Good' },
      { name: 'Communication', health: 78, status: 'Warning' }
    ],
    logs: [
      { timestamp: '2025-12-18 14:32', action: 'Gate Opened', user: 'Auto System' },
      { timestamp: '2025-12-18 14:28', action: 'Train Detected', user: 'Track Sensor' },
      { timestamp: '2025-12-18 14:15', action: 'Gate Closed', user: 'Auto System' }
    ]
  },
  {
    id: 'G002',
    name: 'Gate 2 - Bekasi Line',
    location: 'Bekasi West, KM 24.8',
    status: 'Closed',
    latitude: -6.2349,
    longitude: 106.9896,
    cctvFeeds: [
      { id: 'CAM2A', name: 'East Approach' },
      { id: 'CAM2B', name: 'West Approach' }
    ],
    sensors: [
      { name: 'Gate Motor', health: 100, status: 'Good' },
      { name: 'Barrier Sensor', health: 100, status: 'Good' },
      { name: 'Track Sensor', health: 100, status: 'Good' },
      { name: 'Communication', health: 96, status: 'Good' }
    ],
    logs: [
      { timestamp: '2025-12-18 14:35', action: 'Gate Closed', user: 'Auto System' },
      { timestamp: '2025-12-18 14:30', action: 'Train Passed', user: 'Track Sensor' },
      { timestamp: '2025-12-18 14:25', action: 'Gate Opened', user: 'Auto System' }
    ]
  },
  {
    id: 'G003',
    name: 'Gate 3 - Tangerang Junction',
    location: 'Tangerang South, KM 18.2',
    status: 'Maintenance',
    latitude: -6.2088,
    longitude: 106.6405,
    cctvFeeds: [
      { id: 'CAM3A', name: 'Junction View' },
      { id: 'CAM3B', name: 'Road View' }
    ],
    sensors: [
      { name: 'Gate Motor', health: 45, status: 'Error' },
      { name: 'Barrier Sensor', health: 65, status: 'Warning' },
      { name: 'Track Sensor', health: 88, status: 'Good' },
      { name: 'Communication', health: 92, status: 'Good' }
    ],
    logs: [
      { timestamp: '2025-12-18 14:40', action: 'Maintenance Started', user: 'Tech Team A' },
      { timestamp: '2025-12-18 13:45', action: 'Motor Fault Detected', user: 'Auto System' },
      { timestamp: '2025-12-18 13:30', action: 'Gate Opened', user: 'Auto System' }
    ]
  },
  {
    id: 'G004',
    name: 'Gate 4 - Depok Crossing',
    location: 'Depok City, KM 32.1',
    status: 'Open',
    latitude: -6.4025,
    longitude: 106.8194,
    cctvFeeds: [
      { id: 'CAM4A', name: 'North Track' },
      { id: 'CAM4B', name: 'South Track' }
    ],
    sensors: [
      { name: 'Gate Motor', health: 82, status: 'Good' },
      { name: 'Barrier Sensor', health: 90, status: 'Good' },
      { name: 'Track Sensor', health: 85, status: 'Good' },
      { name: 'Communication', health: 88, status: 'Good' }
    ],
    logs: [
      { timestamp: '2025-12-18 14:38', action: 'Gate Opened', user: 'Auto System' },
      { timestamp: '2025-12-18 14:35', action: 'Train Approaching', user: 'Track Sensor' },
      { timestamp: '2025-12-18 14:20', action: 'Gate Closed', user: 'Auto System' }
    ]
  },
  {
    id: 'G005',
    name: 'Gate 5 - Bogor Terminal',
    location: 'Bogor North, KM 45.3',
    status: 'Closed',
    latitude: -6.5971,
    longitude: 106.8060,
    cctvFeeds: [
      { id: 'CAM5A', name: 'Terminal View' },
      { id: 'CAM5B', name: 'Barrier View' }
    ],
    sensors: [
      { name: 'Gate Motor', health: 94, status: 'Good' },
      { name: 'Barrier Sensor', health: 96, status: 'Good' },
      { name: 'Track Sensor', health: 91, status: 'Good' },
      { name: 'Communication', health: 89, status: 'Good' }
    ],
    logs: [
      { timestamp: '2025-12-18 14:42', action: 'Gate Closed', user: 'Auto System' },
      { timestamp: '2025-12-18 14:38', action: 'Train Passed', user: 'Track Sensor' },
      { timestamp: '2025-12-18 14:33', action: 'Gate Opened', user: 'Auto System' }
    ]
  }
];
