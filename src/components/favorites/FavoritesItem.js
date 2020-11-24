import React, { Fragment } from 'react';

const FavoritesItem = ({ favorite }) => {
    return (
        <Fragment>
            <img src={favorite.img_src} alt="Mars Rover Photo" className="favorites-image" />
        </Fragment>
    )
}

export default FavoritesItem
