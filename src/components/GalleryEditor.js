import {useParams} from "react-router-dom";

import React, {useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import Gallery from "./Gallery";
import {getTestGallery} from "../data/gallery";


const GalleryEditor = () => {
    const {galleryId} = useParams();
    const [sections, setSections] = useState([]);
  //  const [sections, setSections] = useState([getTestGallery()[0]]);

    const addSection = () => {
        let newSection = {
            id: sections.length,
            photos: [],
            name: "Your Section Name"
        };
        setSections(prevSections => [...prevSections, newSection]);
    };

    const sectionButton = <button onClick={addSection}>Add Section...</button>;

    const handleSetPhotos = (sectionId, photos) => {
        setSections(prevSections =>
             prevSections.map(section => {
                 if (section.id === sectionId) {
                     return {
                         ...section,
                         photos: photos,
                     };
                 }
                 return section;
             })
        );
    };

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    This is Gallery Editor.
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <button>Add Section</button>
                </Col>
            </Row>
            <Row>
                <Col md={4}>Hello from editor for {galleryId}</Col>
                <Col md={8}>
                    <Gallery sections={sections} setPhotos={handleSetPhotos} editable={true}/>
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