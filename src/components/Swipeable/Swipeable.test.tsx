import {STRINGS} from "@/constants/strings";
import {fireEvent, render} from "@testing-library/react-native";
import React from "react";
import {Swipeable} from "./Swipeable";

jest.mock("react-native-gesture-handler", () => ({
    GestureHandlerRootView: jest.fn(({children}) => children),
    Swipeable: jest.fn(({children}) => children),
    PanGestureHandler: jest.fn(({children}) => children),
    TapGestureHandler: jest.fn(({children}) => children),
    State: {},
}));

jest.mock("react-native-vector-icons", () => ({
    createIconSet: jest.fn(() => "IconMock"),
    createIconSetFromFontello: jest.fn(),
    createIconSetFromIcoMoon: jest.fn(),
    createMultiStyleIconSet: jest.fn(),
    DefaultIcon: jest.fn(),
    loadFont: jest.fn(),
}));

const ICON_ID = 1;

jest.mock("@expo/vector-icons", () => ({
    MaterialCommunityIcons: {
        glyphMap: {"trash-can-outline": ICON_ID},
    },
    createIconSet: jest.fn(() => "MaterialIconMock"),
}));

describe("Swipeable Component", () => {
    const mockOnPress = jest.fn();
    const mockOnDismiss = jest.fn();

    it("renders correctly with title and caption", () => {
        const {getByText} = render(
            <Swipeable
                title="Test Title"
                caption="Test Caption"
                onPress={mockOnPress}
                onDismiss={mockOnDismiss}
            />
        );

        expect(getByText("Test Title")).toBeTruthy();
        expect(getByText("Test Caption")).toBeTruthy();
    });

    it("calls onPress when tapped", () => {
        const {getByText} = render(
            <Swipeable
                title="Test Title"
                caption="Test Caption"
                onPress={mockOnPress}
                onDismiss={mockOnDismiss}
            />
        );

        fireEvent.press(getByText("Test Title"));
        expect(mockOnPress).toHaveBeenCalled();
    });

    it("calls onDismiss when right action is tapped", () => {
        const {getByText} = render(
            <Swipeable
                title="Test Title"
                caption="Test Caption"
                onPress={mockOnPress}
                onDismiss={mockOnDismiss}
            />
        );

        fireEvent.press(getByText(STRINGS.delete_message));
        expect(mockOnDismiss).toHaveBeenCalled();
    });
});
