import {useParams} from "react-router-dom";
import React from "react";
import Gallery from "../components/Gallery/Gallery";
import useGallery from "../hooks/useGallery";

const ClientGallery = () => {
    const {galleryId} = useParams();
    const [gallery, error] = useGallery(galleryId);

    if (error) {
        return "Error: " + error;
    }
    if (!gallery) {
        return "LOADING"
    }
    return <Gallery gallery={gallery} editable={false}/>;
}

export default ClientGallery;