import {AppBar} from "@/components/AppBar/AppBar";
import {Button} from "@/components/Button/Button";
import {Icon} from "@/components/Icon/Icon";
import {Text} from "@/components/Text/Text";
import {PATHS} from "@/constants/routes";
import {STRINGS} from "@/constants/strings";
import {useCategories} from "@/hooks/useCategories";
import type {Category} from "@/models/category";
import {styles} from "@/styles";
import {theme} from "@/theme/colors";
import {FONT_SIZE} from "@/theme/fonts";
import {MasonryFlashList} from "@shopify/flash-list";
import {router} from "expo-router";
import {TouchableOpacity, View} from "react-native";

const ESTIMATED_ITEM_SIZE = 50;
const COLUMNS = 2;

type ItemProps = {
    item: Category;
    index: number;
};

const OnboardingScreen = () => {
    const {text, background, accent} = theme();

    const {categories, toggleFavoriteCategory} = useCategories();

    const skip = () => router.push(PATHS.ARTICLES as string);

    const renderItem = ({item, index}: ItemProps) => {
        const backgroundColor = item.isFavorite ? accent : background;
        const color = item.isFavorite ? background : text;
        return (
            <TouchableOpacity
                onPress={() => toggleFavoriteCategory(item)}
                style={[styles.masonryCard, {backgroundColor}]}
            >
                <Icon name={item.icon} size={FONT_SIZE[10]} color={color} />
                <Text type="label" key={index} style={{color}}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <MasonryFlashList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            numColumns={COLUMNS}
            estimatedItemSize={ESTIMATED_ITEM_SIZE}
            ListHeaderComponent={() => (
                <>
                    <AppBar
                        title=""
                        actions={() => (
                            <TouchableOpacity onPress={skip}>
                                <Text type="label">
                                    Skip
                                    <Icon
                                        name="chevron-double-right"
                                        size={FONT_SIZE[3]}
                                    />
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    <View style={styles.body}>
                        <Text type="title">{STRINGS.welcome}</Text>
                        <Text type="label">{STRINGS.welcome_subtitle}</Text>
                    </View>
                </>
            )}
            ListFooterComponent={() => (
                <View style={styles.body}>
                    <Text type="caption">
                        {STRINGS.onboarding_footer_message}
                    </Text>
                    <Button title={STRINGS.onboarding_footer} onPress={skip} />
                </View>
            )}
        />
    );
};

export default OnboardingScreen;
