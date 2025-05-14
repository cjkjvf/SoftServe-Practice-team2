import { createContext, useContext, useState } from "react";

// Створюємо контекст
const BookingContext = createContext();

// Кастомний хук для доступу
export const useBooking = () => useContext(BookingContext);

// Провайдер
export default function BookingProvider({ children }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // 🔄 Перевірка: чи це місце вже вибране
  const isSelected = (seat) =>
    selectedSeats.some(
      (s) => s.row === seat.row && s.number === seat.number
    );

  // 🎯 Додати або зняти місце
  const toggleSeat = (seat) => {
    if (isSelected(seat)) {
      setSelectedSeats((prev) =>
        prev.filter(
          (s) => !(s.row === seat.row && s.number === seat.number)
        )
      );
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  // 🔢 Підрахунок загальної кількості квитків
  const totalTickets = selectedSeats.length;

  // 💰 Підрахунок загальної вартості
  const totalPrice = selectedSeats.reduce(
    (sum, seat) => sum + (seat.price || 0),
    0
  );

  // 🔁 Очистити всі місця (після таймера/оплати)
  const clearSeats = () => setSelectedSeats([]);

  // ✨ Якщо захочеш — легко додати ліміт:
  const canAddSeat = selectedSeats.length < 10;

  return (
    <BookingContext.Provider
      value={{
        selectedSeats,
        toggleSeat,
        isSelected,
        totalTickets,
        totalPrice,
        clearSeats,
        canAddSeat, // поки не використовуємо, але можна
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

