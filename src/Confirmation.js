import React from 'react';
import PropTypes from 'prop-types';
import StagesWrapper from './StagesWrapper';
import checked from './assets/checked.svg';

import './styles/Confirmation.css';

const Confirmation = ({ prevStage, signupInfo }) => {
  //log the signup info data when user reaches the confirmation page.

  console.log(JSON.stringify(signupInfo, null, 2));

  return (
    <StagesWrapper prevStage={prevStage}>
      <div className="confirmation">
        <h1>Completed</h1>
        <img src={checked} alt="&#x2714;" className="confirmation-check-mark" />
        <button className="goto-acc-btn">Go to Account</button>
      </div>
    </StagesWrapper>
  );
};

Confirmation.propTypes = {
  prevStage: PropTypes.func.isRequired,
  signupInfo: PropTypes.object.isRequired
};

export default Confirmation;
