import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Posts from "../../pages/Posts";
import Login from "../../pages/Login";
import Loader from "../UI/Loader/Loader";
import { publicRoutes, privateRoutes } from "../../router/routes";
import { AuthContext } from "../../context/context";


const AppRouter = () => {

    const {isAuth, isLoading} = useContext(AuthContext); // храним информацию, авторизован пользователь, или нет.

    if (isLoading) {
        return <Loader />
    }

    return (
              isAuth ?
              <Routes>
                    {privateRoutes.map(route =>
                        <Route
                             element={<route.component />}
                             path={route.path}
                             exact={route.exact}
                             key={route.path}
                         />
                    )}
                <Route path="*" element={<Posts />} />
               </Routes>
               :
               <Routes>
                    {publicRoutes.map(route =>
                        <Route
                             element={<route.component />}
                             path={route.path}
                             exact={route.exact}
                             key={route.path}
                         />
                    )}
                    <Route path="*" element={<Login />} />
               </Routes>
    );
};

export default AppRouter;