import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../styles/OtherMoviesSection.css";
import moviesData from "../../data/movie.json";

export default function OtherMoviesSection() {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setMovies(moviesData);
    }, []);

    const handleDelete = (id) => {
        setMovies((prev) => prev.filter((movie) => movie.id !== id));
        setCurrentIndex((prev) => Math.min(prev, movies.length - 5));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 4 >= movies.length ? 0 : prev + 4));
    };

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 4 < 0 ? Math.max(0, movies.length - 4) : prev - 4));
    };

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
                        <div className="other-movie-card" key={movie.id}>
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
                                    <span>{movie.genres[0]}</span>
                                    <span>•</span>
                                    <span>{movie.details.duration_minutes} хв.</span>
                                </div>
                                <div>Від {movie.details.age_restriction}</div>
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
