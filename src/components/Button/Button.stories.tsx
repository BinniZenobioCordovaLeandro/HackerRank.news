import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {View} from "react-native";
import {Button} from "./Button";

const meta = {
    title: "Button",
    component: Button,
    args: {
        title: "Click Me",
    },
    decorators: [
        (Story) => (
            <View style={{padding: 16}}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        onPress: action("onPress"),
    },
};
