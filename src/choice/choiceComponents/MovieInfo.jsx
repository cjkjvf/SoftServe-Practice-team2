import React, { useEffect, useState } from 'react';
import '../choiceStyles/MovieInfo.css';

const MovieInfo = () => {
  const [movie, setMovie] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHall, setSelectedHall] = useState('Зал №1');

  useEffect(() => {
    const saved = localStorage.getItem('selectedMovie');
    if (saved) {
      const parsed = JSON.parse(saved);
      setMovie(parsed);

      const defaultLocation = parsed.Listlocation?.[0]?.location || '';
      const defaultDate = parsed.Listdate?.[0]?.date || '';
      const defaultHall = parsed.hall?.[0]?.hall || 'Зал №1';

      setSelectedLocation(defaultLocation);
      setSelectedDate(defaultDate);
      setSelectedHall(defaultHall);

      const updatedMovie = {
        ...parsed,
        location: defaultLocation,
        date: defaultDate,
        hall: defaultHall,
      };
      localStorage.setItem('selectedMovie', JSON.stringify(updatedMovie));
    }

    // 🧹 Очищення даних при виході зі сторінки
    return () => {
      const saved = localStorage.getItem('selectedMovie');
      if (saved) {
        const parsed = JSON.parse(saved);
        delete parsed.location;
        delete parsed.date;
        delete parsed.hall;
        localStorage.setItem('selectedMovie', JSON.stringify(parsed));
      }
    };
  }, []);
    const handleLocationChange = (value) => {
      setSelectedLocation(value);
      const updated = { ...movie, location: value };
      setMovie(updated);
      localStorage.setItem('selectedMovie', JSON.stringify(updated));
    };

  const handleDateChange = (value) => {
    setSelectedDate(value);
    const updated = { ...movie, date: value };
    setMovie(updated);
    localStorage.setItem('selectedMovie', JSON.stringify(updated));
  };

  if (!movie) return <p>Завантаження інформації...</p>;

  const option = movie.listOption?.find(opt => opt.time === movie.selectedTime);

  return (
    <div className="movieInfo-container">
      <img src={movie.imageURL} alt={movie.name} className="movieInfo-poster" />
      <div className="movieInfo-details">
        <h2 className="movieInfo-title">{movie.name}</h2>

        <div className="movieInfo-tags">
          <span className="movieInfo-tag blue">{movie.selectedFormat}</span>
          {movie.genres?.map((genre, i) => (
            <span key={i} className="movieInfo-tag light">{genre}</span>
          ))}
        </div>

        <div className="movieInfo-row">

          <div className="movieInfo-card">
            <img src="/images/location2.svg" alt="Локація" />
            <div className="movieInfo-card-label">Локація</div>
            <select
              className="movieInfo-select"
              value={selectedLocation}
              onChange={(e) => handleLocationChange(e.target.value)}
            >
              {movie.Listlocation?.map((loc, i) => (
                <option key={i} value={loc.location}>{loc.location}</option>
              ))}
            </select>
          </div>


          <div className="movieInfo-card">
            <img src="/images/calendar.svg" alt="Дата" />
            <div className="movieInfo-card-label">Дата</div>
            <select
              className="movieInfo-select"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
            >
              {movie.Listdate?.map((d, i) => (
                <option key={i} value={d.date}>{d.date}</option>
              ))}
            </select>
          </div>


          <div className="movieInfo-card">
            <img src="/images/clock.svg" alt="Час" />
            <div className="movieInfo-card-label">Час</div>
            <div className="movieInfo-card-value">
              {movie.selectedTime} – {option?.endTime || '??'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;


