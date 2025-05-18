import React from "react";
import "../choiceStyles/ScreenIndicator.css";

// Кольори для типів місць (за домовленістю)
const typeColors = {
  "GOOD": "#3981d3",
  "SUPER LUX": "#f79256"
};

export default function ScreenIndicator() {
  const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
  const seatPrices = selectedMovie?.seatPrices || [];

  return (
    <div className="screen-wrapper">
      <div className="seat-types">
        {seatPrices.map((type, index) => (
          <div key={index} className="seat-type">
            <span
              className="seat-box"
              style={{ backgroundColor: typeColors[type.type] || "#ccc" }}
            ></span>
            <span>
              {type.type} — {type.price} грн
            </span>
          </div>
        ))}
      </div>

      <div className="screen-curve"></div>
      <div className="screen-label">ЕКРАН</div>
    </div>
  );
}

