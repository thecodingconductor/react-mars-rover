import React, { Fragment } from 'react';

const FavoritesItem = ({ favorite }) => {
    return (
        <Fragment>
            <img src={favorite.img_src} alt="" />
        </Fragment>
    )
}

export default FavoritesItem
