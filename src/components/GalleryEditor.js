import {useNavigate, useParams} from "react-router-dom";

import React, {useState} from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import Gallery from "./Gallery";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library


const GalleryEditor = () => {
    const {galleryId} = useParams();
    const [gallery, setGallery] = useState({
        title: "New Gallery",
        sections: []
    });

    const navigate = useNavigate();

    //  const [sections, setSections] = useState([getTestGallery()[0]]);

    const addSection = () => {
        let newSection = {
            id: gallery.sections.length,
            photos: [],
            title: "Change me..."
        };
        setSections([...gallery.sections, newSection]);
    }

    const setSections = (sections) => {
        setGallery({...gallery, sections} );
    }

    const openPreview = () => {
        const resultId = uuidv4(); // Generate a unique ID
        navigate(`/gallery/${resultId}`, {state: {gallery}} );
    }

    const sectionButton = <>
        <Button variant="light" onClick={addSection}>Add Section...</Button>
        <Button variant="light" onClick={openPreview}>Preview</Button>
    </>;

    const updateSections = (sections) => {
        setSections(sections);
    }

    return (
        <Container>
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
                    {sectionButton}
                </Col>
            </Row>
        </Container>
    )

}

export default GalleryEditor;