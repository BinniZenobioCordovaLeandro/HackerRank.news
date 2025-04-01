import {STORAGE_ID} from "@/constants/storage";
import type {Category} from "@/models/category";
import {Storage} from "@/utils/storage";
import {useEffect, useState} from "react";

const CATEGORIES: Category[] = [
    {
        name: "Android",
        icon: "android",
    },
    {
        name: "iOS",
        icon: "apple",
    },
    {
        name: "JavaScript",
        icon: "language-javascript",
    },
    {
        name: "Python",
        icon: "language-python",
    },
    {
        name: "Java",
        icon: "language-java",
    },
    {
        name: "C++",
        icon: "language-cpp",
    },
    {
        name: "Ruby",
        icon: "language-ruby",
    },
    {
        name: "PHP",
        icon: "language-php",
    },
    {
        name: "Swift",
        icon: "language-swift",
    },
    {
        name: "Go",
        icon: "language-go",
    },
    {
        name: "Rust",
        icon: "language-rust",
    },
    {
        name: "CSS",
        icon: "language-css3",
    },
    {
        name: ".",
        icon: "star-outline",
    },
];

export const useCategories = () => {
    const [favoriteCategories, setFavoriteCategories] = useState<string[]>([]);

    useEffect(() => {
        Storage.getItem(STORAGE_ID.favoriteCategories).then((data) => {
            if (data) setFavoriteCategories(JSON.parse(data));
        });
    }, []);

    const toggleFavoriteCategory = async (category: Category) => {
        setFavoriteCategories((prevFavorites) => {
            const updatedFavorites = prevFavorites.includes(category.name)
                ? prevFavorites.filter((name) => name !== category.name)
                : [...prevFavorites, category.name];
            return updatedFavorites;
        });
    };

    useEffect(() => {
        if (favoriteCategories.length > 0)
            Storage.setItem(
                STORAGE_ID.favoriteCategories,
                JSON.stringify(favoriteCategories)
            );
    }, [favoriteCategories]);

    return {
        categories: CATEGORIES.map((category) => ({
            ...category,
            isFavorite: favoriteCategories.includes(category.name),
        })),
        favoriteCategories,
        toggleFavoriteCategory,
    };
};
