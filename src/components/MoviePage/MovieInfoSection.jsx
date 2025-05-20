import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import axios from 'axios';
import '../../styles/MovieInfoSection.css';

const MovieInfoSection = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFormat, setSelectedFormat] = useState('');

    const months = [
        'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
        'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'
    ];

    const formatReleaseDate = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return 'Невідома дата';
            }
            const day = date.getDate();
            const month = months[date.getMonth()];
            return `${day} ${month}`;
        } catch {
            return 'Невідома дата';
        }
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/movies/${movieId}`);
                const foundMovie = response.data;
                if (!foundMovie) {
                    throw new Error(`Фільм з ID ${movieId} не знайдено`);
                }
                setMovie(foundMovie);
            } catch (err) {
                console.error("Помилка при завантаженні фільму:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [movieId]);

    useEffect(() => {
        if (movieId) {
            const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
            const isMovieSaved = savedMovies.includes(movieId);
            setIsSaved(isMovieSaved);

            const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie')) || {};
            setSelectedFormat(selectedMovie.selectedFormat || '');
        }
    }, [movieId]);

    const toggleSave = () => {
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];

        let updatedSavedMovies;
        if (isSaved) {
            updatedSavedMovies = savedMovies.filter(id => id !== movieId);
            setIsSaved(false);
            console.log(`Видалено з обраного фільм з Id: ${movieId}`);
        } else {
            updatedSavedMovies = [...savedMovies, movieId];
            setIsSaved(true);
            console.log(`Додано до обраного фільм з Id: ${movieId}`);
        }

        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
        window.dispatchEvent(new Event('storage'));
    };

    if (loading) {
        return <div className="container">Завантаження даних...</div>;
    }

    if (error) {
        return <div className="container">Помилка: {error}</div>;
    }

    if (!movie) {
        return <div className="container">Фільм не знайдено</div>;
    }

    return (
        <div className="main-content section">
            <div className="movie-container">
                <div className="movie-content">
                    <div className="movie-poster">
                        <img
                            src={movie.imageURL || "/placeholder.svg"}
                            alt={movie.title}
                            className="poster-image"
                        />
                    </div>
                    <div className="movie-info">
                        <h1 className="movie-title">{movie.title}</h1>
                        <p className="movie-description">{movie.description}</p>
                        <div className="movieInfo-tags">
                            {selectedFormat && (
                                <span className="movieInfo-tag blue">{selectedFormat}</span>
                            )}
                            {movie.genres?.map((genre, i) => (
                                <span
                                    key={i}
                                    className="movieInfo-tag light"
                                    onClick={() => navigate(`/catalogfilm?genre=${encodeURIComponent(genre)}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                        <div className="movie-details">
                            <div className="detail-item">
                                <span className="detail-label">Мова показу:</span>
                                <span className="detail-value">{movie.details.language}</span>
                            </div>
                            <div className="separator">|</div>
                            <div className="detail-item">
                                <span className="detail-label">Прем'єра:</span>
                                <span className="detail-value">{formatReleaseDate(movie.details.release_date)}</span>
                            </div>
                            <div className="separator">|</div>
                            <div className="detail-item">
                                <span className="detail-label">Країна:</span>
                                <span className="detail-value">{movie.details.country}</span>
                            </div>
                            <div className="separator">|</div>
                            <div className="detail-item">
                                <span className="detail-label">Рейтинг:</span>
                                <span className="detail-value">{movie.details.rating}</span>
                            </div>
                        </div>
                        <div className="movie-details-second-row">
                            <div className="detail-item">
                                <span className="detail-label">Рік випуску:</span>
                                <span className="detail-value">{movie.details.year}</span>
                            </div>
                            <div className="separator">|</div>
                            <div className="detail-item">
                                <span className="detail-label">Тривалість:</span>
                                <span className="detail-value">{movie.details.duration_minutes} хв.</span>
                            </div>
                        </div>
                    </div>
                    <button
                        className={`save-button ${isSaved ? 'saved' : ''}`}
                        onClick={toggleSave}
                        aria-label={isSaved ? "Видалити з збережених" : "Зберегти фільм"}
                    >
                        <Bookmark
                            className="bookmark-icon"
                            fill={isSaved ? 'var(--color-primary)' : 'none'}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieInfoSection;