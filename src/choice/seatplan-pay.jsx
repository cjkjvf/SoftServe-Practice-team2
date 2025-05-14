import HeaderSeatplan from "./choiceComponents/HeaderSeatplan";
import MovieInfo from "./choiceComponents/MovieInfo"; // ⬅️ додано
import "./choiceStyles/SelectPayment.css"; // стилі layout

export default function SeatPlanPay() {
  return (
    <>
      <HeaderSeatplan />
      <main className="seatplan-wrapper">
        <div className="left-content">
          <MovieInfo /> 
        </div>

        <div className="right-summary">
          {/* Сюди буде TicketSummary */}
        </div>
      </main>
    </>
  );
}
