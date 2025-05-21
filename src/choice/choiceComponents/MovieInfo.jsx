import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../choiceStyles/MovieInfo.css';

const MovieInfo = () => {
  const [movie, setMovie] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHall, setSelectedHall] = useState('Зал №1');
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('selectedMovie');
    if (saved) {
      const parsed = JSON.parse(saved);
      setMovie(parsed);

      const defaultLocation = parsed.Listlocation || '';
      const defaultDate = parsed.Listdate || '';
      const defaultHall = parsed.hall || 'Зал №1';

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

  const goToDetails = () => {
    navigate(`/movies/${movie.movieId}`);
  };

  if (!movie) return <p>Завантаження інформації...</p>;

  const option = movie.listOption?.find(opt => opt.time === movie.selectedTime);

  return (
    <div className="movieInfo-container">
      <img
        src={movie.imageURL}
        alt={movie.name}
        className="movieInfo-poster"
        style={{ cursor: 'pointer' }}
        onClick={goToDetails}
      />
      <div className="movieInfo-details">
        <h2
          className="movieInfo-title"
          style={{ cursor: 'pointer' }}
          onClick={goToDetails}
        >
          {movie.name}
        </h2>

        <div className="movieInfo-tags">
          <span className="movieInfo-tag blue">{movie.selectedFormat}</span>
          {movie.genres?.map((genre, i) => (
            <span
              key={i}
              className="movieInfo-tag light"
              onClick={() => navigate(`/catalogfilm?genre=${encodeURIComponent(genre)}`)}
              style={{ cursor: "pointer" }}
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="movieInfo-row">
          <div className="movieInfo-card">
            <img src="/images/location2.svg" alt="Локація" />
            <div className="movieInfo-card-label">Локація</div>
            <div className="movieInfo-card-value">{selectedLocation}</div>
          </div>

          <div className="movieInfo-card">
            <img src="/images/calendar.svg" alt="Дата" />
            <div className="movieInfo-card-label">Дата</div>
            <div className="movieInfo-card-value">{selectedDate}</div>
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