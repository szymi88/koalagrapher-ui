import {useLocation, useParams} from "react-router-dom";
import React, {useState} from "react";
import Gallery from "./Gallery";

const GalleryPreview = () => {
    const location = useLocation();
    const { sections } = location.state || {};

    return <Gallery sections={sections} editable={false}/>
}

export default GalleryPreview;