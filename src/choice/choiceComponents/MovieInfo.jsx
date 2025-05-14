import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import movies from "./data/movies.json";
import locationIcon from "/src/assets/location.svg";
import "../choiceStyles/MovieInfo.css";

export default function MovieInfo() {
  const [movie, setMovie] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = Number(params.get("movieId"));
    const selected = movies.find((m) => m.id === id);
    setMovie(selected);
  }, [location]);

  if (!movie) return <div>Loading movie info...</div>;

  return (
    <div className="movie-info">
      <div className="movie-info__top">
        <img
          className="movie-info__poster"
          src={`/${movie.image.replace("src/", "")}`}
          alt={movie.title}
        />
        <div className="movie-info__details">
          <h1>{movie.title}</h1>
          <div className="movie-info__tags">
            <span className="tag format">{movie["display-technologies"]}</span>
            <span className="tag genre">{movie.genre.split(",")[0]}</span>
          </div>
          <div className="movie-info__meta">
            <div className="meta-box">
              <img src={locationIcon} alt="Локація" />
              <span>Львів, ТРЦ "Victoria Gardens"</span>
            </div>
            <div className="meta-box">Зал №1</div>
            <div className="meta-box">29.04.2025</div>
            <div className="meta-box">11:20 – 13:01</div>
          </div>
        </div>
      </div>
    </div>
  );
}
