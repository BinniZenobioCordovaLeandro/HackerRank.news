import {Text} from "@/components/Text/Text";
import {FONT_SIZE} from "@/theme/fonts";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {View} from "react-native";
import {styles} from "./AppBar.styles";

const AppBar: React.FC<{title?: string}> = ({title = "AppBar"}) => {
    const navigation = useNavigation();

    const handleBackPress = () => navigation.canGoBack() && navigation.goBack();

    return (
        <View style={styles.container}>
            {navigation.canGoBack() && (
                <Ionicons
                    size={FONT_SIZE[4]}
                    name="chevron-back-outline"
                    onPress={handleBackPress}
                />
            )}
            <Text type="title" numberOfLines={1}>
                {title}
            </Text>
        </View>
    );
};

export default AppBar;
