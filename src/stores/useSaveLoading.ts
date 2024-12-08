import { create } from 'zustand';

type State = {
  updatingStateList: Symbol[];
  checkIsSaving: ()=>boolean;
  add: (state: string) => Symbol;
  remove: (state: Symbol) => void;
};

export const useSaveLoading = create<State>((set,get) => ({
  updatingStateList: [],
  checkIsSaving: ()=>get().updatingStateList.length > 0,
  add: (state) => {
    const symbol = Symbol(state);
    set((pre) => ({
      updatingStateList: [...pre.updatingStateList, symbol],
    }));
    return symbol;
  },
  remove: (state) => {
    set((pre) => ({
      updatingStateList: pre.updatingStateList.filter((item) => item !== state),
    }));
  },
}));
