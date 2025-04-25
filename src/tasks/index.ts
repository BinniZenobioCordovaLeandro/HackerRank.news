import {API_URL} from "@/constants/env";
import {STORAGE_ID} from "@/constants/storage";
import {STRINGS} from "@/constants/strings";
import {TASK_STATE} from "@/hooks/useBackgroundFetch";
import type {Article} from "@/models/article";
import {getArticlesMatchs} from "@/utils/matcher";
import {scheduleLocalNotification} from "@/utils/notification";
import {Storage} from "@/utils/storage";
import {fetch} from "expo/fetch";

export const fetchArticlesTask = async (): Promise<TASK_STATE> => {
    try {
        const response = await fetch(API_URL);
        const {hits}: {hits: Article[]} = await response.json();
        if (!hits) {
            return TASK_STATE.NO_DATA;
        }
        const favoriteCategories = await Storage.getItem(
            STORAGE_ID.favoriteCategories
        );
        if (favoriteCategories) {
            const categories = JSON.parse(favoriteCategories) as string[];
            let filteredHits = hits;
            filteredHits = getArticlesMatchs(hits, categories);
            if (filteredHits.length === 0) {
                return TASK_STATE.NO_DATA;
            }

            for (const hit of filteredHits) {
                await scheduleLocalNotification(
                    STRINGS.notification + hit.author,
                    hit.story_title,
                    {
                        url: hit.story_url,
                    }
                ).catch();
            }
            return TASK_STATE.SUCCESS;
        }
        return TASK_STATE.NO_DATA;
    } catch (error) {
        return TASK_STATE.ERROR;
    }
};
