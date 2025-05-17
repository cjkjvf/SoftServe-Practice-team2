import { Search, User, Menu, Home } from "lucide-react"
import { Link } from "react-router-dom"
import moviesData from '../date/movie.json';
import "./styles/Catalogfilms.css";


const genres = [
  'Жахи', 'Романтика', 'Комедія', 'Драма', 'Бойовик',
  'Пригодницький', 'Фантастика', 'Фентезі', 'Трилер',
  'Мелодрама', 'Детектив', 'Кримінал', 'Документальний',
  'Історичний', 'Біографія', 'Мюзикл', 'Сімейний',
  'Спортивний', 'Військовий', 'Анімація', 'Трагедія'
];

const Catalog = () => {
  const [selectedGenre, setSelectedGenre] = useState('Жахи');
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 24;

  const allMovies = Array(48).fill({
    title: 'Аватар 2',
    image: 'https://image.tmdb.org/t/p/w500/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg'
  });

  const indexOfLast = currentPage * moviesPerPage;
  const indexOfFirst = indexOfLast - moviesPerPage;
  const currentMovies = allMovies.slice(indexOfFirst, indexOfLast);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  return (
    <div className="catalog-container">
      <div className="genre-buttons">
        {genres.map((genre, index) => (
          <button
            key={index}
            className={`genre-button ${selectedGenre === genre ? 'active' : ''}`}
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <h2 className="movies-title">Ваші фільми</h2>

      <div className="movies-grid">
        {currentMovies.map((movie, index) => (
          <div key={index} className="movie-card">
            <img src={movie.image} alt={movie.title} className="movie-poster" />
            <div className="movie-title">{movie.title}</div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        <span>{`0${currentPage}`}</span>
        <button
          onClick={() =>
            setCurrentPage((p) =>
              p < Math.ceil(allMovies.length / moviesPerPage) ? p + 1 : p
            )
          }
          disabled={currentPage >= Math.ceil(allMovies.length / moviesPerPage)}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Catalog;
