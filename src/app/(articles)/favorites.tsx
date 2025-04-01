import {Swipeable} from "@/components/Swipeable/Swipeable";
import {Text} from "@/components/Text/Text";
import {STORAGE_ID} from "@/constants/storage";
import {STRINGS} from "@/constants/strings";
import type {Article} from "@/models/article";
import {styles} from "@/styles";
import {Storage} from "@/utils/storage";
import {FlashList} from "@shopify/flash-list";
import {useFocusEffect} from "expo-router";
import type React from "react";
import {useCallback, useState} from "react";
import {onPressArticle} from ".";

const FavoritesScreen = () => {
    const [favoriteArticles, setFavoriteArticles] = useState<Article[]>([]);

    useFocusEffect(
        useCallback(() => {
            Storage.getItem(STORAGE_ID.favoriteArticles).then((articles) => {
                if (articles) setFavoriteArticles(JSON.parse(articles));
            });
        }, [])
    );

    const emptyList: React.FC = () => (
        <Text type="default" style={styles.informationText}>
            {STRINGS.empty}
        </Text>
    );

    return (
        <FlashList
            data={favoriteArticles}
            renderItem={({item: article}) => (
                <Swipeable
                    title={article.story_title}
                    caption={article.author}
                    style={styles.swipeableContainer}
                    onPress={() => onPressArticle(article)}
                />
            )}
            keyExtractor={(item) => item.objectID}
            ListEmptyComponent={emptyList}
        />
    );
};
export default FavoritesScreen;
