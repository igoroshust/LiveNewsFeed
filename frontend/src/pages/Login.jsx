import React, { useContext } from 'react';
import MyInput from "../components/UI/Input/MyInput";
import MyButton from "../components/UI/Button/MyButton";
import { AuthContext } from "../context/context";

/* Маршруты для авторизованных пользователей */
const Login = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true'); // по ключу auth сохраняем строку true
    }

    return (
        <div>
            <h1>Страница для логина</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Введите логин" />
                <MyInput type="password" placeholder="Введите пароль" />
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );

}

export default Login;