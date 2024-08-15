'use client';
import { useEffect } from 'react';
import { useLogin } from '@/stores/useLogin';

function useInitLogin() {
  const checkLogin = useLogin((state) => state.checkLogin);
  useEffect(() => checkLogin(), []);
}

export default useInitLogin;
