import {STORAGE_ID} from "@/constants/storage";
import {STRINGS} from "@/constants/strings";
import type {Article} from "@/models/article";
import {api} from "@/services/api";
import {Storage} from "@/utils/storage";
import {useCallback, useEffect, useState} from "react";

export const useArticles = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [deletedArticleIds, setDeletedArticleIds] = useState<Set<string>>(
        new Set()
    );
    const [favoriteArticleIds, setFavoriteArticleIds] = useState<Set<string>>(
        new Set()
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined);

    const fetchArticles = useCallback(async () => {
        try {
            setLoading(true);
            const articles = await api.getArticles();
            setArticles(articles);
            setError(undefined);
        } catch (err) {
            setError(STRINGS.error);
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteArticle = useCallback((deleteId: string) => {
        setDeletedArticleIds((prevDeleted) => {
            const updatedDeleted = new Set(prevDeleted);
            updatedDeleted.add(deleteId);
            return updatedDeleted;
        });
    }, []);

    const toggleFavoriteArticle = useCallback((articleId: string) => {
        setFavoriteArticleIds((prevFavorites) => {
            const updatedFavorites = new Set(prevFavorites);
            if (updatedFavorites.has(articleId)) {
                updatedFavorites.delete(articleId);
            } else {
                updatedFavorites.add(articleId);
            }
            return updatedFavorites;
        });
        setArticles((prevArticles) =>
            prevArticles.map((article) =>
                article.objectID === articleId
                    ? {...article, isFavorite: !article.isFavorite}
                    : article
            )
        );
    }, []);

    const fetchFavorites = useCallback(async () => {
        const savedFavorites = await Storage.getItem(STORAGE_ID.favoriteIdsSet);
        if (savedFavorites)
            setFavoriteArticleIds(new Set(JSON.parse(savedFavorites)));
    }, []);

    useEffect(() => {
        fetchFavorites();
        fetchArticles();
    }, [fetchArticles, fetchFavorites]);

    useEffect(() => {
        if (deletedArticleIds.size > 0 && articles.length > 0) {
            Storage.setItem(
                STORAGE_ID.deletedIdsSet,
                JSON.stringify([...deletedArticleIds])
            );
            const deletedArticles = articles.filter((article) =>
                deletedArticleIds.has(article.objectID)
            );
            const updateDeletedArticles = async () => {
                const lastDeletedArticles = await Storage.getItem(
                    STORAGE_ID.deletedArticles
                );
                if (lastDeletedArticles)
                    Storage.setItem(
                        STORAGE_ID.deletedArticles,
                        JSON.stringify([
                            ...(JSON.parse(lastDeletedArticles) as Article[]),
                            ...deletedArticles,
                        ])
                    );
                else
                    Storage.setItem(
                        STORAGE_ID.deletedArticles,
                        JSON.stringify(deletedArticles)
                    );
            };
            updateDeletedArticles();
        }
    }, [deletedArticleIds, articles]);

    useEffect(() => {
        if (favoriteArticleIds.size > 0 && articles.length > 0) {
            Storage.setItem(
                STORAGE_ID.favoriteIdsSet,
                JSON.stringify([...favoriteArticleIds])
            );
            const favoriteArticles = JSON.stringify(
                articles.filter((article) =>
                    favoriteArticleIds.has(article.objectID)
                )
            );
            Storage.setItem(STORAGE_ID.favoriteArticles, favoriteArticles);
        }
    }, [favoriteArticleIds, articles]);

    return {
        articles: articles.filter(
            (article) => !deletedArticleIds.has(article.objectID)
        ),
        loading,
        error,
        fetchArticles,
        deleteArticle,
        toggleFavoriteArticle,
    };
};
