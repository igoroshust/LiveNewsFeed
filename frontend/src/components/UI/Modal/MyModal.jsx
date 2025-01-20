import React from "react";
import $style from './MyModal.module.css';

/* children - помещаем в модальное окно всё, что захотим */
/* visible, setVisible - регулируем видимость или невидимость модального окна */
/* visible - видимость окна, setVisible - убираем окно при клике на background */

const MyModal = ({ children, visible, setVisible }) => {

    const rootClasses = [$style.myModal]
    if(visible) {
        rootClasses.push($style.active);
    }

    return (
        // Создаём массив, добавляем два класса, объединяем по пробелу, возвращаем строку
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}> {/* onClick - скрываем модалку при клике на bg */}
            <div className={$style.myModalContent} onClick={(e) => e.stopPropagation()}> {/* onClick - при клике на инпуту модалка не исчезает */}
                { children }
            </div>
        </div>
    );

}

export default MyModal;