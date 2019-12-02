import React, { useState, useEffect } from 'react';
import './styles/SignUpForm.css';
import PropTypes from 'prop-types';

const SignUpForm = ({ nextStage, setSignupInfo, signupInfo }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('male');
  const [email, setEmail] = useState('');
  const [pEmail, setpEmail] = useState(''); //paddedEmail

  const handleSubmit = () => {
    const isSubmiting = !!name && !!address && !!pEmail;
    if (isSubmiting) {
      setSignupInfo({ ...signupInfo, name, address, gender, email });
      nextStage();
    }
  };

  useEffect(() => {
    const paddedEmail = () => {
      const splitEmail = email.split('@');
      const emailName = splitEmail[0];
      const emailDomain = splitEmail[1];
      const paddedEmailName = emailName
        .slice(-2)
        .padStart(emailName.length, '.');

      setpEmail(paddedEmailName + '@' + emailDomain);
    };
    if (email.split('@').length > 1) {
      paddedEmail();
    } else {
      setpEmail(email);
    }
  }, [email]);

  return (
    <div className="sign-up-form">
      <input
        type="text"
        name="name"
        className="inputFields"
        placeholder="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <div className="gender-drop-down">
        <select value={gender} onChange={e => setGender(e.target.value)}>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <div
          className={`circle ${
            gender === 'male' ? 'circle-blue' : 'circle-pink'
          }`}
        ></div>
      </div>

      <div className="address">
        <input
          type="text"
          name="address"
          className="inputFields"
          placeholder="address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <div className="car-body"></div>
        <div className="car-head"></div>
        <div className="car-rear-wheel"></div>
        <div className="car-front-wheel"></div>
      </div>

      <input
        type="email"
        name="email"
        className="inputFields email"
        placeholder="email"
        value={pEmail}
        onChange={e => setEmail(e.target.value)}
      />

      <span className="sign-up-submit-btn" onClick={handleSubmit}>
        Pickup a delivery date
      </span>
    </div>
  );
};

SignUpForm.propTypes = {
  nextStage: PropTypes.func.isRequired,
  setSignupInfo: PropTypes.func.isRequired,
  signupInfo: PropTypes.object.isRequired
};

export default SignUpForm;
