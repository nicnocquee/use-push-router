import { useSearchParams } from 'next/navigation';
import { updateSearchParams } from './update-search-params';

export const useModifiableSearchParams = () => {
  const searchParams = useSearchParams();

  const update = updateSearchParams(searchParams);
  return {
    searchParams,
    updateSearchParams: update,
  };
};
