import React, { useState } from 'react';
import SegmentPopup from './segmentPopup';

const MainPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSaveSegmentClick = () => {
    setShowPopup(true);
  };

  return (
    <div className="main-page">
      <button onClick={handleSaveSegmentClick}>Save segment</button>
      {showPopup && <SegmentPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default MainPage;
