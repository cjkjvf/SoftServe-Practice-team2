import { createContext, useContext, useEffect, useState, useMemo } from "react";
import axios from 'axios';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export default function BookingProvider({ children }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [seatPrices, setSeatPrices] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const savedMovie = localStorage.getItem("selectedMovie");
    if (savedMovie) {
      setSelectedMovie(JSON.parse(savedMovie));
    }
  }, []);

  useEffect(() => {
    const savedSeats = localStorage.getItem("selectedSeats");
    if (savedSeats) {
      setSelectedSeats(JSON.parse(savedSeats));
    }
  }, []);

  useEffect(() => {
    const fetchOccupiedSeats = async () => {
      if (!selectedMovie?.screeningId || !selectedMovie?.selectedTime) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/screenings/${selectedMovie.screeningId}/seats`, {
          params: { time: selectedMovie.selectedTime }
        });
        console.log('Дані сеансу:', response.data);
        setOccupiedSeats(response.data.occupiedSeats || []);
        setSeatPrices(response.data.seatPrices || []);
      } catch (err) {
        console.error('Помилка завантаження даних сеансу:', err);
        setOccupiedSeats([]);
        setSeatPrices([]);
      }
    };

    fetchOccupiedSeats();
  }, [selectedMovie?.screeningId, selectedMovie?.selectedTime]);

  useEffect(() => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  const isSelected = (seat) =>
    selectedSeats.some((s) => s.row === seat.row && s.number === seat.number);

  const isOccupied = (seat) =>
    occupiedSeats.some((s) => s.row === seat.row && s.number === seat.number);

  const toggleSeat = (seat) => {
    if (isOccupied(seat)) return;

    const canAddSeat = selectedSeats.length < 10;

    if (!isSelected(seat) && !canAddSeat) return;

    if (isSelected(seat)) {
      setSelectedSeats((prev) =>
        prev.filter((s) => !(s.row === seat.row && s.number === seat.number))
      );
    } else {
      const price = seatPrices.find(p => p.type === (seat.type === 2 ? 'SUPER LUX' : 'GOOD'))?.price || 0;
      setSelectedSeats((prev) => [...prev, { ...seat, price }]);
    }
  };

  const totalTickets = selectedSeats.length;

  const totalPrice = selectedSeats.reduce(
    (sum, seat) => sum + (seat.price || 0),
    0
  );

  const clearSeats = useMemo(() => () => {
    setSelectedSeats([]);
    localStorage.removeItem("selectedSeats");
  }, []);

  const confirmBooking = async () => {
    if (!selectedMovie || selectedSeats.length === 0) {
      console.log('Помилка: відсутні selectedMovie або selectedSeats');
      return false;
    }

    try {
      console.log('Відправка бронювання:', {
        screeningId: selectedMovie.screeningId,
        time: selectedMovie.selectedTime,
        seats: selectedSeats
      });
      await axios.post('http://localhost:5000/api/bookings', {
        screeningId: selectedMovie.screeningId,
        time: selectedMovie.selectedTime,
        seats: selectedSeats
      });
      console.log('Бронювання успішне');
      clearSeats();
      return true;
    } catch (err) {
      console.error('Помилка бронювання:', err);
      return false;
    }
  };

  return (
    <BookingContext.Provider
      value={{
        selectedSeats,
        toggleSeat,
        isSelected,
        isOccupied,
        totalTickets,
        totalPrice,
        clearSeats,
        confirmBooking,
        canAddSeat: selectedSeats.length < 10,
        seatPrices
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}