import { QueryFunction, useQuery, QueryKey } from "@tanstack/react-query";

export const useApiGet = (key: QueryKey, fn: QueryFunction, options?: any) => {
  return useQuery<any>(key, fn, {
    ...options,
  });
};
