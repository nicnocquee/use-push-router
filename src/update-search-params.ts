import { UpdateSearchParamsArgs } from './types';

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
    // ... rest of the function
    return newSearchParams;
  };
