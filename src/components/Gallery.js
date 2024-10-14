import React from 'react';
import {useParams} from 'react-router-dom';

const Gallery = ({sections}) => {
    const {resultId} = useParams();

    return (
        <div>
            <h2>Result Page: {resultId}</h2>
            <h3>Sections:</h3>

            {sections.map((section) => (
                <div key={section.id} className="section">
                    {section.name}
                    {section.images.map((image, index) => (
                        <div key={index} className="image-container">
                            <img src={image} alt={"image_"+index}/>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Gallery;