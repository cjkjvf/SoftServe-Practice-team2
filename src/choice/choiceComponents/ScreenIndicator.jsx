import React from "react";
import pricingData from "../../data/pricing.json";
import "../choiceStyles/ScreenIndicator.css";

export default function ScreenIndicator() {
  return (
    <div className="screen-wrapper">
      <div className="seat-types">
        {pricingData.map((type) => (
          <div key={type.id} className="seat-type">
            <span
              className="seat-box"
              style={{ backgroundColor: type.color }}
            ></span>
            <span>{type.label}</span>
          </div>
        ))}
      </div>

      <div className="screen-curve"></div>
      <div className="screen-label">ЕКРАН</div>
    </div>
  );
}
