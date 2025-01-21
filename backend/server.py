import aiohttp
import aiohttp.web
import asyncio
import json

# Хранилище для новостей и пользовательских постов
news = []
user_posts = []  # Объявляем user_posts здесь
connected_clients = set()  # Используем множество для хранения подключенных клиентов

async def websocket_handler(request):
    ws = aiohttp.web.WebSocketResponse()
    await ws.prepare(request)

    print('Клиент подключился')
    connected_clients.add(ws)

    global user_posts

    # Отправляем все существующие пользовательские посты при подключении
    await ws.send_json(user_posts)

    try:
        while True:
            msg = await ws.receive()
            if msg.type == aiohttp.WSMsgType.TEXT:
                print(f"Received message: {msg.data}")
                data = json.loads(msg.data)

                # Проверяем, является ли сообщение о создании нового поста
                if 'title' in data and 'body' in data:
                    user_posts.append(data)  # Сохраняем новый пост
                    # Рассылаем новый пост всем подключенным клиентам
                    for client in connected_clients:
                        await client.send_json(data)

                # Проверяем, является ли сообщение о удалении поста
                elif data.get('action') == 'remove':
                    post_id = data['postId']
                    # Удаляем пост из user_posts по post_id
                    user_posts[:] = [post for post in user_posts if post['id'] != post_id]
                    # Уведомляем всех клиентов о том, что пост был удален
                    for client in connected_clients:
                        await client.send_json({'action': 'remove', 'postId': post_id})

            elif msg.type == aiohttp.WSMsgType.ERROR:
                print(f'WebSocket connection closed with error: {ws.exception()}')
                break
    finally:
        print("Клиент отключился")
        connected_clients.remove(ws)

    return ws

async def post_news(request):
    global news
    data = await request.json()
    news.append(data)

    # Рассылка новостей всем подключенным клиентам
    for ws in connected_clients:
        await ws.send_json(data)

    return aiohttp.web.Response(status=201)

async def get_news(request):
    return aiohttp.web.json_response(news)

async def get_user_posts(request):
    return aiohttp.web.json_response(user_posts)

async def add_user_post(request):
    data = await request.json()
    user_posts.append(data)
    return aiohttp.web.json_response(data, status=201)

app = aiohttp.web.Application()
app.router.add_get('/ws', websocket_handler)
app.router.add_post('/news', post_news)
app.router.add_get('/news', get_news)
app.router.add_post('/user-posts', add_user_post)
app.router.add_get('/user-posts', get_user_posts)

if __name__ == '__main__':
    aiohttp.web.run_app(app, port=7000)  # Сервер на порту 7000