import {useNavigate, useParams} from "react-router-dom";

import React, {useRef, useState} from 'react';
import {Button, Col, Container, Row,} from 'react-bootstrap';
import Gallery from "./Gallery";
import {v4 as uuidv4} from 'uuid'; // Import UUID library
import styles from './GalleryEditor.module.css';

const GalleryEditor = () => {
    const {galleryId} = useParams();
    const scrollableGalleryPreview = useRef(null);

    const [gallery, setGallery] = useState({
        title: "New Gallery",
        sections: []
    });

    const navigate = useNavigate();

    const addSection = () => {
        let newSection = {
            id: gallery.sections.length,
            photos: [],
            title: "Change me..."
        };
        setSections([...gallery.sections, newSection]);
        setTimeout(() => scrollableGalleryPreview.current.scrollTop = scrollableGalleryPreview.current.scrollHeight, 100);

    }

    const setSections = (sections) => {
        setGallery({...gallery, sections});
    }

    const openPreview = () => {
        const resultId = uuidv4(); // Generate a unique ID
        navigate(`/gallery/${resultId}`, {state: {gallery}});
    }

    const sectionButton = <>
        <Button variant="light" onClick={addSection}>Add Section...</Button>
        <Button variant="light" onClick={openPreview}>Preview</Button>
    </>

    const updateSections = (sections) => {
        setSections(sections);
    }

    return (
        <div className="container-fluid">
            <Container ref={scrollableGalleryPreview} fluid className={styles.scrollableContainer}>
                <Row>
                    <Col xs={12}>
                        This is Gallery Editor.
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>Hello from editor for {galleryId}</Col>
                    <Col md={8}>
                        <Gallery gallery={gallery} updateSections={updateSections} updateGallery={setGallery} editable={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}></Col>
                    <Col md={8}>
                    </Col>
                </Row>
            </Container>
            <Container fluid className={styles.fixedContainer}>
                <Row className="justify-content-md-end">
                    <Col xs={3}>{sectionButton}</Col>
                </Row>
            </Container>
        </div>
    )

}

export default GalleryEditor;