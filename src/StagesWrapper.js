import React from 'react';
import PropTypes from 'prop-types';
import './styles/StagesWrapper.css';
import leftChevron from './assets/left-chevron.svg';

const StagesWrapper = ({
  prevStage,
  children,
  sameStage,
  setSameStage
}) => {
  const handleChangeStages = () => {
    if (sameStage) {
      setSameStage(false);
    } else {
      prevStage();
    }
  };
  return (
    <div className="content-container">
      <img src={leftChevron} alt="<" onClick={handleChangeStages} />
      {children}
    </div>
  );
};

StagesWrapper.propTypes = {
  prevStage: PropTypes.func.isRequired
};

export default StagesWrapper;
