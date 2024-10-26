import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Gallery from "./Gallery";
import {getGallery} from "../data/gallery";

const ClientGallery = () => {
    const {galleryId} = useParams();
    const [gallery, setGallery] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getGallery(galleryId).then((ret) => {
            setGallery(ret);
        }).catch(setError);
    }, [galleryId]);

    if (error) {
        return "Error: " + error;
    }
    if (!gallery) {
        return "LOADING"
    }
    return <Gallery gallery={gallery} editable={false}/>;
}

export default ClientGallery;