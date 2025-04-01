type Routes = "HOME" | "WEB" | "ARTICLES" | "FAVORITES" | "DELETED";

type PathsProps = Record<Routes, string | ((...args: string[]) => string)>;

export const PATHS: PathsProps = {
    HOME: "/",
    WEB: (uri: string, title: string) =>
        `/web?uri=${encodeURIComponent(uri)}&title=${encodeURIComponent(title)}`,
    ARTICLES: "/(articles)",
    FAVORITES: "/favorites",
    DELETED: "/deleted",
};
