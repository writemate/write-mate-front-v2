'use client';
import { createContext, useContext, useState } from 'react';
import usePlotSidebar from '@/hooks/workspace/sidebar/usePlotSidebar';

export const SidebarContext = createContext({} as ReturnType<typeof usePlotSidebar>);
