import React from "react";
import styles from './GallerySection.module.css';


import {MasonryPhotoAlbum} from "react-photo-album";
import "react-photo-album/masonry.css";
import {Lightbox} from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

import {CSS} from '@dnd-kit/utilities';
import {useSortable} from "@dnd-kit/sortable";
import ContentEditable from 'react-contenteditable';
import EditableGalleryWrapper from "./EditableGalleryWrapper";
import mapToGalleryFormat from "../../data/gallery-section";

const GallerySection = ({section, onSectionChange, updateSection, editable}) => {
    const [index, setIndex] = React.useState(-1);

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

    let mappedPhotos = mapToGalleryFormat(section.photos);

    let photos = <MasonryPhotoAlbum
        photos={mappedPhotos}
        columns={3}
        render={{
            wrapper: (props, {index, photo}) => wrapImage(props, index, photo),
        }}
        onClick={onClick}
    />

    if (editable) {
        photos = <EditableGalleryWrapper photos={section.photos} onChange = {onSectionChange} sectionId={section.id}>
            {photos}
        </EditableGalleryWrapper>;
    } else {
        photos = <>
            {photos}
            < Lightbox
                index={index}
                slides={mappedPhotos}
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


export default GallerySection;