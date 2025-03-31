import {BORDER} from "@/theme/border";
import {SPACING} from "@/theme/spacing";
import {StyleSheet} from "react-native";

export const RIGHT_ACTION_WIDTH = 120;
export const THRESHOLD = 20;

export const styles = StyleSheet.create({
    rightActionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: RIGHT_ACTION_WIDTH,
        padding: SPACING[3],
    },
    separator: {
        width: "100%",
        borderTopWidth: BORDER[1],
    },
    swipeable: {
        alignItems: "flex-start",
        borderBottomWidth: BORDER[1],
    },
});
