'use client';

import MapComponent from '@/components/map/Map';
import StationInfo from '@/components/map/StationInfo';
import { Station } from '@/lib/firebaseConfig';
import { FilterType } from '@/hooks/useStationFilters';

interface GasStationDashboardProps {
  userLocation: google.maps.LatLngLiteral | null;
  stations: Station[];
  allStations: Station[];
  filter: FilterType;
  onFilterChange: (nextFilter: FilterType) => void;
  onMarkerClick: (station: Station) => void;
  selectedStation: Station | null;
  onStartRoute: () => void;
  directions: google.maps.DirectionsResult | null;
  loading: boolean;
  error: string | null;
  locationError: string | null;
  isRouteReady: boolean;
}

export const GasStationDashboard = ({
  userLocation,
  stations,
  allStations,
  filter,
  onFilterChange,
  onMarkerClick,
  selectedStation,
  onStartRoute,
  directions,
  loading,
  error,
  locationError,
  isRouteReady
}: GasStationDashboardProps) => {
  return (
    <div className="relative h-screen">
      <MapComponent
        userLocation={userLocation}
        stations={stations}
        onMarkerClick={onMarkerClick}
        directions={directions}
        selectedStation={selectedStation}
      />
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-4">
        <div className="bg-white text-black p-2 rounded-md shadow-lg">
          <select
            value={filter}
            onChange={event => onFilterChange(event.target.value as FilterType)}
            className="p-2 border rounded-md"
          >
            <option value="nearest">Más cercano</option>
            <option value="cheapest">Más barato</option>
            <option value="best_value">Mejor valor</option>
          </select>
        </div>
        {selectedStation && (
          <StationInfo 
            station={selectedStation} 
            onStartRoute={onStartRoute}
            isRouteReady={isRouteReady}
            filter={filter}
            allStations={allStations}
          />
        )}
      </div>
      {(loading || error || locationError) && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-100 p-4 rounded-md shadow-lg">
          {loading && <p>Loading stations...</p>}
          {error && <p>{error}</p>}
          {locationError && <p>{locationError}</p>}
        </div>
      )}
    </div>
  );
};

