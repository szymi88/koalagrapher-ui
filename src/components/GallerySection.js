import React from "react";
import styles from './GallerySection.module.css';


import {MasonryPhotoAlbum} from "react-photo-album";
import "react-photo-album/masonry.css";
import {Lightbox} from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

import {CSS} from '@dnd-kit/utilities';

import {DndContext} from '@dnd-kit/core';
import {arrayMove, SortableContext, useSortable} from "@dnd-kit/sortable";


const GallerySection = ({section, setPhotos, editable}) => {
    const {photos, name, id} = section;

    const [index, setIndex] = React.useState(-1);

    function wrapImage(props, index, photo) {
        return <DraggableWrapper key={"draggable-photo-" + photo.id} id={photo.id} wrappedProps={props}/>
    }

    let onClick = null;
    if (!editable) {
        {/*A bit of a magic here. The wrapper handler is active only when the onClick is null.
         So in edit mode we set onClick to null and activate drag and drop or we set onClick to ful screen view and drag is not active*/
        }
        onClick = ({index: current}) => setIndex(current)
    }

    return (
        <>
            <h1 className={styles["gallery-section__name"]} contenteditable={editable ? "true" : "false"}>
                {name ? name : 'Default'}
            </h1>
            <EditableGalleryWrapper photos={photos} setPhotos={setPhotos} sectionId={id}>
                <MasonryPhotoAlbum
                    photos={photos}
                    columns={3}
                    render={{
                        wrapper: (props, {index, photo}) => wrapImage(props, index, photo),
                    }}
                    onClick={onClick}
                />
            </EditableGalleryWrapper>
            <Lightbox
                index={index}
                slides={photos}
                open={index >= 0}
                close={() => setIndex(-1)}
            />
        </>
    );
};

const DraggableWrapper = (props) => {
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

    return <div key={"sortable-" + props.id} ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <div key={"photo-wrapper-" + props.id} {...props.wrappedProps} />
    </div>
}

const EditableGalleryWrapper = ({children, photos, setPhotos, sectionId}) => {
    function handleDragEnd(event) {
        const {active, over} = event;
        if (active.id !== over.id) {
            const oldIndex = photos.findIndex(photo => photo.id === active.id);
            const newIndex = photos.findIndex(photo => photo.id === over.id);

            setPhotos(sectionId, arrayMove(photos, oldIndex, newIndex));
        }
    }

    function addPhotos(files) {
        let nextId = photos.length;
        files.map(files => {
            let photoId = sectionId + "_photo_" + nextId++;
            return {
                id: photoId,
                key: photoId,
                src: URL.createObjectURL(files),
                width: 3840,
                height: 4800
            }
        }).forEach((img) => photos.push(img));

        setPhotos(sectionId, [...photos]);
        uploadPhotos(files);
    }

    function uploadPhotos(files) {
        //TODO
    }

    const emptyDropZone = <div className={styles['gallery-section_dropzone']}>
        <p>
            Drop Photos Here...
        </p>
    </div>

    return <DropZone addPhotos={addPhotos}>
        <DndContext onDragEnd={handleDragEnd}>
            <SortableContext items={photos.map(photo => photo.id)} key={"sortable_context" + sectionId}>
                {photos.length === 0 ? emptyDropZone : ''}
                {children}
            </SortableContext>
        </DndContext>
    </DropZone>
}


const DropZone = ({children, addPhotos}) => {

    const [isDragging, setIsDragging] = React.useState(false);


    function onDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        addPhotos([...event.dataTransfer.files]
            .filter(file => file.type.startsWith("image/")));
    }

    function onDragOver(event) {
        event.preventDefault();
        setIsDragging(true);
    }

    function onDragLeave(event) {
        setIsDragging(false);
    }

    return <div className={`${styles['gallerySection__files-drop']} ${isDragging ? styles['gallery-section_dropzone_active'] : ''}`}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}>
        {children}
    </div>
}

export default GallerySection;