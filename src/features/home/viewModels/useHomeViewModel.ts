import { useState, useEffect } from 'react';
import type { Ministry } from '../../../shared/models/types';
import { fetchMinistries } from '../../../shared/models/apiService';

export const useHomeViewModel = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMinistries();
        setMinistries(data);
      } catch (err) {
        setError('Failed to load ministries data.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { ministries, isLoading, error };
};