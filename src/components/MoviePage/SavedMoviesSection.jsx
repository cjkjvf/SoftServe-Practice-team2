import React, { useEffect, useState } from 'react';
import moviesData from '../../date/movie.json';
import MovieCard from './components/MovieCard';

const SavedMoviesPage = () => {
    const [savedMovies, setSavedMovies] = useState([]);

    useEffect(() => {
        const savedIds = JSON.parse(localStorage.getItem('savedMovies')) || [];
        // Переконуємося, що savedIds — масив чисел
        const savedIdsNum = savedIds.map(id => Number(id));

        const savedMoviesData = moviesData.filter(movie => savedIdsNum.includes(movie.id));
        setSavedMovies(savedMoviesData);
    }, []);

    if (savedMovies.length === 0) {
        return <div className="container">У вас немає збережених фільмів.</div>;
    }

    return (
        <div className="saved-movies-page container">
            <h2>Обрані фільми</h2>
            <div className="saved-movies-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {savedMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default SavedMoviesPage;
