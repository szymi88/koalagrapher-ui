import React from "react";
import styles from './GallerySection.module.css';


import {MasonryPhotoAlbum, RowsPhotoAlbum} from "react-photo-album";
import "react-photo-album/masonry.css";
import {Lightbox} from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

import "react-photo-album/masonry.css";
import "yet-another-react-lightbox/styles.css"

import {DndContext} from '@dnd-kit/core';
import {useSortable} from "@dnd-kit/sortable";
import {SortableContext} from "@dnd-kit/sortable";


const GallerySection = ({images, name, id}) => {
    const photos = images.map((image, index) => (
        {src: image, width: 3840, height: 4800, id: id + "_photo_" + index}
    ))

    const [index, setIndex] = React.useState(-1);

    function wrapImage(props, index, photo) {
        return <Draggable id={"draggable-photo-" + photo.id} wrappedProps={props}/>
    }

    function handleDragEnd() {
    }

    return (
        <>
            <h1 className={styles["gallery-section__name"]}>{name}</h1>
            <DndContext>
                <MasonryPhotoAlbum
                    photos={photos}
                    columns={3}
                    render={{
                        wrapper: (props, {index, photo}) => wrapImage(props, index, photo),
                    }}
                    /*
                    onClick={({index: current}) => setIndex(current)}
                    */
                />
            </DndContext>

            <Lightbox
                index={index}
                slides={photos}
                open={index >= 0}
                close={() => setIndex(-1)}
            />
        </>
    )


};

function Draggable(props) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div {...props.wrappedProps} />
        </div>
    );
}

export default GallerySection;