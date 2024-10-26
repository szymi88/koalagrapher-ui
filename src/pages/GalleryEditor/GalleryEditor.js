import {useNavigate, useParams} from "react-router-dom";

import React, {useRef, useState} from 'react';
import {Button, Col, Container, Row,} from 'react-bootstrap';
import Gallery from "../../components/Gallery/Gallery";
import styles from './GalleryEditor.module.css';
import {saveGallery} from "../../data/gallery-editor";

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

    const updateSections = (sections) => {
        setSections(sections);
    }

    const openPreview = () => {
        navigate("/preview/gallery", {state: {gallery}});
    }

    const sectionButton = <>
        <Button variant="light" onClick={addSection}>Add Section...</Button>
        <Button variant="light" onClick={openPreview}>Preview</Button>
        <Button variant="light" onClick={() => saveGallery(gallery)}>Save Gallery</Button>
    </>


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
                    <Col xs={5}>{sectionButton}</Col>
                </Row>
            </Container>
        </div>
    )
}

export default GalleryEditor;