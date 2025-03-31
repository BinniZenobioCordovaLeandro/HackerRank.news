import {Icon} from "@/components/Icon/Icon";
import {Text} from "@/components/Text/Text";
import {STRINGS} from "@/constants/strings";
import {BORDER} from "@/theme/border";
import {theme} from "@/theme/colors";
import {SPACING} from "@/theme/spacing";
import {StyleSheet, TouchableOpacity, type ViewProps} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
    type SharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";
import {RIGHT_ACTION_WIDTH, THRESHOLD, styles} from "./Swipeable.styles";

type RightActionProps = {
    prog: SharedValue<number>;
    drag: SharedValue<number>;
    onTap: () => void;
};

function RightAction({prog, drag, onTap}: RightActionProps): React.JSX.Element {
    const {error: backgroundColor, lightness: color} = theme();

    const styleAnimation = useAnimatedStyle(() => {
        return {
            transform: [{translateX: drag.value + RIGHT_ACTION_WIDTH}],
        };
    });

    return (
        <TouchableOpacity onPress={onTap}>
            <Reanimated.View
                style={[
                    styleAnimation,
                    styles.rightActionContainer,
                    {backgroundColor},
                ]}
            >
                <Icon name="trash-can-outline" color={color} />
                <Text style={{color}}>{STRINGS.delete_message}</Text>
            </Reanimated.View>
        </TouchableOpacity>
    );
}

type SwipeableProps = ViewProps & {
    title: string;
    caption: string;
    onPress: () => void;
    onDismiss: () => void;
};

export const Swipeable = ({
    title,
    caption,
    onPress,
    onDismiss,
    style,
}: SwipeableProps) => {
    const {background: backgroundColor, text: borderColor} = theme();

    return (
        <TouchableOpacity onPress={onPress}>
            <GestureHandlerRootView>
                <ReanimatedSwipeable
                    containerStyle={[
                        styles.swipeable,
                        {backgroundColor, borderColor},
                        style,
                    ]}
                    friction={2}
                    enableTrackpadTwoFingerGesture
                    rightThreshold={RIGHT_ACTION_WIDTH - THRESHOLD}
                    renderRightActions={(progress, dragX) => (
                        <RightAction
                            prog={progress}
                            drag={dragX}
                            onTap={onDismiss}
                        />
                    )}
                >
                    <Text type="label">{title}</Text>
                    <Text type="caption">{caption}</Text>
                    <Reanimated.View style={styles.separator} />
                </ReanimatedSwipeable>
            </GestureHandlerRootView>
        </TouchableOpacity>
    );
};
