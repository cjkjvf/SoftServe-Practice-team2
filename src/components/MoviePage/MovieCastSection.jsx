import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import "../../styles/MovieCastSection.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow next" onClick={onClick}>
      ❯
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow prev" onClick={onClick}>
      ❮
    </div>
  );
};

const MovieCastSection = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${movieId}`);
        const movie = response.data;
        const movieCast = movie.cast || [];
        if (!Array.isArray(movieCast) || movieCast.length === 0) {
          throw new Error("Акторів для цього фільму не знайдено");
        }
        setCast(movieCast);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) return <div className="container">Завантаження...</div>;
  if (error) return <div className="container">Помилка: {error}</div>;
  if (cast.length === 0) return <div className="container">Акторів не знайдено</div>;

  return (
    <section className="cast-section">
      <h2 className="cast-title">Знімальна група та акторський склад</h2>
      <Slider {...settings}>
        {cast.map((actor, index) => (
          <div key={index} className="cast-card">
            <img src={actor.image || '/placeholder.svg'} alt={actor.name} className="cast-image" />
            <h3 className="cast-name">{actor.name}</h3>
            <p className="cast-role">{actor.role}</p>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default MovieCastSection;