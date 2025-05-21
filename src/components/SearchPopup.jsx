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

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setFoundMovies([]);
      setError(null);
      setSelectedYear("");
      setSelectedAge("");
      setSelectedRating("");
    }
  }, [isOpen]);

  const handleSearch = async () => {
    const query = searchTerm.trim().toLowerCase();

    if (!query && !selectedYear && !selectedAge && !selectedRating) {
      setFoundMovies([]);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:5000/api/movies");
      const allMovies = response.data.movies || [];

      const filteredMovies = allMovies.filter((movie) => {
        const title = movie.title?.toLowerCase() || "";
        const year = String(movie.details?.year || "");
        const ratingRaw = movie.details?.rating || "";
        const rating = parseFloat(ratingRaw);
        const ageRestriction = (movie.details?.age_restriction || "").replace(/\s+/g, "");
        const genres = movie.genres || []; // жанри (масив)

        // Пошук за назвою
        const matchTitle = query && title.includes(query);
        // Пошук за роком
        const matchYear = query && year.startsWith(query);
        // Пошук за рейтингом (як число)
        const matchRating =
          query && !isNaN(query) && !isNaN(rating) && rating >= parseFloat(query);
        // Пошук за жанром (перевіряємо чи query міститься у будь-якому жанрі)
        const matchGenre = query && genres.some(g => g.toLowerCase().includes(query));

        // Базова відповідність — якщо query порожній, або є співпадіння по одному з полів
        const baseMatch = !query || matchTitle || matchYear || matchRating || matchGenre;

        const yearFilter = selectedYear ? year === selectedYear : true;
        const ageFilter = selectedAge
          ? ageRestriction === selectedAge.replace(/\s+/g, "")
          : true;
        const ratingFilter = selectedRating
          ? !isNaN(rating) && rating >= parseFloat(selectedRating)
          : true;

        return baseMatch && yearFilter && ageFilter && ratingFilter;
      });
      

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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Пошук за назвою, жанром, роком або рейтингом..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Пошук..." : "Пошук"}
        </button>

        {/* Фільтри */}
        <div className="filters">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Рік</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>

          <select
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
          >
            <option value="">Вік</option>
            <option value="0+">0+</option>
            <option value="6+">6+</option>
            <option value="12+">12+</option>
            <option value="16+">16+</option>
            <option value="18+">18+</option>
          </select>

          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
          >
            <option value="">Рейтинг</option>
            <option value="9">9+</option>
            <option value="8">8+</option>
            <option value="7">7+</option>
            <option value="6">6+</option>
          </select>
        </div>

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
                  <MovieCard movie={movie} customClass="search-movie-card" />
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
