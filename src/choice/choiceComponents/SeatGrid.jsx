import React from "react";
import { useBooking } from "../choiceContext/BookingContext";
import "../choiceStyles/SeatGrid.css";
import seatsData from "../../data/seats.json";
import pricingData from "../../data/pricing.json";

export default function SeatGrid() {
  const { toggleSeat, isSelected } = useBooking();

  const getPriceByType = (type) => {
    const found = pricingData.find((item) =>
      type === 2 ? item.name === "SUPER_LUX" : item.name === "GOOD"
    );
    return found ? found.price : 0;
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
                return <div key={`r${rowIndex}-s${seatIndex}`} className="seat hidden"></div>;
              }

              visibleSeatCounter++;

              const seat = {
                row: rowIndex + 1,
                number: visibleSeatCounter,
                price: getPriceByType(seatType),
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