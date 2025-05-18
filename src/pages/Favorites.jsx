import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import moviesData from "../data/movie.json";
import "../styles/favorites.css";

export default function Favorites() {
    const [savedMovies, setSavedMovies] = useState([]);

    useEffect(() => {
        const loadSavedMovies = () => {
            const savedIds = JSON.parse(localStorage.getItem("savedMovies")) || [];
            const savedMoviesData = moviesData.filter((movie) =>
                savedIds.includes(movie.id)
            );
            setSavedMovies(savedMoviesData);
        };

        loadSavedMovies();

        window.addEventListener("storage", loadSavedMovies);
        return () => {
            window.removeEventListener("storage", loadSavedMovies);
        };
    }, []);

    // Функція видалення фільму
    const handleDelete = (movieId) => {
        const savedIds = JSON.parse(localStorage.getItem("savedMovies")) || [];
        const updatedIds = savedIds.filter((id) => id !== movieId);
        localStorage.setItem("savedMovies", JSON.stringify(updatedIds));

        setSavedMovies((prev) => prev.filter((movie) => movie.id !== movieId));
    };

    return (
        <div className="favorites-container">
            <div className="circle-yellow"></div>
            <div className="circle-blue"></div>

            <div className="sidebar-nav">
                <Link to="/favorites" className="nav-link">
                    <span>Мої обрані</span>
                </Link>
            </div>

            <main className="main-content">
                {savedMovies.length === 0 ? (
                    <div className="content-wrapper">
                        <div className="image-container">
                            <img
                                src="/images/watchlist-no-items.png"
                                alt="Порожня колекція фільмів"
                                className="empty-state-image"
                            />
                        </div>

                        <p className="message">Схоже ти ще не маєш жодного фільму. Перейди в</p>
                        <p className="mb-4">
                            <Link to="/catalogfilm" className="catalog-link">
                                каталог фільмів
                            </Link>
                            <span className="message"> та додай фільми в обрані</span>
                        </p>
                    </div>
                ) : (
                    <div
                        className="saved-movies-list"
                        style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
                    >
                        {savedMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} onDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
