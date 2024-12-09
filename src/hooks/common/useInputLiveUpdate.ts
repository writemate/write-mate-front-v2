import { useRef } from "react";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import { notifyError } from "@/utils/showToast";
import { debounce } from "@/utils";
import { useSaveLoading } from "@/stores/useSaveLoading";

export const useInputLiveUpdate = <T>(mutationFn: MutationFunction<T,string>, savingMessage: string, errorMessage: string) => {
  const addSaving = useSaveLoading((state) => state.add);
  const removeSaving = useSaveLoading((state) => state.remove);

  const changingSymbol = useRef<Symbol | null>(null);
  // 챕터 이름 수정하기
  const { mutate } = useMutation({
    mutationFn: mutationFn,
    onSettled: () => {
      if(changingSymbol.current) {
        removeSaving(changingSymbol.current);
        changingSymbol.current = null;
      }
    },
    onError: () => {
      notifyError(errorMessage);
    },
  });
  const debounceOnChange = useRef(debounce(mutate, 500)).current;

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    debounceOnChange(e.target.value);
    if(changingSymbol.current) return;
    changingSymbol.current = addSaving(savingMessage);
  }

  return onChange;
}
