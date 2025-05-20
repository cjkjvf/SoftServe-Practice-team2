import React, { useState, useEffect } from 'react';
import './ListFilms.scss';
import './Filter.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BottomSVG = "/images/bottom.svg";
const months = [
  'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
  'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'
];
const weekdays = [
  'НЕДІЛЯ', 'ПОНЕДІЛОК', 'ВІВТОРОК', 'СЕРЕДА', 'ЧЕТВЕР', 'П’ЯТНИЦЯ', 'СУБОТА'
];
const weekdaysAbbreviated = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const listFilter = [
  {
    name: "Формати:",
    listOption: [
      { name: "Всі", isMobile: false },
      { name: "2D", isMobile: true, description: "Класичний сеанс для консервативних глядачів" },
      { name: "3D", description: "Cеанс з залученням технологій об’ємного зображення для прихильників видовищних спец ефектів", isMobile: true },
      { name: "4DX", description: "Сеанс із динамічними ефектами руху та середовища", isMobile: true }
    ]
  },
  {
    name: "Зали:",
    listOption: [
      { name: "Всі", isMobile: false },
      { name: "Звичайний", isMobile: false },
      { name: "LUX", description: "Сеанс на кріслах-реклайнерах, що забезпечують підвищений комфорт перегляду, для гурманів кіно", isMobile: true }
    ]
  },
  {
    name: "Субтитри:",
    listOption: [
      { name: "Всі", isMobile: false },
      { name: "БЕЗ", isMobile: false },
      { name: "SDH", description: "Субтитри для осіб з порушеннями слуху та тифлокоментарі для осіб з порушеннями зору", isMobile: true }
    ]
  }
];

const ListFilms = () => {
  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectFilter, setSelectFilter] = useState([0, 0, 0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Отримуємо всі сеанси та фільми
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const screeningsResponse = await axios.get('http://localhost:5000/api/screenings');
        const screenings = screeningsResponse.data.screenings;
        console.log('Screenings:', screenings);

        // Витягуємо унікальні дати
        const uniqueDates = [...new Set(screenings.map(s => s.date.split('T')[0]))].sort();
        const formattedDates = uniqueDates.map((dateStr, index) => {
          const date = new Date(dateStr);
          return {
            id: index + 1,
            date: dateStr,
            day: String(date.getDate()).padStart(2, '0'),
            month: months[date.getMonth()],
            weekday: weekdays[date.getDay()],
            weekdayAbbreviated: weekdaysAbbreviated[date.getDay()]
          };
        });
        setAvailableDates(formattedDates);
        setSelectedDate(formattedDates[0]?.date || null);

        // Отримуємо фільми
        const movieIds = [...new Set(screenings.map(s => s.movie._id || s.movie))];
        console.log('Movie IDs:', movieIds);
        if (!movieIds.length) throw new Error('Немає ID фільмів');

        const moviesResponse = await axios.get('http://localhost:5000/api/movies', {
          params: { ids: movieIds.join(',') },
        });
        const movies = moviesResponse.data.movies;
        console.log('Movies:', movies);

        const moviesMap = movies.reduce((acc, movie) => {
          acc[movie._id] = movie;
          return acc;
        }, {});

        // Об’єднуємо дані
        const combinedData = screenings
          .map(screening => {
            const movieId = screening.movie._id || screening.movie;
            const movie = moviesMap[movieId];
            if (!movie) {
              console.warn(`Фільм із ID ${movieId} не знайдено`);
              return null;
            }

            const listOption = screening.times.map(time => ({
              time: time.time,
              option: time.available_formats.join(', '),
              endTime: calculateEndTime(time.time, movie.duration || 120),
              formats: time.available_formats,
            }));

            // Перетворюємо seatPrices у масив
            let seatPrices = movie.seatPrices || [];
            if (!Array.isArray(seatPrices)) {
              seatPrices = [
                { type: "GOOD", price: seatPrices.standard || 10 },
                { type: "SUPER LUX", price: seatPrices.vip || 15 }
              ];
            }

            return {
              movieId: movie._id,
              name: movie.title,
              img: movie.imageURL || 'https://via.placeholder.com/150',
              genres: movie.genres || [],
              seatPrices,
              listOption,
              hall: screening.hall || 'Unknown Hall',
              Listlocation: screening.cinema || 'Unknown Cinema',
              Listdate: new Date(screening.date).toLocaleDateString(),
              date: screening.date.split('T')[0],
              screeningId: screening._id
            };
          })
          .filter(item => item !== null);

        console.log('Combined Data:', combinedData);
        setFilms(combinedData);
      } catch (err) {
        console.error('Помилка завантаження даних:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Фільтрація
  useEffect(() => {
    if (!selectedDate || !films.length) return;

    const [formatIndex, hallIndex, subtitleIndex] = selectFilter;

    const formatMap = { 0: 'Всі', 1: '2D', 2: '3D', 3: '4DX' };
    const hallMap = { 0: 'Всі', 1: 'Звичайний', 2: 'LUX' };
    const subtitleMap = { 0: 'Всі', 1: 'БЕЗ', 2: 'SDH' };

    const selectedFormat = formatMap[formatIndex];
    const selectedHall = hallMap[hallIndex];
    const selectedSubtitle = subtitleMap[subtitleIndex];

    const filtered = films
      .filter(film => film.date === selectedDate)
      .map(film => {
        const filteredOptions = film.listOption.filter(option => {
          const formatMatch = selectedFormat === 'Всі' || option.formats.includes(selectedFormat);
          const subtitleMatch = selectedSubtitle === 'Всі' ||
            (selectedSubtitle === 'SDH' && option.formats.includes('SDH')) ||
            (selectedSubtitle === 'БЕЗ' && !option.formats.includes('SDH'));
          return formatMatch && subtitleMatch;
        });

        return filteredOptions.length > 0 ? { ...film, listOption: filteredOptions } : null;
      })
      .filter(film => film !== null && film.listOption.length > 0);

    console.log('Filtered Films:', filtered);
    setFilteredFilms(filtered);
    setCurrentPage(1);
  }, [selectedDate, selectFilter, films]);

  // Обчислення кінцевого часу
  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const start = new Date();
    start.setHours(hours, minutes);
    const end = new Date(start.getTime() + duration * 60000);
    return `${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`;
  };

  // Пагінація
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFilms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFilms.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Обробка кліку по сеансу
  const handleTimeClick = (film, option) => {
    const dataToStore = {
      movieId: film.movieId,
      imageURL: film.img,
      name: film.name,
      seatPrices: film.seatPrices, // Вже масив
      genres: film.genres,
      selectedTime: option.time,
      selectedFormat: option.option,
      endTime: option.endTime,
      listOption: film.listOption,
      Listlocation: film.Listlocation,
      Listdate: film.Listdate,
      hall: film.hall,
      screeningId: film.screeningId
    };
    localStorage.setItem('selectedMovie', JSON.stringify(dataToStore));
    navigate('/seatplan');
  };

  // Обробка кліку по фільму
  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  if (loading) return <div className="container">Завантаження...</div>;
  if (error) return <div className="container">Помилка: {error}</div>;
  if (availableDates.length === 0) return <div className="container">Дати сеансів не знайдено</div>;

  return (
    <div className="list-films-container">
      <div className="list-date-container">
        <div className="list-date">
          {availableDates.slice(0, 7).map((day) => (
            <div
              key={day.id}
              style={{ cursor: 'pointer' }}
              className={`list-date-item ${day.date === selectedDate ? 'select' : ''}`}
              onClick={() => setSelectedDate(day.date)}
            >
              <div className="pc up">
                {day.day} {day.month}
              </div>
              <div className="mobile up">{day.weekdayAbbreviated}</div>
              <div className="pc down">{day.weekday}</div>
              <div className="mobile down">{day.day}</div>
            </div>
          ))}
          <div className="select-date-button">
            <button
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              Вибрати дату
              <img src={BottomSVG} alt="Date icon" />
            </button>
            {isDateDropdownOpen && (
              <div className="list-additional">
                {availableDates.map(d => (
                  <div
                    onClick={() => {
                      setIsDateDropdownOpen(false);
                      setSelectedDate(d.date);
                    }}
                    key={d.id}
                    className="day"
                  >
                    <p>
                      {d.day} {d.month}
                    </p>
                    <span>
                      ({d.weekday[0] + d.weekday.slice(1).toLowerCase()})
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
                        const newSelectFilter = [...prevState];
                        newSelectFilter[index] = prevState[index] === indexOption ? 0 : indexOption;
                        return newSelectFilter;
                      })
                    }
                    className={`option-text ${
                      option.isMobile ? 'filter-mobile' : 'filter-pc'
                    } ${selectFilter[index] === indexOption ? 'select' : ''}`}
                  >
                    {option.name}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="list-films">
        {currentItems.length === 0 ? (
          <div className="no-results">Сеансів за вибраними фільтрами не знайдено</div>
        ) : (
          currentItems.map((film, index) => (
            <div className="film-card" key={index}>
              <img
                src={film.img}
                alt={film.name}
                className="film-img"
                onClick={() => handleMovieClick(film.movieId)}
                style={{ cursor: 'pointer' }}
              />
              <div className="text">
                <h3
                  onClick={() => handleMovieClick(film.movieId)}
                  style={{ cursor: 'pointer' }}
                >
                  {film.name}
                </h3>
                <div className="options">
                  {film.listOption.map((option, idx) => (
                    <div
                      key={idx}
                      className="option-item"
                      onClick={() => handleTimeClick(film, option)}
                      style={{ cursor: 'pointer' }}
                    >
                      <p>{option.time}</p> <span>({option.option})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {filteredFilms.length > 0 && (
        <div className="pagination">
          {currentPage > 1 ? (
            <button className="select" onClick={() => handlePageChange(currentPage - 1)}>
              <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.2001 0.999804C6.55315 1.6467 3.47425 4.7257 1.50632 6.69359C1.11579 7.08411 1.11669 7.71638 1.50721 8.10691L7.2001 13.7998" stroke="white" />
              </svg>
              {currentPage - 1}
            </button>
          ) : (
            <button className="no-select">
              <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.2001 0.999804C6.55315 1.6467 3.47425 4.7257 1.50632 6.69359C1.11579 7.08411 1.11669 7.71638 1.50721 8.10691L7.2001 13.7998" stroke="white" />
              </svg>
              1
            </button>
          )}
          <span className="underline">__________</span>
          {currentPage < totalPages ? (
            <button onClick={() => handlePageChange(currentPage + 1)}>
              {currentPage + 1}
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.799904 13.5002C1.44685 12.8533 4.52575 9.7743 6.49368 7.80641C6.88421 7.41589 6.88331 6.78362 6.49279 6.39309L0.799904 0.700195" stroke="white" />
              </svg>
            </button>
          ) : (
            <button className="no-select">
              {totalPages}
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.799904 13.5002C1.44685 12.8533 4.52575 9.7743 6.49368 7.80641C6.88421 7.41589 6.88331 6.78362 6.49279 6.39309L0.799904 0.700195" stroke="white" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ListFilms;