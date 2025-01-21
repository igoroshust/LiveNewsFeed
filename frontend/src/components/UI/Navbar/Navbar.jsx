import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../Button/MyButton';
import { AuthContext } from "../../../context/context";

const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    /* Кнопка 'выйти'. Удаляем запись true из localstorage */
    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }

    return (
         <div className="navbar">
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
             <div className="navbar__links">
                  <Link to="/posts">Список постов</Link>
                  <Link to="/about">О сайте</Link>
             </div>
         </div>
    );
};

export default Navbar;