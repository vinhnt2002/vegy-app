import { getSlotByFarmId } from '@/lib/actions/slots';
import { useState, useEffect } from 'react';

export function useSlotsByFarmId(farmId: string) {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSlots() {
      try {
        setLoading(true);
        const fetchedSlots = await getSlotByFarmId(farmId);
        setSlots(fetchedSlots);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    }

    fetchSlots();
  }, [farmId]);

  return { slots, loading, error };
}