import React, { useEffect, useState } from 'react'
import './Filter.scss'
import BottomSVG from '../../assets/bottom.svg'

// Масив назв місяців та днів тижня українською
const months = [
  'Січня',
  'Лютого',
  'Березня',
  'Квітня',
  'Травня',
  'Червня',
  'Липня',
  'Серпня',
  'Вересня',
  'Жовтня',
  'Листопада',
  'Грудня',
]
const weekdays = [
  'НЕДІЛЯ',
  'ПОНЕДІЛОК',
  'ВІВТОРОК',
  'СЕРЕДА',
  'ЧЕТВЕР',
  'П’ЯТНИЦЯ',
  'СУБОТА',
]

const weekdaysAbbreviated = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД']

const Filter = () => {
  const [days, setDays] = useState([])
  const [additionalDays, setAdditionalDays] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectDay, setSelectDay] = useState(1)

  const getDays = () => {
    let daysArray = []
    let additionalArray = []
    let today = new Date()

    for (let i = 0; i < 14; i++) {
      let date = new Date(today)
      date.setDate(today.getDate() + i)

      const day = String(date.getDate()).padStart(2, '0')
      const month = months[date.getMonth()]
      const weekday = weekdays[date.getDay()]
      const weekdayAbbreviated = weekdaysAbbreviated[date.getDay()]
      // Формуємо формат "17 квітня ЧЕТВЕР"
      const formattedDate = {
        id: i + 1,
        day,
        month,
        weekday,
        weekdayAbbreviated,
      }
      if (window.innerWidth > 768 && i > 6) {
        additionalArray.push(formattedDate)
      } else {
        daysArray.push(formattedDate)
      }
    }
    setDays(daysArray)
    setAdditionalDays(additionalArray)
  }

  useEffect(() => {
    getDays()
  }, [])

  const listFilter = [
    {
      name: 'Формати:',
      listOption: [
        {
          name: 'Всі',
          isMobile: false,
        },
        {
          name: '2D',
          isMobile: true,
          description: 'Класичний сеанс для консервативних глядачів',
        },
        {
          name: '3D',
          description:
            'Cеанс з залученням технологій об’ємного зображення для прихильників видовищних спец ефектів',
          isMobile: true,
        },
      ],
    },
    {
      name: 'Зали:',
      listOption: [
        {
          name: 'Всі',
          isMobile: false,
        },
        {
          name: 'Звичайний',
          isMobile: false,
        },
        {
          name: 'LUX',
          description:
            'LUXСеанс на кріслах-реклайнерах, що забезпечують підвищений комфорт перегляду, для гурманів кіноСеанс на кріслах-реклайнерах, що забезпечують підвищений комфорт перегляду, для гурманів кіно',
          isMobile: true,
        },
      ],
    },
    {
      name: 'Субтитри:',
      listOption: [
        {
          name: 'Всі',
          isMobile: false,
        },
        {
          name: 'БЕЗ',
          isMobile: false,
        },
        {
          name: 'SDH',
          description:
            'Субтитри для осіб з порушеннями слуху та тифлокоментарі для осіб з порушеннями зору',
          isMobile: true,
        },
      ],
    },
  ]

  const [selectFilter, setSelectFilter] = useState([0, 0, 0])

  return (
    <div className="list-date-container">
      <div className="list-date">
        {days.map((day, index) => (
          <div
            key={day.id}
            style={{ cursor: 'pointer' }}
            className={`list-date-item ${day.id == selectDay ? 'select' : ''}`}
            onClick={() => setSelectDay(day.id)}
          >
            <div className="pc up">
              {day.day} {day.month}
            </div>
            <div className="mobile up">{day.weekdayAbbreviated}</div>
            <div className="pc down">{day.weekday}</div>
            <div className="mobile down">{day.day}</div>
          </div>
        ))}
        <div className="list-date-item select-day" id="select-day">
          {selectDay <= 7 ? (
            <div className="text">
              <div className="up">Вибрати</div>
              <div className="down">день</div>
            </div>
          ) : (
            additionalDays.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'left',
                  gap: '5px',
                }}
              >
                <div className="pc up">
                  {additionalDays.find(x => x.id == selectDay).day}{' '}
                  {additionalDays.find(x => x.id == selectDay).month}
                </div>
                <div className="mobile up">
                  {
                    additionalDays.find(x => x.id == selectDay)
                      .weekdayAbbreviated
                  }
                </div>
                <div className="pc down">
                  {additionalDays.find(x => x.id == selectDay).weekday}
                </div>
                <div className="mobile down">
                  {additionalDays.find(x => x.id == selectDay).day}
                </div>
              </div>
            )
          )}
          <img
            onClick={() => setIsOpen(!isOpen)}
            src={BottomSVG}
            alt="Location icon"
          />
          {isOpen && (
            <div className="list-additional">
              {additionalDays.map(x => (
                <div
                  onClick={() => {
                    setIsOpen(false)
                    setSelectDay(x.id)
                  }}
                  key={x.id}
                  className="day"
                >
                  <p>
                    {x.day} {x.month}
                  </p>
                  <span>
                    ({x.weekday[0] + x.weekday.slice(1).toLowerCase()})
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="list-filter">
        {listFilter.map((x, index) => (
          <div className="filter" key={index}>
            <span>{x.name}</span>
            {x.listOption.map((option, indexOption) => (
              <div className="option" key={indexOption}>
                {option.description && (
                  <div className="description">{option.description}</div>
                )}
                <p
                  onClick={() =>
                    setSelectFilter(prevState => {
                      const newSelectFilter = [...prevState] // Створюємо нову копію масиву
                      // Перевіряємо, чи вже вибрано це значення, якщо так, то скидаємо його до 0
                      if (newSelectFilter[index] === indexOption) {
                        newSelectFilter[index] = 0 // Якщо вибрано, скидаємо значення на 0
                      } else {
                        newSelectFilter[index] = indexOption // Оновлюємо значення за індексом
                      }
                      return newSelectFilter // Повертаємо оновлений масив
                    })
                  }
                  className={`option-text ${option.isMobile ? 'filter-mobile' : 'filter-pc'} ${selectFilter[index] == indexOption ? 'select' : ''}`}
                >
                  {option.name}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter
