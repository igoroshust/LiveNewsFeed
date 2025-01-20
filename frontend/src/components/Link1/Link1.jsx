import React, { useState } from 'react';

const STATUS = {
    HOVERED: "hovered",
    NORMAL: "normal",
};

const Link1 = ({ page, children }) => {
    const [status, setStatus] = useState(STATUS.NORMAL);

    const onMouseEnter = () => { // срабатывает при наведении курсора на компонент и изменяет его статус на hovered
        setStatus(STATUS.HOVERED);
    };

    const onMouseLeave = () => { // срабатывает при удалении курсора с компонента, меняя статус на NORMAL
        setStatus(STATUS.NORMAL);
    };

    return (
        <div>
            <h3>Link1 элемент</h3>
        <a
            className={status}
            href={page || "#"}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >{children}</a>
        </div>
    );
};

export default Link1;