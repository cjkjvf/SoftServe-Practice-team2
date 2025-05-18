import React, { useEffect, useState } from 'react';
import './Filter.scss';
import dateData from './months_weekdays.json'; // українські назви!

const months = dateData.months;
const weekdaysAbbreviated = dateData.weekdaysAbbreviated;

const Filter = () => {
  const [days, setDays] = useState([]);
  const [selectDay, setSelectDay] = useState(1);

  const getDays = () => {
    const daysArray = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      daysArray.push({
        id: i + 1,
        day: String(date.getDate()).padStart(2, '0'),
        month: months[date.getMonth()],
        weekdayAbbreviated: weekdaysAbbreviated[date.getDay()]
      });
    }

    setDays(daysArray);
  };

  useEffect(() => {
    getDays();
  }, []);

  return (
    <div className="list-date-container">
      <div className="list-date">
        {days.map((d) => (
          <button
            key={d.id}
            className={`list-date-item ${selectDay === d.id ? 'select' : ''}`}
            onClick={() => setSelectDay(d.id)}
          >
            <p className="up">{d.day} {d.month}</p>
            <p className="down">{d.weekdayAbbreviated}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
