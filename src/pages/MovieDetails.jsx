import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import moviesData from '../date/movie.json'; 
import '../styles/MovieDetails.css';

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            if (!moviesData || !Array.isArray(moviesData)) {
                throw new Error("Дані фільмів не завантажені або мають неправильний формат");
            }

            const foundMovie = moviesData.find(m => m.id.toString() === movieId);

            if (foundMovie) {
                setMovie(foundMovie);
            } else {
                throw new Error(`Фільм з ID ${movieId} не знайдено`);
            }
        } catch (err) {
            console.error("Помилка при завантаженні фільму:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [movieId]);

    useEffect(() => {
        if (movieId) {
            // Отримуємо збережені фільми з localStorage
            const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];

            // Перевіряємо, чи є поточний фільм у збережених
            const isMovieSaved = savedMovies.includes(Number(movieId));
            setIsSaved(isMovieSaved);
        }
    }, [movieId]);

    const toggleSave = () => {
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        const movieIdNum = Number(movieId);

        if (isSaved) {
            const updatedSavedMovies = savedMovies.filter(id => id !== movieIdNum);
            localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
            setIsSaved(false);
        } else {
            // додаємо до списку, якшо збережений
            const updatedSavedMovies = [...savedMovies, movieIdNum];
            localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
            setIsSaved(true);
        }
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
            <div className="container movie-container">
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

                        <div className="genres-container">
                            {movie.genres.map((genre, index) => (
                                <span key={index} className="genre-pill">{genre}</span>
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
                                <span className="detail-value">{movie.details.release_date}</span>
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

export default MovieDetails;