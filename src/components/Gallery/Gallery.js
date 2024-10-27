import React from 'react';
import GallerySection from './GallerySection';
import styles from './Gallery.module.css';
import ContentEditable from "react-contenteditable";

const Gallery = ({gallery, updateSections, updateGallery, editable = false}) => {

    const updateSection = (updatedSection) => {
        updateSections(
            gallery.sections.map(section => {
                if (section.id === updatedSection.id) {
                    return updatedSection;
                }
                return section;
            })
        );
    };

    const sectionsComponents = gallery.sections.map((section) => (
        <div key={section.id}>
            <GallerySection section={section} updateSection={updateSection} editable={editable}/>
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
            let coverPhotoUrl = gallery.sections[0].photos[0].src;
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