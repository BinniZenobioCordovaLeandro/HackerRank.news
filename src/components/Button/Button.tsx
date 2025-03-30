import React from "react";
import {
    type ButtonProps as RNButtonProps,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

export type ButtonProps = RNButtonProps;

export const Button = ({onPress, title}: ButtonProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 32,
        paddingVertical: 8,
        backgroundColor: "purple",
        alignSelf: "flex-start",
        borderRadius: 8,
    },
    text: {color: "white", fontSize: 16, fontWeight: "bold"},
});
