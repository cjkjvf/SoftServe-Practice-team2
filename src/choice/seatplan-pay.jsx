import HeaderSeatplan from "./choiceComponents/HeaderSeatplan";
import SeatGrid from "./choiceComponents/SeatGrid";
import { useBooking } from "./choiceContext/BookingContext";
import qrImage from "/src/assets/empty-state-scan.png";
import "./choiceStyles/TicketSummary.css";

export default function SeatPlanPay() {
  const { selectedSeats, toggleSeat, totalTickets, totalPrice } = useBooking();

  // Функція для правильної форми слова "квиток"
  const getTicketLabel = (count) => {
    if (count === 1) return "1 квиток";
    if (count >= 2 && count <= 4) return `${count} квитки`;
    return `${count} квитків`;
  };

  return (
    <>
      <HeaderSeatplan />

      <main className="seatplan-wrapper">
        <div className="left-content">
          <SeatGrid />
        </div>

        <div className="right-summary">
          <div className="right-summary-content">
            {/* Заголовок */}
            <div className="summary-top">
              <h3>Квитки</h3>
              <span>
                {getTicketLabel(totalTickets)}, {totalPrice} грн
              </span>
            </div>

            {/* QR-блок */}
            <div className="qr-box">
              <img src={qrImage} alt="QR-квиток" />
              <p>
                З онлайн квитком відразу в зал!
                <br />
                Друкувати не потрібно
              </p>
            </div>

            {/* Список квитків */}
            {selectedSeats.map((seat, index) => (
              <div key={index} className="ticket-item">
                <div className="seat-info">
                  <span>{seat.row} ряд</span>
                  <span>
                    {seat.number} місце{" "}
                    <span className={`seat-type ${seat.type === 2 ? "vip" : "good"}`}>
                      {seat.type === 2 ? "VIP" : "GOOD"}
                    </span>
                  </span>
                </div>
                <div className="price">{seat.price} грн</div>

                {/* Кнопка скасування */}
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

            <button className="pay-btn" disabled={totalTickets === 0}>
              Оплатити сеанс
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

