export const BREAKPOINT_NUM = {
  mobile: 625,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1280,
};

export const breakpoints = {
  mobile: `${BREAKPOINT_NUM.mobile}px`,
  tablet: `${BREAKPOINT_NUM.tablet}px`,
  desktop: `${BREAKPOINT_NUM.desktop}px`,
  largeDesktop: `${BREAKPOINT_NUM.largeDesktop}px`,
};

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (max-width: ${breakpoints.desktop})`,
  largeDesktop: `@media (max-width: ${breakpoints.largeDesktop})`,
};
