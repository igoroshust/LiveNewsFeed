import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';

const PostIdPage = ({ posts }) => {
    const params = useParams(); // получаем ID поста
    const [post, setPost] = useState({}); // состояние для поста
    const [comments, setComments] = useState([]); // состояние для комментариев

    // Функция для получения поста по ID
    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(params.id); // получаем ответ от сервера
        setPost(response); // помещаем data в состояние
    });

    // Получение комментариев
    const [fetchComments, isComLoading, comError] = useFetching(async () => {
        try {
            const response = await PostService.getCommentsByPostId(params.id); // получаем ответ от сервера
            setComments(response); // помещаем data в состояние
        } catch (err) {
            console.error('Ошибка при получении комментариев:', err);
        }
    });

    // На первую отрисовку компонента получаем данные с сервера
    useEffect(() => {
        const localPost = posts.find(p => p.id === Number(params.id));
        if (localPost) {
            setPost(localPost); // Если пост найден, устанавливаем его в состояние
        } else {
            fetchPostById(); // Если пост не найден, делаем запрос к API
        }
        fetchComments(); // Получаем комментарии
    }, [params.id, posts]);

    return (
        <div>
            <h1>Вы открыли страницу поста с ID = {params.id}</h1>
            {isLoading
                ? <Loader />
                : post && post.id ? ( // Проверяем, что post существует и имеет id
                    <div>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                ) : (
                    <div>Содержимое локально созданного поста доступно только на главной странице.</div>
                )
            } <br />
            <h3>Комментарии</h3>
            {isComLoading
                ? <Loader />
                : (
                    Array.isArray(comments) && comments.length > 0 ? (
                        comments.map(comm => (
                            <div key={comm.id} style={{ marginTop: 15 }}>
                                <h5>{comm.email}</h5>
                                <div>{comm.body}</div>
                            </div>
                        ))
                    ) : (
                        <div>Нет комментариев</div>
                    )
                )
            }
        </div>
    );
}

export default PostIdPage;