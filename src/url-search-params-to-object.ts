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
