'use client';

import { GasStationDashboard } from '@/components/GasStationDashboard';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { Station } from '@/lib/firebaseConfig';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useStationsWithDistances } from '@/hooks/useStationsWithDistances';
import { FilterType, useStationFilters } from '@/hooks/useStationFilters';
import { useDirections } from '@/hooks/useDirections';

export default function HomePage() {
  const { userLocation, locationError } = useUserLocation();
  const routesLibrary = useMapsLibrary('routes');
  const { stations, loading, error } = useStationsWithDistances(userLocation, routesLibrary);
  const { filter, filteredStations, selectedStation, changeFilter, selectStation } =
    useStationFilters(stations);
  const { directions, requestDirections, clearDirections } = useDirections(routesLibrary);
  const isRouteReady = !!routesLibrary && !!userLocation;

  const handleMarkerClick = (station: Station) => {
    selectStation(station.id);
    clearDirections();
  };

  const handleFilterChange = (newFilter: FilterType) => {
    changeFilter(newFilter);
    clearDirections();
  };

  const handleStartRoute = () => {
    if (!userLocation || !selectedStation) {
      return;
    }

    requestDirections(userLocation, selectedStation.coordinates).catch(err => {
      console.error('Error fetching directions', err);
    });
  };

  return (
    <GasStationDashboard
      userLocation={userLocation}
      stations={filteredStations}
      allStations={stations}
      filter={filter}
      onFilterChange={handleFilterChange}
      onMarkerClick={handleMarkerClick}
      selectedStation={selectedStation}
      onStartRoute={handleStartRoute}
      directions={directions}
      loading={loading}
      error={error}
      locationError={locationError}
      isRouteReady={isRouteReady}
    />
  );
}
