import React, { useState } from 'react';
import logo from './assets/Logo.jpg';
import './styles/App.css';
import SignUpForm from './SignUpForm';
import Calendar from './Calendar';
import Payment from './Payment';
import Confirmation from './Confirmation';

function App() {
  const [stage, setStage] = useState(0);
  const [signupInfo, setSignupInfo] = useState({});

  const nextStage = () => setStage(curStage => curStage + 1);
  const prevStage = () => setStage(curStage => curStage - 1);

  const renderStages = () => {
    switch (stage) {
      case 3:
        return <Confirmation prevStage={prevStage} signupInfo={signupInfo} />;
      case 2:
        return (
          <Payment
            nextStage={nextStage}
            prevStage={prevStage}
            setSignupInfo={setSignupInfo}
            signupInfo={signupInfo}
          />
        );
      case 1:
        return (
          <Calendar
            nextStage={nextStage}
            prevStage={prevStage}
            setSignupInfo={setSignupInfo}
            signupInfo={signupInfo}
          />
        );
      default:
        return (
          <SignUpForm
            nextStage={nextStage}
            setSignupInfo={setSignupInfo}
            signupInfo={signupInfo}
          />
        );
    }
  };
  return (
    <div className="App">
      <div className="container">
        <img src={logo} alt="Hookked" />
        <h1 className={`app-title ${stage === 3 && 'confirmation-stage'}`}>
          VIP Sign Up
        </h1>

        {renderStages()}
      </div>
    </div>
  );
}

export default App;
