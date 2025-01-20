import { useState } from 'react';

// Управление состоянием загрузки (loader)
// callback - запрос, перед которым показываем Loader и после выполнения которого Loader скрывается
export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);

    // Обработка ошибок хуком
    const [error, setError] = useState('');

    const fetching = async () => {
        try {
            // Показываем лоадер
            setIsLoading(true)
            // Вызываем cd, который приняли аргументом
            await callback()
        } catch (e) {
            // Обрабатываем случай возникновшения ошибки
            setError(e.message); // если ошибка, помещаем в неё текст
        } finally {
            // Скрываем Loader
            setIsLoading(false)
        }
    }
    return [fetching, isLoading, error]
};