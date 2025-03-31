import {API_URL} from "@/constants/env";
import {STORAGE_ID} from "@/constants/storage";
import type {Article} from "@/models/article";
import {Storage} from "@/utils/storage";
import {http} from "./http";

type API = {
    getArticles: () => Promise<Article[]>;
};

export const api: API = {
    getArticles: () =>
        http
            .get(API_URL)
            .then((response) => response.hits as unknown as Article[])
            .then(async (articles: Article[]) => {
                const storageDeletedIds = await Storage.getItem(
                    STORAGE_ID.deletedIdsSet
                );
                if (!storageDeletedIds) return articles;
                const deletedIdsSet = new Set(
                    JSON.parse(storageDeletedIds) as string[]
                );
                return articles.filter(
                    (article) => !deletedIdsSet.has(article.objectID)
                );
            })
            .then((articles: Article[]) =>
                articles.sort((a, b) => b.created_at_i - a.created_at_i)
            ),
};
