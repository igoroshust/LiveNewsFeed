import React from 'react';
import {useParams} from "react-router-dom";

const User = () => {

    // хук для получения доступа к параметрам после слеша (users => /:id)
    const params = useParams();

    return (
        <h2>Выбранный пользовательский ID: {params.id} </h2>
    );
}

export default User;