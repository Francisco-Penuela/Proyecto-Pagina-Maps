import { useState, useEffect } from 'react';
import { Station } from '@/lib/firebaseConfig';
import { mockStations } from '../lib/mockData'; // Import the mock data

export const useStations = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const stationData = mockStations;
        setStations(stationData);
      } catch {
        setError('Failed to fetch stations.');
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  return { stations, loading, error, setStations };
};
