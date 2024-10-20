// src/components/SectionManager.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

const SectionManager = ({ sections, setSections }) => {
    const [sectionName, setSectionName] = useState('');
    const navigate = useNavigate();

    const handleGenerateGalleryUrl = () => {
        const resultId = uuidv4(); // Generate a unique ID
        navigate(`/gallery/${resultId}`);
    };

    const addSection = () => {
        setSections([...sections, { id: `section-${Date.now()}`, name: sectionName, images: [] }]);
        setSectionName('');
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;

        // If dropped outside a droppable area
        if (!destination) return;

        const sourceSection = sections.find((section) => section.id === source.droppableId);
        const destSection = sections.find((section) => section.id === destination.droppableId);

        // Move within the same section
        if (source.droppableId === destination.droppableId) {
            const reorderedImages = Array.from(sourceSection.images);
            const [movedImage] = reorderedImages.splice(source.index, 1);
            reorderedImages.splice(destination.index, 0, movedImage);
            const updatedSections = sections.map((section) =>
                section.id === source.droppableId ? { ...section, images: reorderedImages } : section
            );
            setSections(updatedSections);
        } else {
            // Move between sections
            const sourceImages = Array.from(sourceSection.images);
            const [movedImage] = sourceImages.splice(source.index, 1);
            const destImages = Array.from(destSection.images);
            destImages.splice(destination.index, 0, movedImage);

            const updatedSections = sections.map((section) => {
                if (section.id === source.droppableId) {
                    return { ...section, images: sourceImages };
                } else if (section.id === destination.droppableId) {
                    return { ...section, images: destImages };
                } else {
                    return section;
                }
            });
            setSections(updatedSections);
        }
    };

    const onDropImages = async (sectionId, files) => {
        const imageUrls = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Mock the upload process, returning a local file path URL
            const imageUrl = URL.createObjectURL(file); // Replace with actual upload logic
            imageUrls.push(imageUrl);

            // If implementing real upload:
            // const uploadedImageUrl = await uploadImageToBackend(file);
            // imageUrls.push(uploadedImageUrl);
        }

        const updatedSections = sections.map((section) => {
            if (section.id === sectionId) {
                return { ...section, images: [...section.images, ...imageUrls] };
            }
            return section;
        });
        setSections(updatedSections);
    };

    return (
        <SectionManagerWrapper>
            <DragDropContext onDragEnd={onDragEnd}>
                {sections.map((section) => (
                    <Section key={section.id} section={section} onDropImages={onDropImages} />
                ))}
            </DragDropContext>
            <input
                type="text"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                placeholder="Section Name"
            />
            <button onClick={addSection}>Add Section</button>
            <button onClick={handleGenerateGalleryUrl}>Generate URL</button>
        </SectionManagerWrapper>
    );
};

const Section = ({ section, onDropImages }) => {
    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            onDropImages(section.id, files);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <Droppable droppableId={section.id} direction="horizontal">
            {(provided) => (
                <SectionWrapper
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <h3>{section.name}</h3>
                    <div className="image-container">
                        {section.images.map((image, index) => (
                            <Draggable key={index} draggableId={`${section.id}-${index}`} index={index}>
                                {(provided) => (
                                    <img
                                        ref={provided.innerRef}
                                        src={image}
                                        alt="Uploaded"
                                        width="100px"
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                </SectionWrapper>
            )}
        </Droppable>
    );
};

const SectionManagerWrapper = styled.div`
    padding: 20px;
`;

const SectionWrapper = styled.div`
    margin-bottom: 20px;
    padding: 10px;
    border: 2px dashed black;
    .image-container {
        display: flex;
        gap: 10px;
    }
`;

export default SectionManager;
