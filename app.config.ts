import type {ExpoConfig} from "@expo/config-types";

const EAS_SLUG = "hackerrank-news";
const EAS_PROJECT_ID = "8cf16453-f2e5-46c5-ac59-95b08123ab53"; // TODO: Replace with GITHUB ENV, this is a temporary project ID in my BinniCordova Account

const VERSION = "0.0.1";
const VERSION_CODE = 1;

const APP_VARIANTS = {
    development: {
        identifier: "news.hackerrank.dev",
        name: "HackerRank News (Dev)",
        scheme: "dev.hackerrank.news",
    },
    preview: {
        identifier: "news.hackerrank.preview",
        name: "HackerRank News (Preview)",
        scheme: "preview.hackerrank.news",
    },
    production: {
        identifier: "news.hackerrank",
        name: "HackerRank News",
        scheme: "hackerrank.news",
    },
};

const getAppVariant = () => {
    if (process.env.APP_VARIANT === "development")
        return APP_VARIANTS.development;
    if (process.env.APP_VARIANT === "preview") return APP_VARIANTS.preview;
    return APP_VARIANTS.production;
};

const getUniqueIdentifier = () => getAppVariant().identifier;
const getAppName = () => getAppVariant().name;
const getScheme = () => getAppVariant().scheme;

export default ({config}: {config: ExpoConfig}): ExpoConfig => ({
    ...config,
    name: getAppName(),
    scheme: getScheme(),
    slug: EAS_SLUG,
    version: VERSION,
    orientation: "portrait",
    icon: "./assets/icon.png",
    newArchEnabled: true,
    splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
    },
    updates: {
        fallbackToCacheTimeout: 0,
        url: "https://u.expo.dev/8cf16453-f2e5-46c5-ac59-95b08123ab53",
        enabled: true,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
        supportsTablet: true,
        bundleIdentifier: getUniqueIdentifier(),
        version: VERSION,
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#FFFFFF",
        },
        package: getUniqueIdentifier(),
        versionCode: VERSION_CODE,
        version: VERSION,
    },
    web: {
        favicon: "./assets/favicon.png",
        bundler: "metro",
    },
    extra: {
        eas: {
            projectId: EAS_PROJECT_ID,
        },
    },
    runtimeVersion: {
        policy: "appVersion",
    },
    plugins: [
        [
            "expo-router",
            {
                root: "src/app",
            },
        ],
    ],
});
