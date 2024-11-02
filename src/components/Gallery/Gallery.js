import React from 'react';
import GallerySection from './GallerySection';
import styles from './Gallery.module.css';
import ContentEditable from "react-contenteditable";

const Gallery = ({gallery, onGalleryChange, editable = false}) => {

    const handleSectionChange = (sectionId, sectionEvent) => {
        onGalleryChange({
            ...sectionEvent,
            sectionId: sectionId,
        });
    }

    const sectionsComponents = gallery.sections.map((section) => (
        <div key={section.id}>
            <GallerySection section={section} onSectionChange={event => handleSectionChange(section.id, event)} editable={editable}/>
        </div>
    ));
    return (
        <div className={styles.galleryWrapper}>
            <div className={styles.gallery}>
                <FullPagePhotoWithTitle gallery={gallery} editable={editable}/>
                <div className={styles.gallerySections}>
                    {sectionsComponents}
                </div>
            </div>
        </div>
    );


    function FullPagePhotoWithTitle({gallery, editable}) {
        return (
            <div className={`${styles.coverPhotoWrapper} ${editable ? styles.coverPhotoWrapperEditMode : ''}`}>
                <CoverPhoto gallery={gallery}/>
                <div className={styles.coverPhotoTitle}>
                    <h1>
                        {editable ? <ContentEditable onChange={(event) => gallery.title = event.target.value} html={gallery.title}></ContentEditable> : gallery.title}
                    </h1>
                </div>
            </div>
        );
    }
}

const CoverPhoto = ({gallery}) => {
    if (gallery.coverPhoto) {
        return <img src={gallery.coverPhoto.url} alt={gallery.title} className={styles.coverPhoto}/>
    } else {
        return <div className={styles.coverPhotoPlaceholder}/>
    }
}

export default Gallery;