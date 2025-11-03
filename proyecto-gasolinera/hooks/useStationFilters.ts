import { useCallback, useMemo, useState } from 'react';
import { Station } from '@/lib/firebaseConfig';

export type FilterType = 'nearest' | 'cheapest' | 'best_value';

const rankStationsByBestValue = (stations: Station[]): Station[] => {
  if (stations.length <= 1) {
    return stations;
  }

  const prices = stations.map(station => station.price_per_liter);
  const distances = stations
    .map(station => station.distance)
    .filter((distance): distance is number => typeof distance === 'number');

  if (!prices.length) {
    return stations;
  }

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;

  const hasDistances = distances.length > 0;
  const minDistance = hasDistances ? Math.min(...distances) : 0;
  const maxDistance = hasDistances ? Math.max(...distances) : 0;
  const distanceRange = maxDistance - minDistance;

  const scoreStation = (station: Station) => {
    const normalizedPrice =
      priceRange > 0 ? (station.price_per_liter - minPrice) / priceRange : 0;
    const normalizedDistance =
      hasDistances && distanceRange > 0 && typeof station.distance === 'number'
        ? (station.distance - minDistance) / distanceRange
        : 0;

    return normalizedPrice * 0.5 + normalizedDistance * 0.5;
  };

  return [...stations].sort((a, b) => scoreStation(a) - scoreStation(b));
};

interface UseStationFiltersResult {
  filter: FilterType;
  filteredStations: Station[];
  selectedStation: Station | null;
  selectedStationId: string | null;
  changeFilter: (nextFilter: FilterType) => void;
  selectStation: (stationId: string | null) => void;
}

export const useStationFilters = (stations: Station[]): UseStationFiltersResult => {
  const [filter, setFilterState] = useState<FilterType>('best_value');
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);

  const filteredStations = useMemo(() => {
    if (!stations.length) {
      return [];
    }

    if (filter === 'best_value') {
      return rankStationsByBestValue(stations);
    }

    if (filter === 'nearest') {
      return [...stations].sort(
        (a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity)
      );
    }

    if (filter === 'cheapest') {
      return [...stations].sort((a, b) => a.price_per_liter - b.price_per_liter);
    }

    return stations;
  }, [stations, filter]);

  const selectedStation = useMemo(() => {
    if (!filteredStations.length) {
      return null;
    }

    if (selectedStationId) {
      const match = filteredStations.find(station => station.id === selectedStationId);
      if (match) {
        return match;
      }
    }

    return filteredStations[0];
  }, [filteredStations, selectedStationId]);

  const changeFilter = useCallback((nextFilter: FilterType) => {
    setFilterState(nextFilter);
    setSelectedStationId(null);
  }, []);

  const selectStation = useCallback((stationId: string | null) => {
    setSelectedStationId(stationId);
  }, []);

  return {
    filter,
    filteredStations,
    selectedStation,
    selectedStationId,
    changeFilter,
    selectStation,
  };
};

