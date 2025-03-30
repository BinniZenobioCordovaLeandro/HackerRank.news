import {useFonts} from "expo-font";
import {Stack} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {useEffect} from "react";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [loaded] = useFonts({
        LatoLight: require("../../assets/fonts/Lato-Light.ttf"),
        LatoRegular: require("../../assets/fonts/Lato-Regular.ttf"),
        LatoBold: require("../../assets/fonts/Lato-Bold.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <Stack />;
};

let AppEntryPoint = RootLayout;

if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true") {
    AppEntryPoint = require("../../.rnstorybook").default;
    SplashScreen.hideAsync();
}

export default AppEntryPoint;
