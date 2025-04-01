import {API_URL} from "@/constants/env";
import {STORAGE_ID} from "@/constants/storage";
import {STRINGS} from "@/constants/strings";
import type {Article} from "@/models/article";
import {getArticlesMatchs} from "@/utils/matcher";
import {scheduleLocalNotification} from "@/utils/notification";
import {Storage} from "@/utils/storage";
import * as BackgroundFetch from "expo-background-fetch";
import {fetch} from "expo/fetch";

export const fetchArticlesTask = async () => {
    try {
        const response = await fetch(API_URL);
        const {hits}: {hits: Article[]} = await response.json();
        if (!hits) {
            return BackgroundFetch.BackgroundFetchResult.NoData;
        }
        const favoriteCategories = await Storage.getItem(
            STORAGE_ID.favoriteCategories
        );
        if (favoriteCategories) {
            const categories = JSON.parse(favoriteCategories) as string[];
            let filteredHits = hits;
            filteredHits = getArticlesMatchs(hits, categories);
            if (filteredHits.length === 0) {
                return BackgroundFetch.BackgroundFetchResult.NoData;
            }

            const token = await Storage.getItem(STORAGE_ID.notificationToken);
            if (!token) return BackgroundFetch.BackgroundFetchResult.Failed;
            for (const hit of filteredHits) {
                await scheduleLocalNotification(
                    STRINGS.notification + hit.author,
                    hit.story_title,
                    {
                        url: hit.story_url,
                    }
                ).catch();
            }
            return BackgroundFetch.BackgroundFetchResult.NewData;
        }
        return BackgroundFetch.BackgroundFetchResult.NoData;
    } catch (error) {
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
};
