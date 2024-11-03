import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {fetchGalleries} from "../api/gallery";

const GalleryList = () => {

    const navigate = useNavigate();

    const [galleryList, setGalleryList] = useState([]);


    useEffect(() => {
        fetchGalleries().then((galleries) =>
            setGalleryList(galleries)
        )
    }, []);

    return <Container>
        <Row className="text-black p-3">
            <Col>
                <h1 className="text-center">YOUR GALLERIES</h1>
            </Col>
        </Row>
        <Row>
            <ListGroup gap={3}>
                {galleryList.map(gallery =>
                    <ListGroup.Item action variant="light" onClick={() => navigate(`/gallery/${gallery.id}/edit`)}>
                        <div key={gallery.id} className="p-2">
                            {gallery.title}
                        </div>
                    </ListGroup.Item>)}
                <ListGroup.Item variant="light">
                    <div className="p-2"><Button variant={"dark"} onClick={() => navigate("/gallery/new")}>New Gallery</Button></div>
                </ListGroup.Item>
            </ListGroup>
        </Row>
    </Container>
}


export default GalleryList;