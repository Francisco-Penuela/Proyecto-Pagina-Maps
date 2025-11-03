'use client';

// Make sure useRef is imported
import { Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { Station } from '@/lib/firebaseConfig';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface MapProps {
  userLocation: google.maps.LatLngLiteral | null;
  stations: Station[];
  onMarkerClick: (station: Station) => void;
  directions: google.maps.DirectionsResult | null;
  selectedStation?: Station | null;
}

const DirectionsRenderer = ({ directions }: { directions: google.maps.DirectionsResult | null }) => {
  const map = useMap();
  const rendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (!map) return;

    if (!rendererRef.current) {
      rendererRef.current = new google.maps.DirectionsRenderer({
        suppressMarkers: false,
        preserveViewport: true,
      });
    }

    if (!directions || typeof directions !== 'object' || !('routes' in directions)) {
      rendererRef.current.setMap(null); // limpia el mapa si no hay ruta válida
      return;
    }

    rendererRef.current.setMap(map); // asegura que el renderer esté en el mapa
    rendererRef.current.setDirections(directions);

    return () => {
      rendererRef.current?.setMap(null);
    };
  }, [map, directions]);

  return null;
};


// NOTICE: NO APIPROVIDER WRAPPER HERE!
const MapComponent = ({ userLocation, stations, onMarkerClick, directions, selectedStation }: MapProps) => {
  const defaultCenter = { lat: 6.1738, lng: -75.5895 };

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <Map
        defaultCenter={userLocation || defaultCenter }
        defaultZoom={14}
        mapId="YOUR_MAP_ID_HERE" // Make sure to use your map ID
      >
        {userLocation && (
          <AdvancedMarker position={userLocation}>
            <Image 
                src="/user-position.png" 
                alt="Tu Ubicación"
                className="w-20 h-20"
                width={100}
                height={100}
            />
          </AdvancedMarker>
        )}

        {stations.map(station => {
          const isSelected = selectedStation?.id === station.id;
          const stationImageClass = isSelected
            ? 'w-24 h-24 drop-shadow-lg transition-transform duration-200 bg-red-200'
            : 'w-20 h-20 transition-transform duration-200';

          return (
            <AdvancedMarker
              key={station.id}
              position={station.coordinates}
              onClick={() => onMarkerClick(station)}
            >
              <Image
                src="/gas-img-1.png"
                alt="Gasolinera"
                className={stationImageClass}
                width={100}
                height={100}
              />
            </AdvancedMarker>
          );
        })}
        <DirectionsRenderer directions={directions} />
      </Map>
    </div>
  );
};

export default MapComponent;
