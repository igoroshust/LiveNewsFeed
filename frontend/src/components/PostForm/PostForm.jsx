import React, { useState } from 'react';
import MyInput from '../UI/Input/MyInput';
import MyButton from '../UI/Button/MyButton';

const PostForm = ({ create }) => {

    /* Объект с постами */
    const [post, setPost] = useState({title: '', body: ''});

    /* Создаём новый пост и добавляем его в массив */
    const addNewPost = (e) => {
        e.preventDefault() // предотвращаем дефолтное поведение бразура (submit у формы)

        const newPost = {
            ...post, id: Date.now()
        }

        /* Передаём новый пост в crate */
        create(newPost)

        /* Обнуляем инпуты после создания поста */
        setPost({title: '', body: ''})

    }

   return (
         <form>
            {/* Управляемый компонент / двустороннее связывание*/}
             {/* onChange - Отслеживаем вводимые пользователем в инпут значения. Из event достаём значение и помещаем его в состояние */}
             {/* setPost - передаём объект, в который разворачиваем старый пост, перезатирая нужно поле в этом инпуте (title для 1 инпута и body для второго) */}
            <MyInput
                value={post.title}
                onChange = {e => setPost({...post, title: e.target.value })}
                type="text"
                placeholder="Название поста"
            />

            {/* Управляемый компонент / двустороннее связывание */}
            {/* setBody - функция, меняющая состояние */}
           <MyInput
               value={post.body}
               onChange = {e => setPost({...post, body: e.target.value })}
               type="text"
               placeholder="Описание поста"
           />


            <MyButton onClick={addNewPost}>Создать пост</MyButton> {/* При клике вызов функции addNewPost */}
         </form>
   );

};

export default PostForm;