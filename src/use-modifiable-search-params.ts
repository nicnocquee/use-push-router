import { useSearchParams } from 'next/navigation';
import { updateSearchParams } from './update-search-params';
import { useCallback, useMemo } from 'react';

export const useModifiableSearchParams = () => {
  const searchParams = useSearchParams();

  const update = useCallback(updateSearchParams(searchParams), [searchParams]);
  return useMemo(
    () => ({
      searchParams,
      updateSearchParams: update,
    }),
    [searchParams, update],
  );
};
