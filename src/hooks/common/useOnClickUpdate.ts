import { MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { notifyError } from "@/utils/showToast";
import { useSaveLoading } from "@/stores/useSaveLoading";

export const useOnClickUpdate = <T,C extends Object,U = void,>(
  {mutationFn, onMutate, onError, onSuccess, queryKey, savingMessage, errorMessage, clickEvent}: {
    mutationFn: MutationFunction<T, U>,
    onMutate?: (variables: U) => Promise<C | undefined> | C | undefined,
    onError?: (error: Error, variables: U, context: C | undefined) => Promise<void> | void,
    onSuccess?: (data: T, variables: U, context: C | undefined) => Promise<void> | void,
    queryKey: any,
    savingMessage: string,
    errorMessage: string,
    clickEvent?: Function,
  }
) => {
  const addSaving = useSaveLoading((state) => state.add);
  const removeSaving = useSaveLoading((state) => state.remove);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: mutationFn,
    onMutate: async (data:U) => {
      const savingSymbol = addSaving(savingMessage);
      await queryClient.cancelQueries({queryKey});
      const insertedResult = await onMutate?.(data);
      return { ...insertedResult, savingSymbol };
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({queryKey});
      onSuccess?.(data, variables, context as unknown as C);
    },
    onSettled: (_, __, ___, context) => {
      removeSaving(context!.savingSymbol);
    },
    onError: async (error, data, context) => {
      await onError?.(error, data, context as C|undefined);
      notifyError(errorMessage);
    }
  });

  const updateWithData = (data: U) => (e?:any) => {
    clickEvent?.(e);
    mutate(data);
  };

  return updateWithData;
}
