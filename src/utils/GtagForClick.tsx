import { event, GTagEvent } from '@/utils/gtag';
import React from 'react';

export function GtagForClick<T extends {}>({ children, eventType, eventProperties, tagName, onClick, ...rest }:
  { children: React.ReactNode; eventType: string; eventProperties: T; tagName: string; onClick?: () => void; [key: string]: any }) {
  const handleClick = () => {
    event({ type: eventType, properties: eventProperties });
    if (onClick) {
      onClick();
    }
  };

  return React.createElement(tagName, { ...rest, onClick: handleClick }, children);
}
