import {theme} from "@/theme/colors";
import React from "react";
import {
    type ButtonProps as RNButtonProps,
    Text,
    TouchableOpacity,
} from "react-native";
import {styles} from "./Button.styles";

export type ButtonProps = RNButtonProps;

export const Button = ({onPress, title}: ButtonProps) => {
    const {text: color, background: backgroundColor} = theme();
    return (
        <TouchableOpacity
            style={[styles.container, {backgroundColor}]}
            onPress={onPress}
        >
            <Text style={[styles.text, {color}]}>{title}</Text>
        </TouchableOpacity>
    );
};
