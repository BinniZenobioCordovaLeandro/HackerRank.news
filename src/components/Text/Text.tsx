import {theme} from "@/theme/colors";
import {FONT_FAMILY} from "@/theme/fonts";
import {Text as RNText, type TextProps} from "react-native";
import {styles} from "./Text.styles";

export type ThemedTextProps = TextProps & {
    type?: "default" | "title" | "caption" | "error" | "label";
};

export function Text({style, type = "default", ...rest}: ThemedTextProps) {
    const {text, error} = theme();

    return (
        <RNText
            style={[
                {
                    color: text,
                    fontFamily: FONT_FAMILY.LATO_REGULAR,
                },
                type === "default" && styles.default,
                type === "title" && styles.title,
                type === "caption" && styles.caption,
                type === "error" && [styles.error, {color: error}],
                type === "label" && styles.label,
                style,
            ]}
            {...rest}
        />
    );
}
