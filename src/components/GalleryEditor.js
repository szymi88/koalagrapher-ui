import {useParams} from "react-router-dom";

import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Gallery from "./Gallery";


const GalleryEditor = () => {
    const {galleryId} = useParams();
    const [sections, setSections] = useState([]);

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
                    <Gallery sections={sections} editable={true}/>
                </Col>
            </Row>
        </Container>
    )

}

export default GalleryEditor;