'use client';
import { createContext } from 'react';
import useSidebar from '@/hooks/workspace/sidebar/useSidebar';

export const SidebarContext = createContext({} as ReturnType<typeof useSidebar>);
