'use client';
import { createContext, useContext, useState } from 'react';
import usePlotSidebar from '@/hooks/workspace/sidebar/usePlotSidebar';

export const SidebarContext = createContext<ReturnType<typeof usePlotSidebar>>({} as ReturnType<typeof usePlotSidebar>);

