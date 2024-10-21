import React from 'react';
import GallerySection from './GallerySection';
import styles from './Gallery.module.css';

const Gallery = ({sections, setPhotos, editable=false}) => {
    const sectionsComponents = sections.map((section) => (
        <div key={section.id}>
            <GallerySection section={section} setPhotos={setPhotos} editable={editable}/>
        </div>
    ));

    function getCoverPhoto(sections) {
        // if (sections.length === 0 ) {
        //     return "";
        // }
        // if (sections[0].photos.length === 0 ) {
        //     return "";
        // }
        // return sections[0].photos[0].src;
        return "";
    }

    return (
        <div>
            <FullPagePhotoWithTitle photoUrl={getCoverPhoto(sections)} title={"Title - TODO"}/>
            <div className={styles["gallery__sections"]}>
                {sectionsComponents}
            </div>
        </div>
    );

    function FullPagePhotoWithTitle({photoUrl, title}) {
        return (
            <div className={`${styles['gallery']} ${editable ? styles['gallery-edit-mode'] : ''}`}>
                <img src={photoUrl} alt={title} className={styles["gallery__main-image"]}/>
                <div className={styles["gallery__main-image__title"]}>
                    <h1>{title}</h1>
                </div>
            </div>
        );
    }
}


export default Gallery;