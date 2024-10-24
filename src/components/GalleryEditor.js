import {useNavigate, useParams} from "react-router-dom";

import React, {useState} from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import Gallery from "./Gallery";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library


const GalleryEditor = () => {
    const {galleryId} = useParams();
    const [sections, setSections] = useState([]);
    const navigate = useNavigate();

    //  const [sections, setSections] = useState([getTestGallery()[0]]);

    const addSection = () => {
        let newSection = {
            id: sections.length,
            photos: [],
            name: "Your Section Name"
        };
        setSections(prevSections => [...prevSections, newSection]);
    };

    const openPreview = () => {
        const resultId = uuidv4(); // Generate a unique ID
        navigate(`/gallery/${resultId}`, {state: {sections}} );
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
                    <Gallery sections={sections} updateSections={updateSections} editable={true}/>
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