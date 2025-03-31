import {Swipeable} from "@/components/Swipeable/Swipeable";
import {Text} from "@/components/Text/Text";
import {PATHS} from "@/constants/routes";
import {STRINGS} from "@/constants/strings";
import {useArticles} from "@/hooks/useArticles";
import type {Article} from "@/models/article";
import {styles} from "@/styles";
import {theme} from "@/theme/colors";
import {SPACING} from "@/theme/spacing";
import {FlashList} from "@shopify/flash-list";
import {router} from "expo-router";
import {RefreshControl} from "react-native";

function HomeScreen() {
    const {text: color, background: backgroundColor} = theme();

    const {
        articles,
        loading,
        error,
        fetchArticles: refresh,
        deleteArticle,
    } = useArticles();

    const onPressArticle = (article: Article) =>
        router.push(PATHS.WEB(article.story_url, article.story_title));

    const emptyList: React.FC = () => (
        <Text type={error ? "error" : "default"} style={styles.informationText}>
            {error || (loading ? STRINGS.loading : STRINGS.empty)}
        </Text>
    );

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
