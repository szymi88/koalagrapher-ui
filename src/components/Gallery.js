import React from 'react';
import GallerySection from './GallerySection';
import styles from './Gallery.module.css';
import {testSections} from '../data/gallery.js';

const Gallery = ({sections}) => {
    // const {resultId} = useParams();
    if (sections.length === 0) {
        sections = testSections
    }

    const children = sections.map((section) => (
        <div key={section.id}>
            {/* FIXME name should not be key*/}
            <GallerySection images={section.images} name={section.name} />
        </div>
    ))

    return (
        <div>
            <FullPagePhotoWithTitle photoUrl={sections[0].images[0]} title={"Title - TODO"}/>
            <div className={styles["gallery__sections"]}>
                {children}
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