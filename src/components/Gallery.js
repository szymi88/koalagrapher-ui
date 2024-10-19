import React from 'react';
import GallerySection from './GallerySection';
import styles from './Gallery.module.css';
import {useParams} from "react-router-dom";
import {getTestGallery} from "../data/gallery";

const Gallery = ({sections}) => {
    const {resultId} = useParams();
    if (sections.length === 0 && resultId === '123') {
        sections = getTestGallery();
    }

    const sectionsComponents = sections.map((section) => (
        <div key={section.id}>
            <GallerySection section={section} editable={false} />
        </div>
    ))

    return (
        <div>
            <FullPagePhotoWithTitle photoUrl={sections[0].images[0].src} title={"Title - TODO"}/>
            <div className={styles["gallery__sections"]}>
                {sectionsComponents}
            </div>
        </div>
    );

    function FullPagePhotoWithTitle({photoUrl, title}) {
        return (
            <div className={styles["gallery"]}>
                <img src={photoUrl} alt={title} className={styles["gallery__main-image"]}/>
                <div className={styles["gallery__main-image__title"]}>
                    <h1>{title}</h1>
                </div>
            </div>
        );
    }
}


export default Gallery;