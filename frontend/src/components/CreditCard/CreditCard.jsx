import "./CreditCard.css";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CreditCard() {
  const [card, setCard] = useState(null);

  useEffect(() => {
    fetchCard();
  }, []);

  const fetchCard = async () => {
    try {
      const res = await api.get("/cards");

      console.log(res.data);

      setCard(res.data.cards[0]);
      
    } catch (err) {
      console.log(err);
    }
};
  return (
    <div className="card-universe-wrapper">
      <div className="parallax-container">
        <div className="tracker tr-1"></div>
        <div className="tracker tr-2"></div>
        <div className="tracker tr-3"></div>
        <div className="tracker tr-4"></div>
        <div className="tracker tr-5"></div>
        <div className="tracker tr-6"></div>
        <div className="tracker tr-7"></div>
        <div className="tracker tr-8"></div>
        <div className="tracker tr-9"></div>

        <div className="tilt-card">
          <div className="glare"></div>

          <div className="card-front">
            <div className="card-header">
              <div className="brand-logo">
                <svg
                  viewBox="0 0 100 70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4"
                    y="4"
                    width="92"
                    height="62"
                    rx="14"
                    fill="#E8E8E8"
                    stroke="#D1D1D1"
                    strokeWidth="6"
                  />

                  <rect
                    x="30"
                    y="30"
                    width="40"
                    height="10"
                    rx="5"
                    fill="#4A4A4A"
                  />

                  <path
                    d="M96 35 C75 35 65 45 65 66 L82 66 C89.7 66 96 59.7 96 52 Z"
                    fill="#F27800"
                  />
                </svg>
              </div>

              <div className="nfc-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M12 2v20M17 5c2.5 3 2.5 11 0 14M21 2c4 4 4 16 0 20M7 5c-2.5 3-2.5 11 0 14M3 2c-4 4-4 16 0 20" />
                </svg>
              </div>
            </div>

            <div className="chip-container">
              <div className="chip">
                <div className="chip-line"></div>
                <div className="chip-line"></div>
                <div className="chip-line"></div>
                <div className="chip-main"></div>
              </div>

              <div className="card-type">{card?.card_type}</div>
            </div>

            <div className="card-numbers embossed">
              <span>{card?.card_number  ? `${card.card_number.slice(0,4)} ${card.card_number.slice(4,8)} ${card.card_number.slice(8,12)} ${card.card_number.slice(12)}` : "Loading..."}
              </span>
            </div>

            <div className="card-footer">
              <div className="cardholder">
                <div className="label">CARDHOLDER</div>
                <div className="value embossed">{card?.holder_name || "Loading..."}</div>
              </div>

              <div className="valid-thru">
                <div className="label">VALID THRU</div>
                <div className="value embossed">{card?.expiry_date? new Date(card.expiry_date).toLocaleDateString("en-US", {    month: "2-digit",  year: "2-digit", }): "--/--"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}