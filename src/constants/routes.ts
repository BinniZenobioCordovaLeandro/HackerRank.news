type PathsProps = {
    HOME: string;
    WEB: (uri: string, title: string) => string;
};

export const PATHS: PathsProps = {
    HOME: "/",
    WEB: (uri: string, title: string) =>
        `/web?uri=${encodeURIComponent(uri)}&title=${encodeURIComponent(title)}`,
};
