import React from "react";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';

const PostIdPage = () => {

    const params = useParams() // получаем ID поста

    /* Создаём состояние, куда помещаем ответ от сервера (пост по ID)*/
    const [post, setPost] = useState({});

    /* Полученный от сервера комментарий */
    const [comments, setComments] = useState([]);

    /* Отправка запросов */
    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(params.id) // получаем ответ от сервера
        setPost(response.data) // помещаем data в состояние
    })

    /* Получение комментариев */
    const [fetchComments, isComLoading, comError] = useFetching(async () => {
        const response = await PostService.getCommentsByPostId(params.id) // получаем ответ от сервера
        setComments(response.data) // помещаем data в состояние
    })

    /* На первую отрисовку компонента получаем данные с сервера */
    useEffect(() => {
        fetchPostById() // функция, которую возвращает хук
        fetchComments()
    }, [])

    return (
        <div>
            <h1>Вы открыли страницу поста с ID = {params.id}</h1>
            { isLoading
                ? <Loader />
                : <div>{post.id}. {post.title} <br /> {post.body}</div>
            } <br />
            <h3>Комментарии</h3>
            { isComLoading
                ? <Loader />
                : <div>
                    {comments.map(comm =>
                        <div div={comm.id} style={{ marginTop: 15 }} >
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );

}

export default PostIdPage;