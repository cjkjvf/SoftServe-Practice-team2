import React from "react";
import { useBooking } from "../choiceContext/BookingContext";
import "../choiceStyles/SeatGrid.css";
import seatsData from "../../data/seats.json";

export default function SeatGrid() {
  const { toggleSeat, isSelected } = useBooking();

  return (
    <div className="seat-grid">
      {seatsData.map((row, rowIndex) => {
        if (!row.some(seat => seat !== 0)) return null;

        let visibleSeatCounter = 0;

        return (
          <div key={rowIndex} className="seat-row">
            {row.map((seatType, seatIndex) => {
              if (seatType === 0) {
                return <div key={`r${rowIndex}-s${seatIndex}`} className="seat hidden"></div>;
              }

              visibleSeatCounter++;

              const seat = {
                row: rowIndex + 1,
                number: visibleSeatCounter,
                price: seatType === 2 ? 400 : 200,
                type: seatType,
              };

              const seatClass = `${seat.type === 2 ? "lux" : "good"} ${
                isSelected(seat) ? "selected" : ""
              }`;

              return (
                <div
                  key={`r${rowIndex}-s${seatIndex}`}
                  className={`seat ${seatClass}`}
                  onClick={() => toggleSeat(seat)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
