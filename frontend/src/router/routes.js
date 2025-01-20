import About from "../pages/About";
import Posts from "../pages/Posts";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage"; // детальная страница поста

/* Описание маршрутов в приложении */

/* Маршруты только для авторизованных пользователей */
export const privateRoutes = [
    { path: '/', component: Posts, exact: true },
    { path: '/posts', component: Posts, exact: true },
    { path: '/posts/:id', component: PostIdPage, exact: true },
    { path: '/about', component: About, exact: true },
]

/* Маршруты для впервые вошедших в приложении */
export const publicRoutes = [
    { path: '/login', component: Login, exact: true },
]