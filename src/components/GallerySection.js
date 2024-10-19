import React from "react";
import styles from './GallerySection.module.css';


import {MasonryPhotoAlbum} from "react-photo-album";
import "react-photo-album/masonry.css";
import {Lightbox} from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

import {CSS} from '@dnd-kit/utilities';

import {DndContext} from '@dnd-kit/core';
import {arrayMove, SortableContext, useSortable} from "@dnd-kit/sortable";


const GallerySection = ({section, editable})  => {
    const {images, name, id} = section;

    const [photos, setPhotos] = React.useState(images);
    const [index, setIndex] = React.useState(-1);

    function wrapImage(props, index, photo) {
        return <DraggableWrapper key={"draggable-photo-" + photo.id} id={photo.id} wrappedProps={props}/>
    }

    function handleDragEnd(event) {
        const {active, over} = event;
        if (active.id !== over.id) {
            setPhotos((items) => {
                const oldIndex = items.findIndex(photo => photo.id === active.id);
                const newIndex = items.findIndex(photo => photo.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    let onClick = null;
    if (!editable) {
        {/*A bit of a magic here. The wrapper handler is active only when the onClick is null.
         So in edit mode we set onClick to null and activate drag and drop or we set onClick to ful screen view and drag is not active*/}
        onClick = ({index: current}) => setIndex(current)
    }

    return (
        <>
            <h1 className={styles["gallery-section__name"]}>{name}</h1>
            <DndContext onDragEnd={handleDragEnd}>
                <SortableContext items={photos.map(photo => photo.id)} key={"sortable_context" + id}>
                    <MasonryPhotoAlbum
                        photos={photos}
                        columns={3}
                        render={{
                            wrapper: (props, {index, photo}) => wrapImage(props, index, photo),
                        }}
                        onClick={onClick}
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
    );
};

function DraggableWrapper(props) {
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
        <div key={"sortable-" + props.id} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div key={"photo-wrapper-" + props.id} {...props.wrappedProps} />
        </div>
    );
}

export default GallerySection;