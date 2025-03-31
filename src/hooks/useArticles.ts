import {STORAGE_ID} from "@/constants/storage";
import {STRINGS} from "@/constants/strings";
import type {Article} from "@/models/article";
import {api} from "@/services/api";
import {Storage} from "@/utils/storage";
import {useCallback, useEffect, useState} from "react";

export const useArticles = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [deletedArticles, setDeletedArticles] = useState<string[]>([]);
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
        setArticles((prevArticles) => {
            const updatedArticles = prevArticles.filter(
                (article) => article.objectID !== deleteId
            );
            setDeletedArticles((prevDeleted) => [...prevDeleted, deleteId]);
            return updatedArticles;
        });
    }, []);

    useEffect(() => {
        fetchArticles();
        Storage.getItem(STORAGE_ID.deletedIdsSet).then(
            (storageDeletedIds) =>
                storageDeletedIds &&
                setDeletedArticles(JSON.parse(storageDeletedIds))
        );
    }, [fetchArticles]);

    useEffect(() => {
        if (deletedArticles)
            Storage.setItem(
                STORAGE_ID.deletedIdsSet,
                JSON.stringify(deletedArticles)
            );
    }, [deletedArticles]);

    return {articles, loading, error, fetchArticles, deleteArticle};
};
