import React from 'react';
import MovieHeroSection from '../components/MoviePage/MovieHeroSection';
import MovieInfoSection from '../components/MoviePage/MovieInfoSection';
import MovieCastSection from '../components/MoviePage/MovieCastSection';
import OtherMoviesSection from "../components/MoviePage/OtherMoviesSection";

const MovieDetails = () => {
    return (
        <>
            <MovieHeroSection />
            <MovieInfoSection />
            <MovieCastSection />
            <OtherMoviesSection />
        </>
    );
};

export default MovieDetails;
