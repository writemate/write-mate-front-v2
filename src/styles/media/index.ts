const breakpoints = {
  mobile: "625px",
  tablet: "768px",
  desktop: "1024px",
  largeDesktop: "1280px",
};

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (max-width: ${breakpoints.desktop})`,
  largeDesktop: `@media (max-width: ${breakpoints.largeDesktop})`,
};
