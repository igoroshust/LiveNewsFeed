import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter/AppRouter";
import { AuthContext } from "./context/context";

/*
// Swagger
import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css';

const spec = require('./swagger-config.yaml');

const ui = SwaggerUI({
  spec,
  dom_id: '#swagger',
});

ui.initOAuth({
  appName: "Swagger UI Webpack Demo",
  clientId: 'implicit'
});
*/

function App() {

    /* Тип авторизации пользователя */
    const [isAuth, setIsAuth] = useState(false);

    /* Состояние для запроса на сервер (чтобы при обновлении страницы posts/id не вылетало) */
    const [isLoading, setLoading] = useState(true);

    const [posts, setPosts] = useState([]);

    /* Сохраняем, авторизован пользователь, или нет */
    useEffect(() => {
        if(localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }} >
         <BrowserRouter>
           <Navbar />
           <AppRouter posts={posts} setPosts={setPosts}/>
        </BrowserRouter>
       </AuthContext.Provider>
    );
}

export default App;