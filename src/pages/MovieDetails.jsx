import React from 'react';
import MovieHeroSection from '../components/MoviePage/MovieHeroSection';
import MovieInfoSection from '../components/MoviePage/MovieInfoSection';
import MovieCastSection from '../components/MoviePage/MovieCastSection';

const MovieDetails = () => {
    return (
        <>
            <MovieHeroSection />
            <MovieInfoSection />
            <MovieCastSection/>
        </>
    );
};

export default MovieDetails;
