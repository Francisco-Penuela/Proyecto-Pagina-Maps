import { Station } from './firebaseConfig';

type RoutesLibrary = google.maps.RoutesLibrary;

export const calculateDistances = async (
  origin: google.maps.LatLngLiteral,
  stations: Station[],
  routesLibrary: RoutesLibrary
): Promise<Station[]> => {
  const destinations = stations.map((s) => s.coordinates);
  
  // Destructure the service from the passed-in library object
  const { DistanceMatrixService } = routesLibrary;
  const service = new DistanceMatrixService();

  const response = await service.getDistanceMatrix({
    origins: [origin],
    destinations,
    travelMode: google.maps.TravelMode.DRIVING,
  });

  return stations.map((station, index) => {
    const result = response.rows[0].elements[index];
    return {
      ...station,
      distance: result.status === 'OK' ? result.distance.value / 1000 : Infinity, // in km
    };
  });
};