import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import PhotoGallery from './PhotoGallery';
import styles from './Gallery.module.css';

const Gallery = ({sections}) => {
    const {resultId} = useParams();

    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handlePhotoClick = (event, {photo}) => {
        setSelectedPhoto(photo);
    };

    return (
        <div>
            {/*<MainImage image="mainImage.jpg" title="Gallery Title" />*/}
            {/*<img src={sections[0].images[0]} alt={"Main Gallery Image"}></img>*/}

            {sections.map((section) => (
                <div className={styles.galleryWrapper}>
                    <h1>{section.name}</h1>
                    <PhotoGallery images={section.images} onClick={handlePhotoClick}/>
                </div>
            ))}
        </div>
    );
}

export default Gallery;