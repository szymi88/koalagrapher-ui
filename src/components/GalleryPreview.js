import {useLocation} from "react-router-dom";
import React from "react";
import Gallery from "./Gallery";

const GalleryPreview = () => {
    const location = useLocation();
    const { gallery } = location.state || {};

    return <Gallery gallery={gallery} editable={false}/>
}

export default GalleryPreview;