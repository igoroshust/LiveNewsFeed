import React, { useState, useEffect, useRef } from "react";
import PostList from "../components/PostList/PostList";
import PostForm from "../components/PostForm/PostForm";
import PostFilter from "../components/PostFilter/PostFilter";
import MyButton from "../components/UI/Button/MyButton";
import MySelect from "../components/UI/Select/MySelect";
import MyModal from "../components/UI/Modal/MyModal";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/Pagination/Pagination";
import PostService from "../API/PostService";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { useObserver } from "../hooks/useObserver";
import { getPageCount } from '../utils/pages';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [modal, setModal] = useState(false);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();
    const socketRef = useRef(null);

    // Используем хук для получения постов
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts((prevPosts) => [...prevPosts, ...response.data]); // Обновляем состояние постов
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    });

    useEffect(() => {
        fetchPosts(); // Вызываем fetchPosts без аргументов
    }, [page, limit]); // Зависимости для обновления при изменении страницы или лимита

    useEffect(() => {
        socketRef.current = new WebSocket('ws://localhost:7000/ws');

        socketRef.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (Array.isArray(message)) {
                setPosts(message);
            } else {
                setPosts((prevPosts) => [message, ...prevPosts]);
            }
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket-соединение закрыто.');
        };

        return () => {
            socketRef.current.close();
        };
    }, []);

    const createPost = (newPost) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(newPost));
        } else {
            console.error('WebSocket is not open. Cannot send message.');
        }
        setModal(false);
    };

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    };

    const changePage = (page) => {
        setPage(page);
    };

    return (
        <div className="App">
            <div className="content">
                <MyButton onClick={() => setModal(true)}>
                    Создать пост
                </MyButton>

                <MyModal visible={modal} setVisible={setModal}>
                    <PostForm create={createPost} />
                </MyModal>
                <br />
                <hr style={{ margin: '15px 0' }} />

                <PostFilter filter={filter} setFilter={setFilter} />
                <br />

                <MySelect
                    value={limit}
                    onChange={value => setLimit(value)}
                    defaultValue="Количество элементов на странице"
                    options={[
                        { value: 5, name: '5' },
                        { value: 10, name: '10' },
                        { value: 25, name: '25' },
                        { value: -1, name: 'Показать всё' },
                    ]}
                />

                {postError && <h1>Произошла ошибка: {postError}</h1>}

                <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список постов"} />

                <div ref={lastElement} style={{ height: 20 }}></div>

                {isPostsLoading && <Loader />}
                <br />

                <Pagination page={page} changePage={changePage} totalPages={totalPages} />
            </div>
        </div>
    );
}

export default Posts;