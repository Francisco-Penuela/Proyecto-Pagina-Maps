import { useEffect, useMemo, useRef } from 'react';
import { Station } from '@/lib/firebaseConfig';
import { calculateDistances } from '@/lib/googleMapsConfig';
import { useStations } from './useStations';

type LatLngLiteral = google.maps.LatLngLiteral;
type RoutesLibrary = google.maps.RoutesLibrary | null | undefined;

interface UseStationsWithDistancesResult {
  stations: Station[];
  loading: boolean;
  error: string | null;
}

export const useStationsWithDistances = (
  userLocation: LatLngLiteral | null,
  routesLibrary: RoutesLibrary
): UseStationsWithDistancesResult => {
  const { stations, loading, error, setStations } = useStations();
  const lastOriginRef = useRef<LatLngLiteral | null>(null);

  useEffect(() => {
    if (!routesLibrary || !userLocation || stations.length === 0) {
      return;
    }

    const hasStationsWithoutDistance = stations.some(
      station => typeof station.distance !== 'number'
    );

    const originChanged =
      !lastOriginRef.current ||
      lastOriginRef.current.lat !== userLocation.lat ||
      lastOriginRef.current.lng !== userLocation.lng;

    if (!originChanged && !hasStationsWithoutDistance) {
      return;
    }

    let isActive = true;

    calculateDistances(userLocation, stations, routesLibrary)
      .then(updatedStations => {
        if (!isActive) return;
        lastOriginRef.current = userLocation;
        setStations(updatedStations);
      })
      .catch(err => {
        if (!isActive) return;
        console.error('Failed to calculate station distances', err);
      });

    return () => {
      isActive = false;
    };
  }, [routesLibrary, userLocation, stations, setStations]);

  const derivedLoading = useMemo(() => {
    if (loading) {
      return true;
    }

    const awaitingDistances =
      Boolean(userLocation && routesLibrary) &&
      stations.some(station => typeof station.distance !== 'number');

    return awaitingDistances;
  }, [loading, stations, userLocation, routesLibrary]);

  return {
    stations,
    loading: derivedLoading,
    error,
  };
};
