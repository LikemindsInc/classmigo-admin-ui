import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAPiPut = (
  qfn: any,
  success?: (data: any) => void,
  error?: (error: any) => void,
  invalidateKey?: string[]
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (variables: any) => {
      return qfn(variables);
    },
    {
      onSuccess: (data) => {
        invalidateKey &&
          invalidateKey.forEach((key: any) => {
            queryClient.invalidateQueries(key);
          });
        success && success(data);
      },
      onError: error,
      retry: 1,
    }
  );
};
