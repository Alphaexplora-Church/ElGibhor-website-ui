import { useState, useEffect } from 'react';
import type { Ministry } from '../models/types';
import { fetchMinistries } from '../models/apiService';

export const useMinistriesViewModel = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, you might fetch a more detailed list here
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchMinistries();
      setMinistries(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  return { ministries, isLoading };
};