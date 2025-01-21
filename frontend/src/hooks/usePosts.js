import { useMemo } from "react";

// Хук сортировки
export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort]?.localeCompare(b[sort]) || 0); // Используем безопасный доступ
        }
        return posts;
    }, [sort, posts]);

    return sortedPosts;
}

// Хук возвращает отфильтрованный и отсортированный массив
export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => {
            const title = post.title || ''; // Если title undefined, используем пустую строку
            return title.toLowerCase().includes(query.toLowerCase());
        });
    }, [query, sortedPosts]);

    return sortedAndSearchedPosts;
}