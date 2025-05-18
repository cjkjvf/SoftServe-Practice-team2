import { Link } from "react-router-dom"
import "../styles/MovieCard.css"

const MovieCard = ({ movie, onDelete }) => {
    
    const handleDeleteClick = (e) => {
        e.stopPropagation()
        onDelete(movie.id)
    }

    return (
        <div className="movie-card">
            <Link to={`/movies/${movie.id}`}>
                <img
                    src={movie.imageURL || "/placeholder.svg"}
                    alt={movie.title}
                    className="movie-card-image"
                />
                <h3 className="movie-card-title">{movie.title}</h3>
            </Link>
            <button
                className="movie-card-delete"
                onClick={handleDeleteClick}
                aria-label="Delete movie"
            >
                ×
            </button>
        </div>
    )
}

export default MovieCard
