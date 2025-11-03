import { Station } from './firebaseConfig'; // We can reuse the same type definition

export const mockStations: Station[] = [
  {
    id: 'station-1',
    name: 'Estación de Servicio Terpel Envigado',
    coordinates: { lat: 6.1738, lng: -75.5895 },
    price_per_liter: 3900, // Price in COP
    address: 'Cl. 38 Sur #43-50, Envigado, Antioquia',
    services: ['convenience store', 'car wash', 'ATM'],
    updated_at: '2025-11-02T10:00:00Z',
  },
  {
    id: 'station-2',
    name: 'Bomba Esso La Frontera',
    coordinates: { lat: 6.1799, lng: -75.5921 },
    price_per_liter: 4120, // Cheaper option
    address: 'Cra. 43A #21 Sur-15, Envigado, Antioquia',
    services: ['convenience store', 'tire service'],
    updated_at: '2025-11-03T08:30:00Z',
  },
  {
    id: 'station-3',
    name: 'Texaco Parque Envigado',
    coordinates: { lat: 6.1685, lng: -75.5953 },
    price_per_liter: 3999, // Slightly more expensive
    address: 'Cl. 37 Sur #39-12, Envigado, Antioquia',
    services: ['convenience store'],
    updated_at: '2025-11-03T11:00:00Z',
  },
  {
    id: 'station-4',
    name: 'Biomax El Dorado',
    coordinates: { lat: 6.1651, lng: -75.5842 },
    price_per_liter: 4090, // The cheapest
    address: 'Cra. 48 #32B Sur-13, Envigado, Antioquia',
    services: ['convenience store', 'car wash'],
    updated_at: '2025-11-01T14:00:00Z',
  },
  {
    id: 'station-5',
    name: 'Primax Villagrande',
    coordinates: { lat: 6.1588, lng: -75.6011 },
    price_per_liter: 4165,
    address: 'Dg. 40 #34d Sur-80, Envigado, Antioquia',
    services: ['convenience store', 'ATM'],
    updated_at: '2025-11-03T09:15:00Z',
  },
  {
    id: 'station-6',
    name: 'Biomax parque Envigado',
    coordinates: { lat: 6.174843, lng: -75.586468 },
    price_per_liter: 4000, // The cheapest
    address: 'Cl. 38 Sur, Envigado, Antioquia',
    services: ['convenience store', 'car wash'],
    updated_at: '2025-11-01T14:00:00Z',
  }
];