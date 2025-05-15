// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import movies from "../../data/movie.json";
// import "../choiceStyles/MovieInfo.css";

// export default function MovieInfo() {
//   const { movieId } = useParams(); // бере id з URL, напр. movieId=103
//   const [movie, setMovie] = useState(null);
//   const [imageSrc, setImageSrc] = useState("");

//   useEffect(() => {
//     const found = movies.find((m) => m.id === Number(movieId));
//     setMovie(found);

//     if (found && found.image) {
//       // 🔥 це головне: правильно імпортуємо шлях до картинки з src
//       const path = new URL(`/src/assets/${found.image.split("/").pop()}`, import.meta.url).href;
//       setImageSrc(path);
//     }
//   }, [movieId]);

//   if (!movie || !imageSrc) return <div>Завантаження постера...</div>;

//   return (
//     <div className="movie-poster-wrapper">
//       <img
//         className="movie-poster"
//         src={imageSrc}
//         alt={movie.title}
//       />
//     </div>
//   );
// }







