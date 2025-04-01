import {SPACING} from "@/theme/spacing";
import {StyleSheet} from "react-native";

const SWIPEABLE_HEIGHT = 100;

export const styles = StyleSheet.create({
    baseLayer: {
        flex: 1,
    },
    swipeableContainer: {
        height: SWIPEABLE_HEIGHT,
        paddingHorizontal: SPACING[3],
        justifyContent: "center",
    },
    informationText: {
        textAlign: "center",
        marginTop: SPACING[5],
    },
});
