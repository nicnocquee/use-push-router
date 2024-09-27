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
