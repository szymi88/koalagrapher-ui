import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GalleryPreview from './pages/GalleryPreview';
import GalleryEditor from "./pages/GalleryEditor/GalleryEditor";
import ClientGallery from "./pages/ClientGallery";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/edit/gallery" element={<GalleryEditor/>}/>
                <Route path="/edit/gallery/:galleryId" element={<GalleryEditor/>}/>
                <Route path="/preview/gallery" element={<GalleryPreview/>}/>
                <Route path="/gallery/:galleryId" element={<ClientGallery/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
