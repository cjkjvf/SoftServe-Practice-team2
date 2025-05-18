// ✅ choiceContext/BookingContext.jsx
import { createContext, useContext, useState } from "react";

// Створюємо контекст для бронювання місць
const BookingContext = createContext();

// Кастомний хук для зручного доступу до контексту
export const useBooking = () => useContext(BookingContext);

// Провайдер, який обгортає компоненти та надає функції та дані
export default function BookingProvider({ children }) {
  // Стан для збереження вибраних місць
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Перевіряє, чи місце вже вибране користувачем
  const isSelected = (seat) =>
    selectedSeats.some((s) => s.row === seat.row && s.number === seat.number);

  // Додає або видаляє місце зі списку вибраних
  const toggleSeat = (seat) => {
    if (isSelected(seat)) {
      // Якщо вже вибране — видаляємо
      setSelectedSeats((prev) =>
        prev.filter((s) => !(s.row === seat.row && s.number === seat.number))
      );
    } else {
      // Якщо не вибране — додаємо
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  // Підрахунок загальної кількості вибраних квитків
  const totalTickets = selectedSeats.length;

  // Підрахунок загальної суми за вибрані місця
  const totalPrice = selectedSeats.reduce(
    (sum, seat) => sum + (seat.price || 0),
    0
  );

  // Очищення всіх вибраних місць (наприклад, після оплати)
  const clearSeats = () => setSelectedSeats([]);

  // Обмеження кількості місць (до 10)
  const canAddSeat = selectedSeats.length < 10;

  return (
    <BookingContext.Provider
      value={{
        selectedSeats,     // Масив вибраних місць
        toggleSeat,        // Функція для додавання/видалення місця
        isSelected,        // Функція перевірки вибраності
        totalTickets,      // Кількість вибраних місць
        totalPrice,        // Загальна сума
        clearSeats,        // Очищення місць
        canAddSeat         // Чи можна ще додати місце
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}


