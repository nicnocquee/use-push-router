import { useSearchParams } from 'next/navigation';
import { updateSearchParams } from './update-search-params';
import { useMemo } from 'react';
export const useModifiableSearchParams = () => {
  const searchParams = useSearchParams();

  const update = updateSearchParams(searchParams);
  return useMemo(
    () => ({
      searchParams,
      updateSearchParams: update,
    }),
    [searchParams, update],
  );
};
