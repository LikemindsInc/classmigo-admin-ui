import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useApiPost = (
  qfn: any,
  success?: (data: any) => void,
  error?: (error: any) => void,
  invalidateKey?: string[]
) => {
  const queryClient = useQueryClient();
  return useMutation(qfn, {
    onSuccess: (data) => {
      invalidateKey &&
        invalidateKey.forEach((key: any) => {
          queryClient.invalidateQueries(key);
        });
      success && success(data);
    },
    onError: error,
  });
};