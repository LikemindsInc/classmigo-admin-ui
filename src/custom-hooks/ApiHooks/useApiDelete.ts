import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useApiDelete = (
  qfn: any,
  success?: () => void,
  error?: (error: any) => void,
  invalidateKey?: string[]
) => {
  const queryClient = useQueryClient();
  return useMutation(qfn, {
    onSuccess: () => {
      if (invalidateKey) {
        invalidateKey.forEach((key: any) => {
          queryClient.invalidateQueries(key);
        });
      }
      if (success) {
        success();
      }
    },
    onError: error,
  });
};
