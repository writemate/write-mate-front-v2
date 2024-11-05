import { create } from 'zustand';
import { User, Unsubscribe, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/utils/initFirebase';
import { getUserInfoWithToken, signUp } from '@/utils/APIs/user';
import { AxiosError } from 'axios';

type State = {
  user: null | User;  // null: not checked or logout, User: login
  isLogin: null | boolean; // null: not checked, true: login, false: logout
  checkLogin: () => Unsubscribe;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useLogin = create<State>((set) => ({
  user: null,
  isLogin: null, // null: not checked, true: login, false: logout
  checkLogin: ()=> auth.onAuthStateChanged((user) => set({ user, isLogin: !!user })),
  login: async () => {
    const result = await signInWithPopup(auth, provider);
    try{
      await getUserInfoWithToken(await result.user.getIdToken());
    } catch (error) {
      if(!(error instanceof AxiosError)) throw new Error("unknown error");
      if(!error.response) throw error;
      if(error.response.status !== 404) throw error;
      await signUp(await result.user.getIdToken());
    }
    //TODO: check if the user is already registered in the database, if not, register the user
  },
  logout: async () => {
    await auth.signOut();
  },
}));
