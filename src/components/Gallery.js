import React from 'react';
import PhotoGallery from './PhotoGallery';
import styles from './Gallery.module.css';

const Gallery = ({sections}) => {
    // const {resultId} = useParams();

    const children = sections.map((section) => (
        <div className={styles.test}>
            <h1>{section.name}</h1>
            <PhotoGallery images={section.images}/>
        </div>
    ))

    return (
        <div>
            <FullPagePhotoWithTitle photoUrl={sections[0].images[0]} title={"Title - TODO"}/>
            {<div className={styles["gallery__sections"]}>
                {children}
            </div>}
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