import React, { useEffect } from 'react';
import './main.css'; // Import your CSS file

const StethoscopeAnimation = () => {
  useEffect(() => {
    const stethoscopePath = document.getElementById('stethoscope-path');

    // Get the total length of the path
    const length = stethoscopePath.getTotalLength();

    // Set the initial styles for the path
    stethoscopePath.style.strokeDasharray = length;
    stethoscopePath.style.strokeDashoffset = length;

    // Trigger the animation
    stethoscopePath.style.transition = 'stroke-dashoffset 2s ease-in-out';
    stethoscopePath.style.strokeDashoffset = '0';
  }, []);

  return (
    <div className="stethoscope-container">
      <svg className="stethoscope" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
        {/* The stethoscope path */}
        <path id="stethoscope-path" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M24 12l2 8-2 8 8 8 2 8-4 4"></path>
      </svg>
    </div>
  );
};

export default StethoscopeAnimation;
