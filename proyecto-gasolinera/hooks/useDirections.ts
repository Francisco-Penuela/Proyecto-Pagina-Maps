import { useCallback, useState } from 'react';

type LatLngLiteral = google.maps.LatLngLiteral;
type RoutesLibrary = google.maps.RoutesLibrary | null | undefined;

interface UseDirectionsResult {
  directions: google.maps.DirectionsResult | null;
  requestDirections: (
    origin: LatLngLiteral,
    destination: LatLngLiteral
  ) => Promise<google.maps.DirectionsResult | null>;
  clearDirections: () => void;
}

export const useDirections = (routesLibrary: RoutesLibrary): UseDirectionsResult => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const clearDirections = useCallback(() => {
    setDirections(null);
  }, []);

  const requestDirections = useCallback(
    (origin: LatLngLiteral, destination: LatLngLiteral) => {
      if (!routesLibrary) {
        console.warn('Google Maps routes library is not ready yet.');
        return Promise.resolve<google.maps.DirectionsResult | null>(null);
      }

      clearDirections();

      const { DirectionsService } = routesLibrary;
      const service = new DirectionsService();

      return new Promise<google.maps.DirectionsResult | null>((resolve, reject) => {
        service.route(
          {
            origin,
            destination,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK && result) {
              setDirections(result);
              resolve(result);
            } else {
              const error = new Error(`Directions request failed with status ${status}`);
              console.error(error);
              reject(error);
            }
          }
        );
      });
    },
    [routesLibrary, clearDirections]
  );

  return { directions, requestDirections, clearDirections };
};

