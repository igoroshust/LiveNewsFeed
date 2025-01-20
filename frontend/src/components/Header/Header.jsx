import React from "react";
import $style from "./Header.module.css";

const Header = () => {
    return (
          <header className={$style.header}>
             <nav className={$style.nav}>
                <ul>
                    <li className={$style.item}>Обо мне</li>
                    <li className={$style.item}>Контакты</li>
                    <li className={$style.item}>Истории</li>
                </ul>
             </nav>
          </header>
    )
}

export default Header;