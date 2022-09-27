const mobile = 680;
const tablet = 1200;

export const isSm = () => window.innerWidth <= mobile;
export const isMd = () => window.innerWidth > mobile && window.innerWidth < tablet;
export const isLg = () => window.innerWidth >= tablet;

export const smQuery = `@media (max-width: ${mobile}px)`;
export const mdQuery = `@media (min-width: ${mobile}px) and (max-width: ${tablet}px)`;
export const lgQuery = `@media (min-width: ${tablet}px)`;
