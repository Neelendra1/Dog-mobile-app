import React, { useState } from "react";

const mockOffers = [
  { code: "DOG10", desc: "10% off on first booking" },
  { code: "PETCAB", desc: "₹50 off on cab for pet travel" }
];

const OffersLoyalty = () => {
  const [applied, setApplied] = useState("");
  const [loyalty, setLoyalty] = useState(120); // Example points
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const handleApply = () => {
    const offer = mockOffers.find(o => o.code === input.trim().toUpperCase());
    if (offer) {
      setApplied(offer.code);
      setMessage(`Offer applied: ${offer.desc}`);
    } else {
      setMessage("Invalid promo code");
    }
    setInput("");
  };

  return (
    <div>
      <h2>Offers & Loyalty Program</h2>
      <h3>Promo Codes</h3>
      <ul>
        {mockOffers.map(o => (
          <li key={o.code}><b>{o.code}</b>: {o.desc}</li>
        ))}
      </ul>
      <input type="text" placeholder="Enter promo code" value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleApply}>Apply</button>
      {message && <p>{message}</p>}
      <h3>Loyalty Points</h3>
      <p>You have <b>{loyalty}</b> points.</p>
      <p>Earn points for every booking and redeem for discounts!</p>
    </div>
  );
};

export default OffersLoyalty;
