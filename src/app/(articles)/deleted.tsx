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

const DeletesScreen = () => {
    const [deletedArticles, setDeletedArticles] = useState<Article[]>([]);

    useFocusEffect(
        useCallback(() => {
            Storage.getItem(STORAGE_ID.deletedArticles).then((articles) => {
                if (articles) setDeletedArticles(JSON.parse(articles));
            });
        }, [])
    );

    const emptyList: React.FC = () => (
        <Text type="default" style={styles.informationText}>
            {STRINGS.empty_deletes}
        </Text>
    );

    return (
        <FlashList
            data={deletedArticles}
            renderItem={({item: article}) => (
                <Swipeable
                    title={article.story_title}
                    caption={article.author}
                    onPress={() => onPressArticle(article)}
                    style={styles.swipeableContainer}
                />
            )}
            keyExtractor={(item) => item.objectID}
            ListEmptyComponent={emptyList}
        />
    );
};

export default DeletesScreen;
