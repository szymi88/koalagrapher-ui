// src/App.js
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SectionManager from './components/SectionManager';
import GalleryPreview from './components/GalleryPreview';
import GalleryEditor from "./components/GalleryEditor";


function App() {
    const [sections, setSections] = useState([]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SectionManager sections={sections} setSections={setSections}/>}>
                </Route>
                <Route path="/edit/gallery/:resultId" element={<GalleryEditor/>}/>
                <Route path="/gallery/:galleryId" element={<GalleryPreview sections={sections}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
