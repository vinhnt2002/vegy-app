import { getPurchasedSlotsByFarmId } from '@/lib/actions/slots';
import { useState, useEffect, useCallback } from 'react';

export function useSlotsPurchaseByFarmId(farmId: string) {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSlots = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedSlots = await getPurchasedSlotsByFarmId(farmId);
      setSlots(fetchedSlots);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, [farmId]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const refetch = useCallback(() => {
    fetchSlots();
  }, [fetchSlots]);

  return { slots, loading, error, refetch };
}
