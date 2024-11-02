import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GalleryPreview from './pages/GalleryPreview';
import GalleryEditor from "./pages/GalleryEditor/GalleryEditor";
import ClientGallery from "./pages/ClientGallery";
import GalleryList from "./pages/GalleryList";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/galleries" element={<GalleryList/>}/>
                <Route path="/gallery/new" element={<GalleryEditor/>}/>
                <Route path="/gallery/:galleryId/edit" element={<GalleryEditor/>}/>
                <Route path="/preview/gallery" element={<GalleryPreview/>}/>
                <Route path="/gallery/:galleryId" element={<ClientGallery/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
