import HeaderSeatplan from "./choiceComponents/HeaderSeatplan";
import "./choiceStyles/SelectPayment.css"; // тут  будуть стилі layout

export default function SeatPlanPay() {
  return (
    <>
      <HeaderSeatplan />
      <main className="seatplan-wrapper">
        <div className="left-content">
        </div>

        <div className="right-summary">
        </div>
      </main>
    </>
  );
}