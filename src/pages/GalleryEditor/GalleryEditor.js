import {useNavigate, useParams} from "react-router-dom";

import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Row,} from 'react-bootstrap';
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

    if (!gallery) {
        return <LoadingView/>
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
                        <Gallery gallery={gallery} onGalleryChange={handleGalleryChange} updateSections={updateSections} updateGallery={setGallery} editable={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}></Col>
                    <Col md={8}>
                    </Col>
                </Row>
            </Container>
            <Container fluid className={styles.fixedContainer}>
                <Row>
                    <Col xs={{span: 12}}>
                        <div className={"d-flex justify-content-end"}>
                            {sectionButton}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default GalleryEditor;