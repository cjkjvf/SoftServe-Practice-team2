import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "../styles/favorites.css";

export default function Favorites() {
  const [savedMovies, setSavedMovies] = useState([]);
  const navigate = useNavigate();

  const loadSavedMovies = async () => {
    const savedMovieIds = JSON.parse(localStorage.getItem("savedMovies")) || [];
    console.log("savedMovieIds", savedMovieIds);
    try {
      const promises = savedMovieIds.map((id) =>
        
        axios.get(`http://localhost:5000/api/movies/${id}`)
      );

      const responses = await Promise.all(promises);
      const movies = responses.map((res) => res.data);

      setSavedMovies(movies);
    } catch (err) {
      console.error("Помилка при завантаженні обраних фільмів:", err);
    }
  };

  useEffect(() => {
    loadSavedMovies();

    window.addEventListener("storage", loadSavedMovies);
    return () => {
      window.removeEventListener("storage", loadSavedMovies);
    };
  }, []);

  const handleDelete = (movieId) => {
    const savedMovieIds = JSON.parse(localStorage.getItem("savedMovies")) || [];
    const updatedIds = savedMovieIds.filter((id) => id !== movieId);
    localStorage.setItem("savedMovies", JSON.stringify(updatedIds));
    setSavedMovies((prev) => prev.filter((movie) => movie._id !== movieId));
    window.dispatchEvent(new Event("storage"));
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
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
              <div
                key={movie._id}
                onClick={() => handleMovieClick(movie._id)}
                style={{ cursor: "pointer" }}
              >
                <MovieCard
                  movie={movie}
                  onDelete={() => handleDelete(movie._id)}
                  customClass="favorite-movie-card"
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
