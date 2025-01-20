import axios from 'axios';

export default class PostService {
    static async getAll(limit=10, page=1) {
        // Указываем параметры для ответа
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        })
        // Возвращаем список постов-сообщений
        return response
    }

    static async getById(id) {
        // Указываем параметры для ответа
        console.log(`Запрашиваемый пост с ID: ${id}`) // Отладка
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id + '/comments')
        return response;
    }
}