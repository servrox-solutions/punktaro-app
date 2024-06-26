import React from 'react';
import './CenterContainer.css';

export interface CenterContainerProps {
  children: React.ReactNode;
}

const CenterContainer = ({children}: CenterContainerProps) => {
  return (
    <div className="center-container">
      {children}
    </div>
  );
};

export default CenterContainer;
