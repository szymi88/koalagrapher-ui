import React from "react";
import styles from './GallerySection.module.css';


import {MasonryPhotoAlbum} from "react-photo-album";
import "react-photo-album/masonry.css";
import {Lightbox} from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"


const GallerySection = ({images, name}) => {
    const photos = images.map((image, index) => (
        {src: image, width: 3840, height: 4800}
    ))

    const [index, setIndex] = React.useState(-1);

    return (
        <>
            <h1 className={styles["gallery-section__name"]}>{name}</h1>
            <MasonryPhotoAlbum
                photos={photos}
                columns={3}
                onClick={({index: current}) => setIndex(current)}
            />

            <Lightbox
                index={index}
                slides={photos}
                open={index >= 0}
                close={() => setIndex(-1)}
            />
        </>
    )
};

export default GallerySection;