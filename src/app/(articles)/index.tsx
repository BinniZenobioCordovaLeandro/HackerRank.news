import {Icon} from "@/components/Icon/Icon";
import {Swipeable} from "@/components/Swipeable/Swipeable";
import {Text} from "@/components/Text/Text";
import {PATHS} from "@/constants/routes";
import {STRINGS} from "@/constants/strings";
import {useArticles} from "@/hooks/useArticles";
import type {Article} from "@/models/article";
import {styles} from "@/styles";
import {theme} from "@/theme/colors";
import {FONT_SIZE} from "@/theme/fonts";
import {FlashList} from "@shopify/flash-list";
import {router} from "expo-router";
import {RefreshControl} from "react-native";

export const onPressArticle = (article: Article) =>
    router.push(PATHS.WEB(article.story_url, article.story_title));

function HomeScreen() {
    const {text: color, background: backgroundColor} = theme();

    const {
        articles,
        loading,
        error,
        fetchArticles: refresh,
        deleteArticle,
        toggleFavoriteArticle,
    } = useArticles();

    const emptyList: React.FC = () => (
        <Text type={error ? "error" : "default"} style={styles.informationText}>
            {error || (loading ? STRINGS.loading : STRINGS.empty)}
        </Text>
    );

    const swipeableFooterActions = (article: Article) => {
        const iconName = article.isFavorite ? "heart" : "heart-outline";

        const onPressFavorite = (article: Article) => {
            toggleFavoriteArticle(article.objectID);
        };

        return (
            <Icon
                name={iconName}
                size={FONT_SIZE[3]}
                onPress={() => onPressFavorite(article)}
            />
        );
    };

    return (
        <FlashList
            refreshing={loading}
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    title={STRINGS.loading}
                    tintColor={color}
                    titleColor={color}
                    progressBackgroundColor={backgroundColor}
                    onRefresh={refresh}
                />
            }
            data={articles}
            renderItem={({item: article}: {item: Article}) => (
                <Swipeable
                    title={article.story_title}
                    caption={article.author}
                    footer={() => swipeableFooterActions(article)}
                    onPress={() => onPressArticle(article)}
                    onDismiss={() => deleteArticle(article.objectID)}
                    style={styles.swipeableContainer}
                />
            )}
            keyExtractor={(item) => item.objectID}
            ListEmptyComponent={emptyList}
        />
    );
}

export default HomeScreen;
