import axios from 'axios';

export default class PostService {
    static async getAll(limit = 10, page = 1) { // указываем параметры для ответа
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        }) // возвращаем список постов
        return response;
    }

    static async getById(id) { // указываем параметры для ответа
        console.log(`Fetching post with ID: ${id}`); // Отладочный вывод
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
            return response;
    }

    static async getCommentsByPostId(id) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id + '/comments')
        return response;
    }
}