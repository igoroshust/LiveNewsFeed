import React from 'react';
import { getPagesArray } from "../../../utils/pages";

const Pagination = ({ totalPages, page, changePage }) => {

    /* Формируем массив со значениями от 1 до 10 (зная общее количество страниц: 10) */
    let pagesArray = getPagesArray(totalPages);

    return (
        <div className="page__wrapper">
                     {pagesArray.map(p => // Если элемент итерации функции map равняется номеру текущей страницы, то доб. одни стили, иначе - другие
                        <span
                            onClick={() => changePage(p)} // изменяем состояние, - передаём номер страницы, на которую нажал пользователь
                            key={p} // уникальный ключ по номеру страницы
                            className={page === p ? 'page page__current' : 'page'}>
                            {p}
                        </span>
                     )}
                 </div>
    );

};

export default Pagination;