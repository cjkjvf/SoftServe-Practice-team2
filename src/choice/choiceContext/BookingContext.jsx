import { createContext, useContext, useEffect, useState } from "react";

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export default function BookingProvider({ children }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // ✅ Відновлення з localStorage
  useEffect(() => {
    const savedSeats = localStorage.getItem("selectedSeats");
    if (savedSeats) {
      setSelectedSeats(JSON.parse(savedSeats));
    }
  }, []);

  // ✅ Збереження у localStorage
  useEffect(() => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  const isSelected = (seat) =>
    selectedSeats.some((s) => s.row === seat.row && s.number === seat.number);

  const toggleSeat = (seat) => {
    const canAddSeat = selectedSeats.length < 10;

    if (!isSelected(seat) && !canAddSeat) return; // ❗ Ліміт 10 місць

    if (isSelected(seat)) {
      setSelectedSeats((prev) =>
        prev.filter((s) => !(s.row === seat.row && s.number === seat.number))
      );
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  const totalTickets = selectedSeats.length;

  const totalPrice = selectedSeats.reduce(
    (sum, seat) => sum + (seat.price || 0),
    0
  );

  const clearSeats = () => {
    setSelectedSeats([]);
    localStorage.removeItem("selectedSeats"); // 🔄 чистимо й кеш
  };

  return (
    <BookingContext.Provider
      value={{
        selectedSeats,
        toggleSeat,
        isSelected,
        totalTickets,
        totalPrice,
        clearSeats,
        canAddSeat: selectedSeats.length < 10,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}


