'use client';
import { useEffect } from 'react';

function useInitLogin() {
    useEffect(() => {
        console.log('useInitLogin');
    }, []);
}

export default useInitLogin;
