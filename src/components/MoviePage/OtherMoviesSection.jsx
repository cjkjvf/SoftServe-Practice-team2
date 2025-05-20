import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/OtherMoviesSection.css";

export default function OtherMoviesSection() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies");
        setMovies(response.data.movies);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 4 >= movies.length ? 0 : prev + 4));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 4 < 0 ? Math.max(0, movies.length - 4) : prev - 4));
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  if (loading) return <div className="container">Завантаження...</div>;
  if (error) return <div className="container">Помилка: {error}</div>;

  return (
    <section className="other-movies-section">
      <h2 className="other-movies-title">Інші фільми</h2>
      <div className="other-movies-carousel">
        <button
          className="other-carousel-btn left"
          onClick={handlePrevious}
          aria-label="Previous movies"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
        <div className="other-movies-grid">
          {movies.slice(currentIndex, currentIndex + 4).map((movie) => (
            <div
              className="other-movie-card"
              key={movie._id}
              onClick={() => handleMovieClick(movie._id)}
              style={{ cursor: "pointer" }}
            >
              <img
                className="other-movie-card-image"
                src={movie.imageURL || "/placeholder.svg"}
                alt={movie.title}
              />
              <div className="other-movie-card-title">{movie.title}</div>
              <div className="other-movie-card-info">
                <h3>{movie.title}</h3>
                <div className="other-movie-details">
                  <span>{movie.details.rating}</span>
                  <span>•</span>
                  <span>{movie.details.year}</span>
                  <span>•</span>
                  <span>{movie.genres[0] || "Невідомий жанр"}</span>
                  <span>•</span>
                  <span>{movie.details.duration_minutes} хв.</span>
                </div>
                <div>Від {movie.details.age_restriction || "0+"}</div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="other-carousel-btn right"
          onClick={handleNext}
          aria-label="Next movies"
        >
          <ChevronRight size={24} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}