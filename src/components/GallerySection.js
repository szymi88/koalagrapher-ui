import React from "react";
import styles from './GallerySection.module.css';


import {MasonryPhotoAlbum} from "react-photo-album";
import "react-photo-album/masonry.css";
import {Lightbox} from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

import {CSS} from '@dnd-kit/utilities';

import {DndContext} from '@dnd-kit/core';
import {arrayMove, SortableContext, useSortable} from "@dnd-kit/sortable";


const GallerySection = ({images, name, id}) => {

    const initialImages = images.map((image, index) => (
        {id: id + "_photo_" + index, key:id + "_photo_" + index, src: image, width: 3840, height: 4800}
    ))

    const [photos, setPhotos] = React.useState(initialImages);
    const [index, setIndex] = React.useState(-1);

    function wrapImage(props, index, photo) {
        return <Draggable key={"draggable-photo-" + photo.id} id={photo.id} wrappedProps={props}/>
    }

    function handleDragEnd(event) {
        console.log(event);
        const {active, over} = event;
        if (active.id !== over.id) {
            setPhotos((items) => {
                const oldIndex = items.findIndex(photo => photo.id === active.id);
                const newIndex = items.findIndex(photo => photo.id === over.id);
                return arrayMove(items, oldIndex, newIndex); // arrayMove function from a library like dnd-kit utils
            });

            console.log(photos);
        }
    }

    return (
        <>
            <h1 className={styles["gallery-section__name"]}>{name}</h1>
            <DndContext onDragEnd={handleDragEnd}>
                <SortableContext items={photos.map(photo => photo.id)} key={"sortable_context"+id}>
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
                </SortableContext>
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
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div key={"sortable-"+props.id} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div key={"ssortable-"+props.id} {...props.wrappedProps} />
        </div>
    );
}

export default GallerySection;