import pageList from "@/utils/googleAnalytics/pageList";

export interface GTagEvent <T extends {}>{
  type: string;
  properties: T;
}

const GA_KEY = "G-03XPCRHM58";

export const event = <T extends {}>({ type, properties }: GTagEvent<T>) => {
  window.gtag("event", type, properties);
};

export const pageview = (title: string, url: string) => {
  window.gtag("config", GA_KEY, {
    page_title: title,
    page_location: url,
    update: true,
  });
  window.gtag('event', 'page_view');
};

export const handleRouteChange = (pathname: string) => {
    if (typeof window.gtag !== "function") return;
    const page = pageList.find((page) => page.path.test(pathname));
    pageview(page?.name || "unknown", pathname);
}
