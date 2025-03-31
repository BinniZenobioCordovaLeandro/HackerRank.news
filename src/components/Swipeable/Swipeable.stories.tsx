import {SPACING} from "@/theme/spacing";
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {View} from "react-native";
import {Swipeable} from "./Swipeable";

const meta = {
    title: "Swipeable",
    component: Swipeable,
    args: {
        title: "Test Title",
        caption: "Test Caption",
    },
    decorators: [
        (Story) => (
            <View style={{padding: SPACING[4]}}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof Swipeable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        onPress: action("onPress"),
        onDismiss: action("onDismiss"),
    },
};
