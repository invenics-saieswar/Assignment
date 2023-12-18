import React, { useState } from 'react';
import Homepage from './Home';
import SkillMappingPage from './SkillMapping';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Content page');

  return (
    <div>
      <header>
        <nav>
          <button onClick={() => setCurrentPage('Home')}>Home</button>
          <br />
          <br />
        
          <button onClick={() => setCurrentPage('skill')}>Skill Mapping</button>
          <br />
          <br />

        </nav>
      </header>
      <main>
        {currentPage === 'Home' && <Homepage />}
        <br />
        <br />
        {currentPage === 'skill' && <SkillMappingPage />}
      </main>
    </div>
  );
};

export default App;
