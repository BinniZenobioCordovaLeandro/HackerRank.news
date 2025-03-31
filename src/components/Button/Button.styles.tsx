import {RADIUS} from "@/theme/border";
import {FONT_FAMILY, FONT_SIZE} from "@/theme/fonts";
import {SPACING} from "@/theme/spacing";
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING[9],
        paddingVertical: SPACING[2],
        alignSelf: "flex-start",
        borderRadius: RADIUS[5],
    },
    text: {fontSize: FONT_SIZE[2], fontFamily: FONT_FAMILY.LATO_BOLD},
});
