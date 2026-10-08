import type Lenis from "lenis";

// Single shared Lenis instance so any component can scroll programmatically.
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;
