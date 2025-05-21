import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Autoplay, Navigation } from 'swiper/modules';
import axios from 'axios';
import './PromoSlider.css';

export default function PromoSlider() {
  const [movies, setMovies] = useState([]);
  const [hoveredSlide, setHoveredSlide] = useState(null);
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const swiperRef = useRef(null);
  const timeoutRef = useRef(null);
  const hoverCounts = useRef({});
  const navigate = useNavigate();

  // Отримуємо дані з API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies');
        const fetchedMovies = response.data.movies.map(movie => ({
          id: movie._id,
          title: movie.title,
          image: movie.image || '/placeholder.svg',
          brief_description: movie.brief_description,
          genres: movie.genres || [],
          details: {
            year: movie.details?.year || 0,
            rating: movie.details?.rating || 'N/A',
            duration_minutes: movie.details?.duration_minutes || 0,
            age_restriction: movie.details?.age_restriction || 'N/A',
            'display-technologies': movie.details?.display_technologies || [],
          },
          trailer: movie.trailer || '',
        }));
        setMovies(fetchedMovies);
      } catch (err) {
        console.error('Помилка завантаження фільмів:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const getEmbedURL = (url) => {
    try {
      const ytID = url.includes('youtu.be')
        ? url.split('/').pop()
        : new URLSearchParams(new URL(url).search).get('v');
      return `https://www.youtube.com/embed/${ytID}?autoplay=1&controls=1`;
    } catch {
      return null;
    }
  };

  const handleMouseEnter = (index) => {
    swiperRef.current?.autoplay?.stop();
    setHoveredSlide(index);

    hoverCounts.current[index] = (hoverCounts.current[index] || 0) + 1;

    const slideElements = document.querySelectorAll('.slide');
    slideElements.forEach((el) => {
      el.classList.remove('hovered', 'delayed-darken');
    });

    const currentSlide = slideElements[index];
    currentSlide.classList.add('hovered');

    if (hoverCounts.current[index] > 1) {
      currentSlide.classList.add('delayed-darken');
    }

    const delay = hoverCounts.current[index] > 1 ? 5000 : 2000;

    timeoutRef.current = setTimeout(() => {
      setIsTrailerVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setHoveredSlide(null);
    setIsTrailerVisible(false);
    swiperRef.current?.autoplay?.start();

    const slideElements = document.querySelectorAll('.slide');
    slideElements.forEach((el) => {
      el.classList.remove('hovered', 'delayed-darken');
    });
  };

  const handleBannerClick = (movieId, index) => {
    if (hoveredSlide === index && isTrailerVisible) return;
    navigate(`/movies/${movieId}`);
  };

  if (loading) return <div className="container">Завантаження...</div>;
  if (error) return <div className="container">Помилка: {error}</div>;

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop
      speed={1500}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      className="promo-slider"
    >
      {movies.map((movie, index) => (
        <SwiperSlide key={movie.id}>
          <div
            className="slide"
            style={{ backgroundImage: `url(${movie.image})` }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleBannerClick(movie.id, index)}
          >
            <div className="slide-overlay">
              <div className="slide-content">
                <div className="left-container">
                  <h1>{movie.title}</h1>
                  <p>{movie.brief_description}</p>
                </div>
                <div className="right-container">
                  <span>{movie.details.year}</span>
                  <span>{movie.details.rating}</span>
                  <span>{movie.genres.join(' ⮕ ')}</span>
                  <span>{movie.details.duration_minutes} хв</span>
                  <span>{movie.details.age_restriction}</span>
                  <span>{movie.details['display-technologies'].join(' ⮕ ')}</span>
                </div>
              </div>
              <button className="action-button">Обрати сеанс</button>
            </div>

            {hoveredSlide === index && isTrailerVisible && movie.trailer && (
              <div className="trailer-portal">
                <iframe
                  src={getEmbedURL(movie.trailer)}
                  className="portal-iframe"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  frameBorder="0"
                />
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}