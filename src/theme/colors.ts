type ThemeType = "light" | "dark";

type ColorScheme = {
    background: string;
    text: string;
    accent: string;
    error: string;
    lightness: string;
    darkness: string;
};

const Colors: Record<ThemeType, ColorScheme> = {
    light: {
        background: "#fff",
        text: "#000",
        accent: "#6200ee",
        error: "#b00020",
        lightness: "#f5f5f5",
        darkness: "#121212",
    },
    dark: {
        background: "#000",
        text: "#fff",
        accent: "#bb86fc",
        error: "#cf6679",
        lightness: "#121212",
        darkness: "#f5f5f5",
    },
};

export const theme = (theme: ThemeType = "light"): ColorScheme => Colors[theme];
