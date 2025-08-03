import React, { useState } from "react";

const mockLiveBookings = [
  { id: 1, service: "Dog Walking", city: "Pune", status: "Walker en route", date: "2025-07-27" },
  { id: 2, service: "Pet Sitting", city: "Mumbai", status: "Pet Sitter arrived", date: "2025-07-28" }
];

const statusUpdates = [
  "Confirmed",
  "Walker en route",
  "Service started",
  "Service completed"
];

const LiveBookingTracking = () => {
  const [bookings, setBookings] = useState(mockLiveBookings);

  const handleStatusChange = (idx) => {
    const nextStatusIdx = (statusUpdates.indexOf(bookings[idx].status) + 1) % statusUpdates.length;
    const updatedBookings = [...bookings];
    updatedBookings[idx].status = statusUpdates[nextStatusIdx];
    setBookings(updatedBookings);
    // Browser notification
    if (window.Notification && Notification.permission === "granted") {
      new Notification(`Booking status updated: ${updatedBookings[idx].service} - ${updatedBookings[idx].status}`);
    }
  };

  // Request notification permission on mount
  React.useEffect(() => {
    if (window.Notification && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div>
      <h2>Live Booking Tracking</h2>
      <ul>
        {bookings.map((b, idx) => (
          <li key={b.id}>
            {b.service} in {b.city} on {b.date} - <b>{b.status}</b>
            <button onClick={() => handleStatusChange(idx)}>Update Status</button>
          </li>
        ))}
      </ul>
      <p>Enable browser notifications to get live updates!</p>
    </div>
  );
};

export default LiveBookingTracking;
