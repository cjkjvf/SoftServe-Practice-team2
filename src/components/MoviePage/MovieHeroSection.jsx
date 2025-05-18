import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // імпорт useNavigate
import moviesData from "../../data/movie.json";
import "../../styles/MovieHeroSection.css";

const MovieHeroSection = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();  // ініціалізація навігації
    const [movie, setMovie] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            if (!moviesData || !Array.isArray(moviesData)) {
                throw new Error("Невірний формат фільмів");
            }

            const foundMovie = moviesData.find(m => m.id.toString() === movieId);

            if (foundMovie) {
                setMovie(foundMovie);
            } else {
                throw new Error("Фільм не знайдено");
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [movieId]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("savedMovies")) || [];
        setIsSaved(saved.includes(Number(movieId)));
    }, [movieId]);

    const toggleSave = () => {
        const saved = JSON.parse(localStorage.getItem("savedMovies")) || [];
        const id = Number(movieId);

        if (isSaved) {
            const updated = saved.filter(i => i !== id);
            localStorage.setItem("savedMovies", JSON.stringify(updated));
            setIsSaved(false);
        } else {
            const updated = [...saved, id];
            localStorage.setItem("savedMovies", JSON.stringify(updated));
            setIsSaved(true);
        }
    };

    const handleChooseSession = () => {
        navigate('/catalog');  // тут перекидаємо на сторінку /catalog
    };

    if (loading) return <div className="container">Завантаження...</div>;
    if (error) return <div className="container">Помилка: {error}</div>;
    if (!movie) return <div className="container">Фільм не знайдено</div>;

    return (
        <section className="hero-section" style={{ backgroundImage: `url(${movie.image})` }}>
            <div className="overlay">
                <div className="content">
                    <div className="left-container">
                        <h1 className="title">{movie.title}</h1>
                        <p className="description">{movie.brief_description}</p>
                        <button className="hero-button" onClick={handleChooseSession}>
                            Обрати сеанс
                        </button>
                    </div>
                    <div className="right-container">
                        <span>{movie.details.rating} IMDB</span>
                        <span>{movie.details.year}</span>
                        <span>{movie.genres.join(", ")}</span>
                        <span>{movie.details.duration_minutes} хв.</span>
                        <span>{movie.details.age_restriction}</span>
                        <span>{movie.details["display-technologies"].join(", ")}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MovieHeroSection;
