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
            <GallerySection section={section} onSectionChange={event=> handleSectionChange(section.id, event)} editable={editable}/>
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
        let coverPhoto;

        if (gallery.sections.length !== 0 && gallery.sections[0].photos.length !== 0) {
            let coverPhotoUrl = gallery.sections[0].photos[0].url;
            coverPhoto = <img src={coverPhotoUrl} alt={gallery.title} className={styles.coverPhoto}/>;
        } else {
            coverPhoto = <div className={styles.coverPhotoPlaceholder}/>
        }

        return (
            <div className={`${styles.coverPhotoWrapper} ${editable ? styles.coverPhotoWrapperEditMode : ''}`}>
                {coverPhoto}
                <div className={styles.coverPhotoTitle}>
                    <h1>
                        {editable ? <ContentEditable onChange={(event) => gallery.title = event.target.value} html={gallery.title}></ContentEditable> : gallery.title}
                    </h1>
                </div>
            </div>
        );
    }
}


export default Gallery;