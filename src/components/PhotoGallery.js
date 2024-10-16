import {ColumnsPhotoAlbum} from "react-photo-album";

import React from "react";
import "react-photo-album/columns.css";


const PhotoGallery = ({images, onClick}) => {
    const photos = images.map((image, index) => (
        {src: image, width: 600, height: 600}
    ))

    return (
        <ColumnsPhotoAlbum photos={photos} columns={3} onClick={onClick}/>
    )
};

export default PhotoGallery;