import {arrayMove, SortableContext} from "@dnd-kit/sortable";
import useUploadPhotos from "../../hooks/useUploadPhotos";
import {DndContext} from "@dnd-kit/core";
import React from "react";
import {Image as Img} from 'react-native';
import ImageDropZone from "./ImageDropZone";


const EditableGalleryWrapper = ({
                                    children, photos, setPhotos, sectionId
                                }) => {

    function handleDragEnd(event) {
        const {active, over} = event;
        if (over && active.id !== over.id) {
            const oldIndex = photos.findIndex(photo => photo.id === active.id);
            const newIndex = photos.findIndex(photo => photo.id === over.id);

            setPhotos(sectionId, arrayMove(photos, oldIndex, newIndex));
        }
    }

    const onPhotoUploadSuccess = (uploadedPhotoId) => {
        let p = photos.map(photo => {
            if (photo.id === uploadedPhotoId) {
                photo.uploaded = true;
            }
            return photo;
        });
        setPhotos(sectionId, p);
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
            const {width, height} = await new Promise((resolve, reject) => {
                Img.getSize(url, (width, height) => resolve({width, height}), reject);
            });

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

    let galleryHtml;
    if (photos.length !== 0) {
        galleryHtml  = <DndContext onDragEnd={handleDragEnd}>
                <SortableContext items={photos.map(photo => photo.id)} key={"sortable_context" + sectionId}>
                    {children}
                </SortableContext>
            </DndContext>
    }

    return <ImageDropZone addPhotos={addPhotos}>
        {galleryHtml}
    </ImageDropZone>
}

export default EditableGalleryWrapper;