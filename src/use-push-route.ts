import { usePathname, useRouter } from 'next/navigation';
import { useModifiableSearchParams } from './use-modifiable-search-params';
import { UpdateSearchParamsArgs } from './types';
import { useCallback, useMemo } from 'react';

export const usePushRoute = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { updateSearchParams, searchParams } = useModifiableSearchParams();

  const pushSearchParams = useCallback(
    (params: UpdateSearchParamsArgs) => {
      const newSearchParams = updateSearchParams(params);
      router.push(`${pathname}?${newSearchParams.toString()}`);
    },
    [pathname, router, updateSearchParams],
  );

  return useMemo(
    () => ({
      pushSearchParams,
      router,
      searchParams,
    }),
    [pushSearchParams, router, searchParams],
  );
};
