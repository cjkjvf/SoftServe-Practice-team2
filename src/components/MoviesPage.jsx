import { useState, useEffect } from "react"
import moviesData from "../data/movie.json"
import "../styles/MoviesPage.css"

export default function MoviesPage() {
    const [movies, setMovies] = useState(moviesData)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedGenre, setSelectedGenre] = useState("")
    const [sortBy, setSortBy] = useState("")

    useEffect(() => {
        let filtered = moviesData

        if (searchTerm) {
            filtered = filtered.filter(
                (m) =>
                    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    m.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (selectedGenre) {
            filtered = filtered.filter((m) => m.genres.includes(selectedGenre))
        }

        if (sortBy === "title") {
            filtered = filtered.slice().sort((a, b) => a.title.localeCompare(b.title))
        }

        setMovies(filtered)
    }, [searchTerm, selectedGenre, sortBy])

    // Зібрати всі жанри для селекту
    const allGenres = Array.from(new Set(moviesData.flatMap((m) => m.genres)))

    return (
        <div className="movies-container">
            <h1>Фільми</h1>

            <div className="controls">
                <input
                    type="text"
                    placeholder="Пошук..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="">Всі жанри</option>
                    {allGenres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="">Без сортування</option>
                    <option value="title">За назвою</option>
                </select>
            </div>

            <ul className="movies-list">
                {movies.map((m) => (
                    <li key={m.id} className="movie-card">
                        <h2>{m.title}</h2>
                        <p>{m.description}</p>
                        <p><b>Жанри:</b> {m.genres.join(", ")}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
