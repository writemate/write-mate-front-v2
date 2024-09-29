'use client';
import { usePathname } from 'next/navigation';
import { event, handleRouteChange } from "@/utils/gtag";
import { useEffect } from 'react';
import { debounce } from '@/utils';
import { resizeEvent } from '@/utils/googleAnalytics/eventList';

function useInitGoogleAnalytics() {
    const pathname = usePathname();
    useEffect(() => {
      handleRouteChange(pathname);
    }, [pathname]);
  
    const handleResize = debounce(() => {
      event({ type: resizeEvent.type, properties: resizeEvent.generateProperties() });
    }, 1000);
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export default useInitGoogleAnalytics;
