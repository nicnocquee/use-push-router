import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

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
export type ArgAdd = { [key: string]: string | string[] };
export type ArgRemove = { [key: string]: string | string[] | undefined };
export type ArgSet = { [key: string]: string | string[] };
type UpdateSearchParamsAdd = Record<'add', ArgAdd>;
type UpdateSearchParamsRemove = Record<'remove', ArgRemove>;
type UpdateSearchParamsSet = Record<'set', ArgSet>;
type UpdateSearchParamsArgs =
  | UpdateSearchParamsSet
  | UpdateSearchParamsRemove
  | UpdateSearchParamsAdd;

export const updateSearchParams =
  (currentSearchParams: URLSearchParams) =>
  (params: UpdateSearchParamsArgs) => {
    const newSearchParams = new URLSearchParams(currentSearchParams);
    if ('add' in params && params.add) {
      Object.entries(params.add).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            newSearchParams.append(key, v);
          });
        } else {
          newSearchParams.append(key, value);
        }
      });
    }
    if ('remove' in params && params.remove) {
      Object.entries(params.remove).forEach(([key, value]) => {
        if (typeof value === 'undefined') {
          newSearchParams.delete(key);
        } else if (Array.isArray(value)) {
          value.forEach((v) => {
            newSearchParams.delete(key, v);
          });
        } else {
          newSearchParams.delete(key, value);
        }
      });
    }
    if ('set' in params && params.set) {
      Object.entries(params.set).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            newSearchParams.set(key, v);
          });
        } else {
          newSearchParams.set(key, value);
        }
      });
    }
    return newSearchParams;
  };

export const useModifiableSearchParams = () => {
  const searchParams = useSearchParams();

  const update = updateSearchParams(searchParams);
  return {
    searchParams,
    updateSearchParams: update,
  };
};

export function urlSearchParamsToObject(
  searchParams: URLSearchParams,
): Record<string, string | string[]> {
  const result: Record<string, string | string[]> = {};

  searchParams.forEach((value, key) => {
    if (key in result) {
      if (Array.isArray(result[key])) {
        (result[key] as string[]).push(value);
      } else {
        result[key] = [result[key] as string, value];
      }
    } else {
      result[key] = value;
    }
  });

  return result;
}
