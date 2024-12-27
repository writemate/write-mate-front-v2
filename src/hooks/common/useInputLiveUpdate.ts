import { useRef } from "react";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import { notifyError } from "@/utils/showToast";
import { debounce } from "@/utils";
import { useSaveLoading } from "@/stores/useSaveLoading";

export function useInputLiveUpdate<T>(
  mutationFn: MutationFunction<T, string>,
  savingMessage: string,
  errorMessage: string
): (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
export function useInputLiveUpdate<T, U, V extends Array<any>>(
  mutationFn: MutationFunction<T, U>,
  savingMessage: string,
  errorMessage: string,
  beforeSave: (value: string, ...args: V) => any,
  tranceformValue: (value: string, ...args: V) => U
): (
  ...args: V
) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

export function useInputLiveUpdate<T, U, V extends Array<any>>(
  mutationFn: MutationFunction<T, U | string>,
  savingMessage: string,
  errorMessage: string,
  beforeSave?: (value: string, ...args: V) => any,
  tranceformValue?: (value: string, ...args: V) => U | string
) {
  const addSaving = useSaveLoading((state) => state.add);
  const removeSaving = useSaveLoading((state) => state.remove);

  const changingSymbol = useRef<Symbol | null>(null);
  // 챕터 이름 수정하기
  const { mutate } = useMutation({
    mutationFn: mutationFn,
    onSettled: () => {
      if (changingSymbol.current) {
        removeSaving(changingSymbol.current);
        changingSymbol.current = null;
      }
    },
    onError: () => {
      notifyError(errorMessage);
    },
  });
  const debounceOnChange = useRef(debounce(mutate, 500)).current;

  const defaultOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    debounceOnChange(e.target.value);
    if (changingSymbol.current) return;
    changingSymbol.current = addSaving(savingMessage);
  };

  const complexOnChange =
    (...args: V) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!beforeSave || !tranceformValue)
        throw new Error("beforeSave and tranceformValue must be defined");
      beforeSave(e.target.value, ...args);
      debounceOnChange(tranceformValue(e.target.value, ...args));
      if (changingSymbol.current) return;
      changingSymbol.current = addSaving(savingMessage);
    };

  if (beforeSave && tranceformValue) return complexOnChange;
  return defaultOnChange;
}
