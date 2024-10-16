'use client';
import { useEffect } from 'react';
import { useLogin } from '@/stores/useLogin';

function useInitLogin() {
  const checkLogin = useLogin((state) => state.checkLogin);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(checkLogin,[]);
}

export default useInitLogin;
