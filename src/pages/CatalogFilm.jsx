import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "../styles/CatalogFilm.css";
import data from '../data/movie.json'; 

const genres = [
  "ВСІ", "Екшн", "Жахи", "Романтика", "Комедія", "Драма", "Бойовик",
  "Пригоди", "Фантастика", "Фентезі", "Трилер",
  "Мелодрама", "Детектив", "Кримінал", "Документальний",
  "Історичний", "Біографія", "Мюзикл", "Сімейний",
  "Спортивний", "Військовий", "Анімація", "Трагедія"
];

const CatalogFilm = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("ВСІ");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const moviesPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!Array.isArray(data)) {
          throw new Error("Невірний формат даних фільмів");
        }
        setMoviesData(data);
      } catch (err) {
        console.error("Помилка при завантаженні даних:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const genreFromUrl = searchParams.get("genre");

    if (genreFromUrl && genres.includes(genreFromUrl)) {
      setSelectedGenre(genreFromUrl);
    } else {
      setSelectedGenre("ВСІ");
    }

    setCurrentPage(1);
  }, [searchParams]);  

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);

    // 🧭 Оновлюємо URL при натисканні
    if (genre === "ВСІ") {
      navigate("/catalogfilm");
    } else {
      navigate(`/catalogfilm?genre=${encodeURIComponent(genre)}`);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredMovies =
    selectedGenre === "ВСІ"
      ? moviesData
      : moviesData.filter((movie) => movie.genres.includes(selectedGenre));

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const indexOfLast = currentPage * moviesPerPage;
  const indexOfFirst = indexOfLast - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirst, indexOfLast);

  if (loading) return <div className="container">Завантаження фільмів...</div>;
  if (error) return <div className="container">Помилка: {error}</div>;
  if (!moviesData.length) return <div className="container">Фільми не знайдено</div>;

  return (
    <div className="catalog-container">
      <div className="catalog-genre-buttons">
        {genres.map((genre, index) => (
          <button
            key={index}
            className={`catalog-genre-button ${selectedGenre === genre ? "active" : ""}`}
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <h2 className="catalog-movie-title">Ваші фільми</h2>

      <div className="catalog-movies-grid">
        {currentMovies.map((movie, index) => (
          <Link key={index} to={`/movies/${movie.id}`} className="catalog-movie-card">
            <img
              src={movie.imageURL || "./thunderbolts.jpeg"}
              alt={movie.title}
              className="catalog-movie-poster"
            />
            <div className="catalog-movie-title-film">{movie.title}</div>
          </Link>
        ))}
      </div>

      <div className="catalog-pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        <span className="catalog-current-page">{`Сторінка ${currentPage} з ${totalPages}`}</span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default CatalogFilm;

