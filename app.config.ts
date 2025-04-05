import type {ExpoConfig} from "@expo/config-types";

const EAS_SLUG = "hackerrank-news";
const EAS_PROJECT_ID = process.env.EAS_PROJECT_ID;

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
        url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
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
        [
            "expo-notifications",
            {
                icon: "./assets/images/notification_icon.png",
                color: "#ffffff",
                defaultChannel: "default",
                sounds: ["./assets/sounds/notification_sound.wav"],
                enableBackgroundRemoteNotifications: true,
            },
        ],
    ],
});
