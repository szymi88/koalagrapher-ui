// src/App.js
import React, { useState } from 'react';
import SectionManager from './components/SectionManager';
//import Gallery from './components/Gallery';

function App() {
  const [sections, setSections] = useState([]);

  return (
      <div className="App">
        <SectionManager sections={sections} setSections={setSections} />
        {/*<Gallery sections={sections} />*/}
      </div>
  );
}

export default App;
