import React from "react";
import styles from "./ImageDropZone.module.css";

const ImageDropZone = ({
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

    const emptyDropzone =
        <div className={`${styles.dropzone} ${isDragging ? styles.dropzone_active : ''}`}>
            <p>
                Drop Photos Here...
            </p>
        </div>


    return <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}>
        {children ? children : emptyDropzone}
    </div>
}

export default ImageDropZone;