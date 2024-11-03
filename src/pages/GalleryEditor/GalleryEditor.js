import {useNavigate, useParams} from "react-router-dom";

import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Form, Row,} from 'react-bootstrap';
import Gallery from "../../components/Gallery/Gallery";
import styles from './GalleryEditor.module.css';
import {saveGallery, updateGallery} from "../../api/gallery";
import {arrayMove} from "@dnd-kit/sortable";
import {getGallery} from "../../hooks/useGallery";
import LoadingView from "../../components/LoadingView";

const GalleryEditor = () => {
    const navigate = useNavigate();
    const {galleryId} = useParams();
    const scrollableGalleryPreview = useRef(null);

    const [gallery, setGallery] = useState(null);
    useEffect(() => {
        if (!galleryId) {
            setGallery({
                title: "New Gallery",
                sections: []
            })
        } else {
            getGallery(galleryId).then((fetchedGallery) => {
                setGallery(fetchedGallery)
            })
        }
    }, [galleryId]);

    useEffect(() => {
        if (gallery &&
            !gallery.coverPhoto
            && gallery.sections.length > 0
            && gallery.sections[0].photos
            && gallery.sections[0].photos.length > 0
        ) {
            setCoverPhoto(gallery.sections[0].photos[0]);
        }
    }, [gallery]);

    if (!gallery) {
        return <LoadingView/>
    }


    const setCoverPhoto = (photo) => {
        setGallery({...gallery, coverPhoto: photo});
    }

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

    const handleGalleryChange = (changeEvent) => {
        if (changeEvent.type === "photos-swap") {
            let sections = gallery.sections.map(section => {
                if (section.id === changeEvent.sectionId) {
                    let currentPhotos = section.photos;
                    section.photos = arrayMove(currentPhotos, changeEvent.oldIndex, changeEvent.newIndex);
                    return section;
                }
                return section;
            })
            setGallery({...gallery, sections});
        } else if (changeEvent.type === "photo-uploaded") {
            let sections = gallery.sections.map(section => {
                if (section.id === changeEvent.sectionId) {
                    let photo = section.photos.find(photo => photo.id === changeEvent.photoId);
                    photo.uploaded = true;
                    return section;
                }
                return section;
            })
            setGallery({...gallery, sections});
        } else if (changeEvent.type === "photo-added") {
            let sections = gallery.sections.map(section => {
                if (section.id === changeEvent.sectionId) {
                    section.photos.push(changeEvent.photo);
                    return section;
                }
                return section;
            })
            setGallery({...gallery, sections});
        } else if (changeEvent.type === "section-title-change") {
            gallery.sections
                .find(section => section.id === changeEvent.sectionId)
                .title = changeEvent.title;
            setGallery(gallery);
        }
    }

    const openPreview = () => {
        navigate("/preview/gallery", {state: {gallery}});
    }

    let onClickSaveGallery = () => {
        if (gallery.id) {
            updateGallery(gallery, () => console.log(`Gallery ${galleryId} saved`));
        } else {
            saveGallery(gallery, saveResult => setGallery(saveResult));
        }
    };

    const sectionButton = <>
        <Button variant={"dark"} onClick={addSection}>Add Section...</Button>
        <Button variant={"dark"} onClick={openPreview}>Preview</Button>
        <Button variant={"dark"} onClick={onClickSaveGallery}>Save Gallery</Button>
    </>
    return (
        <Container fluid className="d-flex flex-column vh-100">
            <Row className="bg-light ext-black p-3">
                <Col>
                    <h1 className="text-center">GALLERY EDITOR</h1>
                </Col>
            </Row>

            <Row className={`flex-grow-1 d-flex ${styles.mainSection}`}>
                <Col xs={"4"} className="bg-light p-3 d-flex flex-column">
                    <GallerySettings gallery={gallery}/>
                </Col>

                <Col className={`bg-light text-black p-3 overflow-auto ${styles.scrollableContainer}`}>
                    <div>
                        <Gallery gallery={gallery} onGalleryChange={handleGalleryChange} updateSections={updateSections} updateGallery={setGallery} editable={true}/>
                    </div>
                </Col>
            </Row>

            <Row className="bg-light text-white p-3">
                <Col className={"d-flex justify-content-end"}>
                    {sectionButton}
                </Col>
            </Row>
        </Container>
    );

}

const GallerySettings = ({gallery}) => {
    return <div>
        <Form>
            <Form.Group className="mb-4">
                <Form.Label>Title</Form.Label>
                <Form.Control placeholder="New Gallery Title"/>
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Description</Form.Label>
                <Form.Control placeholder=""/>
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Date</Form.Label>
                <Form.Control typplaceholder=""/>
            </Form.Group>
        </Form>
    </div>
}

export default GalleryEditor;