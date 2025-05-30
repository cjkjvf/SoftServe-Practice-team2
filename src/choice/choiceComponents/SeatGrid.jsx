import React, { useEffect } from "react";
import { useBooking } from "../choiceContext/BookingContext";
import "../choiceStyles/SeatGrid.css";
import seatsData from "../../data/seats.json";

export default function SeatGrid() {
  const { toggleSeat, isSelected, isOccupied, seatPrices, occupiedSeats } = useBooking();

  // Дебагування: Логування зайнятих місць
  useEffect(() => {
    console.log('Зайняті місця в SeatGrid:', occupiedSeats);
  }, [occupiedSeats]);

  const getPriceByType = (type) => {
    const priceObj = seatPrices.find((p) =>
      type === 2 ? p.type === "SUPER LUX" : p.type === "GOOD"
    );
    return priceObj ? priceObj.price : 0;
  };

  return (
    <div className="seat-grid">
      {seatsData.map((row, rowIndex) => {
        if (!row.some((seat) => seat !== 0)) return null;

        let visibleSeatCounter = 0;

        return (
          <div key={rowIndex} className="seat-row">
            {row.map((seatType, seatIndex) => {
              if (seatType === 0) {
                return <div key={`r${rowIndex}-s${seatIndex}`} className="seat hidden" />;
              }

              visibleSeatCounter++;

              const seat = {
                row: rowIndex + 1,
                number: visibleSeatCounter,
                price: getPriceByType(seatType),
                type: seatType,
              };

              const isSeatOccupied = isOccupied(seat);
              const seatClass = `${seat.type === 2 ? "lux" : "good"} ${
                isSelected(seat) ? "selected" : ""
              } ${isSeatOccupied ? "occupied" : ""}`;

              return (
                <div
                  key={`r${rowIndex}-s${seatIndex}`}
                  className={`seat ${seatClass}`}
                  onClick={() => !isSeatOccupied && toggleSeat(seat)}
                  title={
                    isSeatOccupied
                      ? `Місце ${seat.row} ряд ${seat.number} зайнято`
                      : `Місце ${seat.row} ряд ${seat.number} (${
                          seat.type === 2 ? "SUPER LUX" : "GOOD"
                        }) - ${seat.price} грн`
                  }
                >
                  {isSeatOccupied && <span className="occupied-indicator">✕</span>}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}