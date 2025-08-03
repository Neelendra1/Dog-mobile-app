import React, { useState } from "react";

const mockBookings = [
  { id: 1, service: "Dog Walking", city: "Pune", status: "Confirmed", date: "2025-07-27" },
  { id: 2, service: "Pet Sitting", city: "Mumbai", status: "Pending", date: "2025-07-28" }
];

const BookingTracking = () => {
  const [bookings] = useState(mockBookings);

  return (
    <div>
      <h2>Booking Tracking</h2>
      <ul>
        {bookings.map(b => (
          <li key={b.id}>
            {b.service} in {b.city} on {b.date} - <b>{b.status}</b>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingTracking;
