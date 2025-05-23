import React, { useEffect } from "react";
import HeaderSeatplan from "./choiceComponents/HeaderSeatplan";
import SeatGrid from "./choiceComponents/SeatGrid";
import { useBooking } from "./choiceContext/BookingContext";
import "./choiceStyles/TicketSummary.css";
import ScreenIndicator from "./choiceComponents/ScreenIndicator";
import MovieInfo from "./choiceComponents/MovieInfo";
import { useNavigate } from 'react-router-dom';

export default function SeatPlanPay() {
  const {
    selectedSeats,
    toggleSeat,
    totalTickets,
    totalPrice,
    clearSeats,
    confirmBooking,
    seatPrices
  } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      clearSeats();
    };
  }, [clearSeats]);

  const getTicketLabel = (count) => {
    if (count === 1) return "1 квиток";
    if (count >= 2 && count <= 4) return `${count} квитки`;
    return `${count} квитків`;
  };

  const getLabelByType = (type) => {
    const priceObj = seatPrices.find((p) =>
      type === 2 ? p.type === "SUPER LUX" : p.type === "GOOD"
    );
    return priceObj ? priceObj.type : "Невідомий тип";
  };

  const handlePayment = async () => {
    const success = await confirmBooking();
    if (success) {
      const seatsSummary = selectedSeats
        .map((seat) => `${seat.row} ряд ${seat.number} місце (${getLabelByType(seat.type)})`)
        .join(", ");
      const message = `Ви оплатили ${totalPrice} грн за місця: ${seatsSummary}`;
      alert(message);
      window.location.reload();
    } else {
      alert('Помилка бронювання. Спробуйте ще раз.');
    }
  };

  return (
    <>
      <HeaderSeatplan />
      <MovieInfo />

      <main className="seatplan-wrapper">
        <div className="left-content">
          <ScreenIndicator />
          <SeatGrid />
        </div>

        <div className="right-summary">
          <div className="right-summary-content">
            <div className="summary-top">
              <h3>Квитки</h3>
              <span>
                {getTicketLabel(totalTickets)}, {totalPrice} грн
              </span>
            </div>

            <div className="qr-box">
              <img src="/images/empty-state-scan.png" alt="QR-квиток" />
              <p>
                З онлайн квитком відразу в зал!
                <br />
                Друкувати не потрібно
              </p>
            </div>

            {selectedSeats.map((seat, index) => (
              <div key={index} className="ticket-item">
                <div className="seat-info">
                  <span>{seat.row} ряд</span>
                  <span>
                    {seat.number} місце{" "}
                    <span className={`seat-type ${seat.type === 2 ? "vip" : "good"}`}>
                      {getLabelByType(seat.type)}
                    </span>
                  </span>
                </div>
                <div className="price">{seat.price} грн</div>

                <button
                  className="remove-seat"
                  onClick={() => toggleSeat(seat)}
                  title="Скасувати місце"
                >
                  ✕
                </button>
              </div>
            ))}

            <hr className="divider" />

            <div className="total">
              <span>Всього до сплати:</span>
              <span className="total-price">{totalPrice} грн</span>
            </div>

            <button
              className="pay-btn"
              disabled={totalTickets === 0}
              onClick={handlePayment}
            >
              Оплатити сеанс
            </button>
          </div>
        </div>
      </main>
    </>
  );
}