import React from "react";
import styles from './GallerySection.module.css';


import {MasonryPhotoAlbum} from "react-photo-album";
import "react-photo-album/masonry.css";
import {Lightbox} from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

import {CSS} from '@dnd-kit/utilities';

import {DndContext} from '@dnd-kit/core';
import {arrayMove, SortableContext, useSortable} from "@dnd-kit/sortable";
import {Image as Img} from 'react-native';
import ContentEditable from 'react-contenteditable';
import useUploadPhotos from '../../hooks/useUploadPhotos';

const GallerySection = ({section, updateSection, editable}) => {
    const [index, setIndex] = React.useState(-1);
    //  const [sectionTitle, setSectionTitle] = React.useState(section.title);

    const updatePhotos = (id, updatedPhotos) => {
        section.photos = updatedPhotos;
        updateSection(section);
    }

    function wrapImage(props, index, photo) {
        return <DraggableWrapper key={"draggable-photo-" + photo.id} id={photo.id} wrappedProps={props}/>
    }

    let onClick = null;
    if (!editable) {
        /*A bit of a magic here. The wrapper handler is active only when the onClick is null.
         So in edit mode we set onClick to null and activate drag and drop or we set onClick to ful screen view and drag is not active*/
        onClick = ({index: current}) => setIndex(current)
    }

    function updateTitle(event) {
        updateSection({
            ...section,
            title: event.target.value
        })
    }

    let photos = <MasonryPhotoAlbum
        photos={section.photos}
        columns={3}
        render={{
            wrapper: (props, {index, photo}) => wrapImage(props, index, photo),
        }}
        onClick={onClick}
    />

    if (editable) {
        photos = <EditableGalleryWrapper photos={section.photos} setPhotos={updatePhotos} sectionId={section.id}>
            {photos}
        </EditableGalleryWrapper>;
    } else {
        photos = <>
            {photos}
            < Lightbox
                index={index}
                slides={section.photos}
                open={index >= 0}
                close={() => setIndex(-1)}
            />
        </>
    }

    return (
        <>
            <h1 className={styles["gallery-section__name"]}>
                {editable ? <ContentEditable
                    onChange={updateTitle}
                    html={section.title}>
                </ContentEditable> : section.title}
            </h1>
            {photos}
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

const EditableGalleryWrapper = ({
                                    children, photos, setPhotos, sectionId
                                }) => {

    function handleDragEnd(event) {
        const {active, over} = event;
        if (active.id !== over.id) {
            const oldIndex = photos.findIndex(photo => photo.id === active.id);
            const newIndex = photos.findIndex(photo => photo.id === over.id);

            setPhotos(sectionId, arrayMove(photos, oldIndex, newIndex));
        }
    }

    const onPhotoUploadSuccess = (photo, photoUrl) => {

        //TODO
        console.log(photo, photoUrl);
    }
    const onPhotoUploadError = () => {
        //TODO
    }

    const uploadPhoto = useUploadPhotos(onPhotoUploadSuccess, onPhotoUploadError)


    async function addPhotos(files) {
        let nextId = photos.length;

        let photosForUpload = files.map(file => {
            let photoId = sectionId + "_photo_" + nextId++;
            let url = URL.createObjectURL(file);
            return {photoId, url, file};
        });

        //FIXME: remove those async - should work with handlers and mapping
        let updateGalleryPromises = photosForUpload.map(async ({photoId, url, file}) => {
            console.log(photoId);
            const {width, height} = await new Promise((resolve, reject) => {
                Img.getSize(url, (width, height) => resolve({width, height}), reject);
            });
            console.log("photoId");

            return {
                id: photoId,
                key: photoId,
                src: url,
                width: width,
                height: height
            }
        });

        Promise.all(updateGalleryPromises).then(newPhotos => {
            newPhotos.forEach(photo => {
                photos.push(photo);
            });
            setPhotos(sectionId, [...photos]);
        });

        let serverUploadPromises = photosForUpload.map(({photoId, url, file}) => {
            uploadPhoto(photoId, file);
        });

        await Promise.all(serverUploadPromises);
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

const DropZone = ({
                      children, addPhotos
                  }) => {

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