export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackEvent = (action: string, params = {}) => {
  window.gtag("event", action, params);
};
