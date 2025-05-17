import React, { useEffect, useState } from 'react';
import './Filter.scss';
import BottomSVG from './../assets/bottom.svg';
import dateData from './months_weekdays.json';

const months = dateData.months;
const weekdays = dateData.weekdays;
const weekdaysAbbreviated = dateData.weekdaysAbbreviated;

const Filter = () => {
  const [days, setDays] = useState([]);
  const [additionalDays, setAdditionalDays] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectDay, setSelectDay] = useState(1);

  const getDays = () => {
    let daysArray = [];
    let additionalArray = [];
    let today = new Date();

    for (let i = 0; i < 14; i++) {
      let date = new Date(today);
      date.setDate(today.getDate() + i);

      const day = String(date.getDate()).padStart(2, '0');
      const month = months[date.getMonth()];
      const weekday = weekdays[date.getDay()];
      const weekdayAbbreviated = weekdaysAbbreviated[date.getDay()];
      const formattedDate = {
        id: i + 1,
        day,
        month,
        weekday,
        weekdayAbbreviated,
      };
      if (window.innerWidth > 768 && i > 6) {
        additionalArray.push(formattedDate);
      } else {
        daysArray.push(formattedDate);
      }
    }

    setDays(daysArray);
    setAdditionalDays(additionalArray);
  };

  useEffect(() => {
    getDays();
  }, []);

  const listFilter = [
    {
      name: 'Формати:',
      listOption: [
        { name: 'Всі', isMobile: false },
        {
          name: '2D',
          isMobile: true,
          description: 'Класичний сеанс для консервативних глядачів',
        },
        {
          name: '3D',
          isMobile: true,
          description:
            'Cеанс з залученням технологій об’ємного зображення для прихильників видовищних спец ефектів',
        },
      ],
    },
    {
      name: 'Зали:',
      listOption: [
        { name: 'Всі', isMobile: false },
        { name: 'Звичайний', isMobile: false },
        {
          name: 'LUX',
          isMobile: true,
          description:
            'Сеанс на кріслах-реклайнерах, що забезпечують підвищений комфорт перегляду, для гурманів кіно',
        },
      ],
    },
    {
      name: 'Субтитри:',
      listOption: [
        { name: 'Всі', isMobile: false },
        { name: 'БЕЗ', isMobile: false },
        {
          name: 'SDH',
          isMobile: true,
          description:
            'Субтитри для осіб з порушеннями слуху та тифлокоментарі для осіб з порушеннями зору',
        },
      ],
    },
  ];

  return (
    <div className="filter">
      <h2>Фільтр за датою та параметрами</h2>
      {/* Тут можеш відрендерити дати, список фільтрів тощо */}
      {/* Наприклад, рендер дат: */}
      <div className="days">
        {days.map((d) => (
          <div key={d.id} className="day">
            <div>{d.day} {d.month}</div>
            <div>{d.weekdayAbbreviated}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
