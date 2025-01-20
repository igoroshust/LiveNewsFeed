import React from "react";
import PostItem from '../PostItem/PostItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


/* принимаем список постов, посты принимаем извне через пропсы, но поскольку props - объект,
то можно из props сразу вытащить нужное для нас поле */
const PostList = ({ posts, title, remove }) => {

    /* Условная отрисовка (посты не найдены) */
    if(!posts.length) {
        return (
            <h1 style={{ textAlign: 'center' }}>Посты не найдены!</h1>
        )
    }

    return (
    <>
        <h2 style={{ textAlign: 'center' }}>{ title }</h2>
        {/* map - получение нового массива с преобразованными элементами */}
        {/* Преобразуем каждый элемент поста в React-элемент (элемент jsx) */}
        {/* Для каждого поста в массиве отрисовываем PostItem и как props передаём туда объект */}
        {/* При создании списка нужно указывать ключ, храняющий уникальное значение (id объекта, как правило) */}
        {/* Ключи позволяют алгоритмам React наиболее эффективно делать рендеринг
        и перерисовывать только элементы, в которых произошли измнения */}

        <TransitionGroup>
        {posts.map((post, index) =>
            <CSSTransition
                key={post.id}
                timeout={500}
                classNames="post"
            >
            <PostItem remove={remove} number={index + 1} post={post} />
            </CSSTransition>
        )}
        </TransitionGroup>
    </>

    );
}

export default PostList;