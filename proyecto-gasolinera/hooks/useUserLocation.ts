'use client';

import { useEffect, useMemo, useState } from 'react';

type LatLngLiteral = google.maps.LatLngLiteral;

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<LatLngLiteral | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const supportsGeolocation =
    typeof navigator !== 'undefined' && Boolean(navigator.geolocation);

  useEffect(() => {
    if (!supportsGeolocation) {
      const timeoutId = window.setTimeout(() => {
        setLocationError('Geolocation is not supported by this browser.');
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }

    let isMounted = true;

    const successHandler = (position: GeolocationPosition) => {
      if (!isMounted) return;
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const errorHandler = () => {
      if (!isMounted) return;
      setLocationError('Geolocation permission denied. Showing default location.');
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);

    return () => {
      isMounted = false;
    };
  }, [supportsGeolocation]);

  return useMemo(
    () => ({ userLocation, locationError }),
    [userLocation, locationError]
  );
};

