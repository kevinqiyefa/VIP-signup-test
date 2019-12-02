import React, { useState } from 'react';

import PropTypes from 'prop-types';
import StagesWrapper from './StagesWrapper';
import './styles/Calendar.css';
import checked from './assets/checked.svg';
import { monthData } from './utils/monthData';

const Calendar = ({ prevStage, nextStage, setSignupInfo, signupInfo }) => {
  const [isConfirmed, setisConfirmed] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);

  const isSelected = selectedDay > 0;

  const handleSelect = e => {
    const sDayString = selectedDay + '';
    if (!isConfirmed) {
      if (selectedDay > 0 && e.target.id !== sDayString) {
        //clear the selected date if the dates are not the same
        let sDay = document.getElementById(selectedDay);
        sDay.classList.remove('selected');

        //then update the select date
        setSelectedDay(+e.target.id);
      } else if (e.target.id === sDayString) {
        setisConfirmed(true);
        setSignupInfo({
          ...signupInfo,
          deliveryDate: Object.keys(monthData)[0] + '-' + selectedDay
        });
        setTimeout(() => nextStage(), 2000);
      } else {
        setSelectedDay(+e.target.id);
      }
    }
  };

  const generateDates = () => {
    const month = Object.keys(monthData)[0];
    const dates = [];
    let week = [];
    monthData[month].forEach((d, idx) => {
      if ((idx + 1) % 7 !== 0) {
        week.push(
          <p
            className={`date ${d.avaliable && 'avaliable'} ${
              selectedDay === d.day ? 'selected' : ''
            }`}
            id={d.day}
            onClick={d.avaliable ? handleSelect : undefined}
            key={month + d.day}
          >
            {d.day}
          </p>
        );
      } else {
        week.push(
          <p
            className={`date ${d.avaliable && 'avaliable'} ${selectedDay ===
              d.day && 'selected'}`}
            onClick={d.avaliable ? handleSelect : undefined}
            key={month + d.day}
            id={d.day}
          >
            {d.day}
          </p>
        );
        dates.push([...week]);
        week = [];
      }
    });
    dates.push([...week]);

    return renderMonth(dates);
  };

  const renderMonth = dates => {
    return dates.map((week, idx) => (
      <div className="weeks" key={'week' + idx}>
        {week}
      </div>
    ));
  };

  return (
    <StagesWrapper prevStage={prevStage}>
      <div>
        <span
          className={`dilivery-btn ${isConfirmed &&
            'confirmed-btn'} ${isSelected && 'selected-btn'}`}
        >
          {isConfirmed ? 'Delivery date Confirmed' : `Pickup a delivery date`}
        </span>

        <div className={`calendar ${isConfirmed && 'confirmed-calendar'} `}>
          <h2 className="month">{Object.keys(monthData)[0]}</h2>
          <div className="dates">{generateDates()}</div>
        </div>
        {isConfirmed && (
          <img src={checked} alt="&#x2714;" className="check-mark" />
        )}
      </div>
    </StagesWrapper>
  );
};

Calendar.propTypes = {
  prevStage: PropTypes.func.isRequired,
  nextStage: PropTypes.func.isRequired,
  setSignupInfo: PropTypes.func.isRequired,
  signupInfo: PropTypes.object.isRequired
};

export default Calendar;
