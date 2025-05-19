import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../../styles/MovieCastSection.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import castData from "../../data/cast.json";

// стрілка — вперед
const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-arrow next" onClick={onClick}>
            ❯
        </div>
    );
};

//стрілка — назад
const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-arrow prev" onClick={onClick}>
            ❮
        </div>
    );
};
  
const MovieCastSection = () => {
    const [cast, setCast] = useState([]);

    useEffect(() => {
        setCast(castData);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
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

    return (
        <section className="cast-section">
            <h2 className="cast-title">Знімальна група та акторський склад</h2>
            <Slider {...settings}>
                {cast.map((actor, index) => (
                    <div key={index} className="cast-card">
                        <img src={actor.image} alt={actor.name} className="cast-image" />
                        <h3 className="cast-name">{actor.name}</h3>
                        <p className="cast-role">{actor.role}</p>
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default MovieCastSection;
