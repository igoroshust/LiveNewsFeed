import { useEffect, useRef } from 'react';

// Отслеживание видимости элемента в области просмотра (viewport)
export const useObserver = (ref, canLoad, isLoading, callback) => {

    /* Досту к observer внутри компонента (получение доступа к DOM-элементу, сохранение данных */
    const observer = useRef();

    /* Массив зависимостей для Lazy Load. Каждый раз, когда div появляется в зоне видимости, отрабатывает этот cb */
    useEffect(() => {
        if(isLoading) return;
        if(observer.current) observer.current.disconnect() // если observer создан и в current что-то находится, то отключаем наблюдение за всеми элементами
        var cb = function (entries, observer) {
           if(entries[0].isIntersecting && canLoad) {
                callback()
           }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current) // за каким DOM-элементом наблюдаем
    }, [isLoading])
}