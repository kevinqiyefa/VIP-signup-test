import React, { useState } from 'react';
import StagesWrapper from './StagesWrapper';
import PropTypes from 'prop-types';

import './styles/Payment.css';
import more from './assets/More-Arrow.svg';
import checked from './assets/checkbox-checked.svg';
import {
  formatCreditCardNumber,
  formatExpirationDate
} from './utils/formatCChelper';

const Payment = ({ prevStage, nextStage, setSignupInfo, signupInfo }) => {
  const [sameStage, setSameStage] = useState(false);
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [CVC, setCVC] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(true);

  const handleViewMore = () => {
    if (!sameStage) {
      setSameStage(true);
    }
  };

  const handleCVCchange = e => {
    //remove all the non-number
    const formattedCVC = e.target.value.replace(/[^(0-9)]/g, '');
    setCVC(formattedCVC);
  };

  const handleChecked = e => {
    if (!cardNum) setCardNum('3333 3333 3333 3333');
    if (!expiry) setExpiry('33/33');
    if (!CVC) setCVC('333');

    setRememberMe(e.target.checked);
    setShowMoreInfo(false);

    setTimeout(() => {
      setSignupInfo({ ...signupInfo, cardNum, expiry, CVC });
      nextStage();
    }, 3000);
  };

  return (
    <StagesWrapper
      prevStage={prevStage}
      sameStage={sameStage}
      setSameStage={setSameStage}
    >
      <div className="payment-container">
        {!sameStage && (
          <div>
            <input
              type="text"
              name="credit-card"
              className="payment-inputFields"
              placeholder="Credit Card"
              value={cardNum}
              onChange={e => setCardNum(formatCreditCardNumber(e.target.value))}
              maxLength="19"
            />
            <input
              type="text"
              name="expiry"
              className="payment-inputFields"
              placeholder="Expiry"
              value={expiry}
              onChange={e => setExpiry(formatExpirationDate(e.target.value))}
              maxLength="5"
            />

            <input
              type="text"
              name="cvc"
              className="payment-inputFields"
              placeholder="CVC"
              value={CVC}
              onChange={handleCVCchange}
              maxLength="3"
            />

            <div className="remember-me">
              <input
                id="remember-me"
                type="checkbox"
                name="remember"
                checked={rememberMe}
                className="remeber-checkbox"
                onChange={handleChecked}
              />
              <label htmlFor="remember-me">
                <img
                  src={checked}
                  alt="&#10003;"
                  aria-hidden="true"
                  focusable="false"
                  className="remember-check"
                />
              </label>
              Remember me
            </div>
          </div>
        )}
        {showMoreInfo && (
          <p className={`header ${sameStage && 'more-mode'}`}>
            You will NOT be charged for your Free Trial. Simply opt out after
            the trial, no commitment:)
          </p>
        )}

        {showMoreInfo && sameStage && (
          <div className="more-info">
            <div className="wrapper">
              asdsasdasa asdsasdasa asdsasdasa asdsasdasa asdsasdasa asdsasdasa
              asdsasdasa asdsasdasa asdsasdasa asdsasdasa asdsasdasa asdsasdasa
              asdsasdasa asdsasdasa asdsasdasa asdsasdasa asdsasdasa asdsasdasa
              asdsasdasa asdsasdasa asdsasdasa asdsasdasa asdsasdasa asdsasdasa
              asdsasdasa asdsasdasa asdsasdasa asdsasdasa asdsasdasa asdsasdasa
              asdsasdasa asdsasdasa asdsasdasa asdsasdasa asdsasdasa asdsasdasa
              asdsasdasa asdsasdasa asdsasdasa asdsasdasa asdsasdasa asdsasdasa
              asdsasdasa asdsasdasa asdsasdasa asdsasdasa asdsasdasa asdsasdasa
            </div>
          </div>
        )}

        {showMoreInfo && !sameStage && (
          <img
            src={more}
            alt="More"
            onClick={handleViewMore}
            className="more-arrow"
          />
        )}
      </div>
    </StagesWrapper>
  );
};

Payment.propTypes = {
  prevStage: PropTypes.func.isRequired,
  nextStage: PropTypes.func.isRequired,
  setSignupInfo: PropTypes.func.isRequired,
  signupInfo: PropTypes.object.isRequired
};

export default Payment;
