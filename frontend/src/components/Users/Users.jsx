import React from 'react';
import { useLocation } from 'react-router-dom';

const Users = () => {

    const location = useLocation(); // location - текущий адрес в адресной строке, на котором мы находимся
    const search = location.search; // получение доступа к части нашего адреса после знака вопроса
    const query = new URLSearchParams(search); // объявление query-параметров с помощью функции URLSearchParams, принимающей строку

    /* sorting - имя интересующего нас параметра */

    return (
        <h2>
            { location.search }
            <br />
            Отсортированные пользователи: {query.get('sorting')}
        </h2>
    );
}

export default Users;