import { useState, useEffect } from "react";
import "../styles/SearchPopup.css";
import moviesData from "../data/movie.json";
import MovieCard from "./MovieCard";

export default function SearchPopup({ isOpen, onClose }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [foundMovies, setFoundMovies] = useState([]);

    useEffect(() => {
        if (!isOpen) {
            setSearchTerm("");
            setFoundMovies([]);
        }
    }, [isOpen]);

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            setFoundMovies([]);
            return;
        }

        const results = moviesData.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFoundMovies(results);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <input
                    type="text"
                    placeholder="Введіть назву фільму..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch}>Пошук</button>

                {foundMovies.length > 0 ? (
                    <div className="found-movies-scroll-wrapper">
                        <div className="found-movies-container">
                            {foundMovies.map(movie => (
                                <MovieCard key={movie.id} movie={movie} onDelete={() => { }} customClass="search-movie-card" />
                            ))}
                        </div>
                    </div>
                ) : (
                    searchTerm && <p>Фільми не знайдено.</p>
                )}
            </div>
        </div>
    );
}
