import React from "react";
import MyButton from '../UI/Button/MyButton';
import { useNavigate } from "react-router-dom";

/* props - входные данные. Аргумент функции, куда можно передавать что-то извне. */

const PostItem = (props) => {

    const navigate = useNavigate();

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>

            <div className="post__btns">
               <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>
                    Открыть
                </MyButton>
                <MyButton onClick={() => props.remove(props.post)}>  {/* ПО ID пост удаляется из массива */}
                    Удалить
                </MyButton>
            </div>
        </div>
    );
}

export default PostItem;