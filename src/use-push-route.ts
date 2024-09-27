import { usePathname, useRouter } from 'next/navigation';
import { useModifiableSearchParams } from './use-modifiable-search-params';
import { UpdateSearchParamsArgs } from './types';

export const usePushRoute = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { updateSearchParams, searchParams } = useModifiableSearchParams();

  const pushSearchParams = (params: UpdateSearchParamsArgs) => {
    const newSearchParams = updateSearchParams(params);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return {
    pushSearchParams,
    router,
    searchParams,
  };
};
