import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SearchPopup.css";
import MovieCard from "./MovieCard";

export default function SearchPopup({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setFoundMovies([]);
      setError(null);
    }
  }, [isOpen]);

  const handleSearch = async () => {
  if (!searchTerm.trim()) {
    setFoundMovies([]);
    setError(null);
    return;
  }

  try {
    setLoading(true);
    setError(null);
    const response = await axios.get("http://localhost:5000/api/movies");

    const allMovies = response.data.movies || [];
    const filteredMovies = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    setFoundMovies(filteredMovies);
  } catch (err) {
    console.error("Помилка пошуку фільмів:", err);
    setError("Не вдалося виконати пошук. Спробуйте ще раз.");
  } finally {
    setLoading(false);
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
    onClose(); // Закриваємо попап після кліку
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Введіть назву фільму..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Пошук..." : "Пошук"}
        </button>

        {error && <p className="error-message">{error}</p>}

        {foundMovies.length > 0 ? (
          <div className="found-movies-scroll-wrapper">
            <div className="found-movies-container">
              {foundMovies.map((movie) => (
                <div
                  key={movie._id}
                  onClick={() => handleMovieClick(movie._id)}
                  style={{ cursor: "pointer" }}
                >
                  <MovieCard
                    movie={movie}
                    customClass="search-movie-card"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          searchTerm &&
          !loading && <p>Фільми не знайдено.</p>
        )}
      </div>
    </div>
  );
}