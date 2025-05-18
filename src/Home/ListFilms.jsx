import React, { useState } from 'react'
import './ListFilms.scss'
import arrayFilm from './ListFilms.json'
import { useNavigate } from 'react-router-dom'

const ListFilms = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const navigate = useNavigate()

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = arrayFilm.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(arrayFilm.length / itemsPerPage)

  const handlePageChange = page => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleTimeClick = (film, option) => {
    const dataToStore = {
      movieId: film.movieId,
      imageURL: film.imageURL,
      name: film.name,
      seatPrices: film.seatPrices,
      genres: film.genres,
      selectedTime: option.time,
      selectedFormat: option.option,
      endTime: option.endTime,
      listOption: film.listOption,
      Listlocation: film.Listlocation,
      Listdate: film.Listdate,
      hall: film.hall,
    }
    localStorage.setItem('selectedMovie', JSON.stringify(dataToStore))
    navigate('/seatplan')
  }

  return (
    <div className="list-films-container">
      <div className="list-films">
        {currentItems.map((film, index) => (
          <div className="film-card" key={index}>
            <img src={film.imageURL} alt={film.name} className="film-img" />
            <div className="text">
              <h3>{film.name}</h3>
              <div className="options">
                {film.listOption.map((option, idx) => (
                  <div
                    key={idx}
                    className="option-item"
                    onClick={() => handleTimeClick(film, option)}
                    style={{ cursor: 'pointer' }}
                  >
                    <p>{option.time}</p> <span>({option.option})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {currentPage > 1 ? (
          <button
            className="select"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <svg
              width="8"
              height="15"
              viewBox="0 0 8 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.2001 0.999804C6.55315 1.6467 3.47425 4.7257 1.50632 6.69359C1.11579 7.08411 1.11669 7.71638 1.50721 8.10691L7.2001 13.7998"
                stroke="white"
              />
            </svg>
            {currentPage - 1}
          </button>
        ) : (
          <button className="no-select">
            <svg
              width="8"
              height="15"
              viewBox="0 0 8 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.2001 0.999804C6.55315 1.6467 3.47425 4.7257 1.50632 6.69359C1.11579 7.08411 1.11669 7.71638 1.50721 8.10691L7.2001 13.7998"
                stroke="white"
              />
            </svg>
            1
          </button>
        )}
        <span className="underline">__________</span>
        {currentPage <= totalPages ? (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            {currentPage + 1}
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.799904 13.5002C1.44685 12.8533 4.52575 9.7743 6.49368 7.80641C6.88421 7.41589 6.88331 6.78362 6.49279 6.39309L0.799904 0.700195"
                stroke="white"
              />
            </svg>
          </button>
        ) : (
          <button className="no-select">
            {totalPages}
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.799904 13.5002C1.44685 12.8533 4.52575 9.7743 6.49368 7.80641C6.88421 7.41589 6.88331 6.78362 6.49279 6.39309L0.799904 0.700195"
                stroke="white"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default ListFilms
