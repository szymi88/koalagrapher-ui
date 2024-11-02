import {Button, ListGroup, Stack} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchGalleries} from "../api/gallery";

const GalleryList = () => {

    const navigate = useNavigate();

    const [galleryList, setGalleryList] = useState([]);


    useEffect(() => {
        fetchGalleries().then((galleries) =>
            setGalleryList(galleries)
        )
    }, []);

    console.log(galleryList);

    return <ListGroup gap={3}>
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
}


export default GalleryList;