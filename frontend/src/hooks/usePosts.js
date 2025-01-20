import {useMemo} from "react";

// Хук сортировки
export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        // если строка не пустая
        if(sort) {
            // возвращаем отсортированный массив
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort])) // возвращаем отсортированный массив
        }
        // обычный массив постов
        return posts;
    }, [sort, posts]) // callback(возвращ. результат вычислений) и массив зависимостей (deps). callback вызывается, если хоть одна из зависимостей поменяет значение

    return sortedPosts;
}

// Хук возвращает отфильтрованный и отсортированный массив
export const usePosts = (posts, sort, query) => {
    // массив отсортированных постов
    const sortedPosts = useSortedPosts(posts, sort);

    /* Поиск (на основании отсортированного массива) */
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts]) // в массив зависимостей попадает поисковая строка и отсортированный массив

    return sortedAndSearchedPosts;
}