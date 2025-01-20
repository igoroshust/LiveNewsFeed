import React from "react";
import $style from "./Main.module.css";
// import Label from "./Label";

const Main = (props) => {
    return (
    <main className={$style.main}>
        <label className={$style.label}>{ props.name }</label>
        <input className={$style.input} />
    </main>
    );
}

export default Main;