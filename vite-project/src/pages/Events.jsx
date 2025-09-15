import React, { useState, useEffect } from "react";

function Events() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // Fetch all events
  const fetchEvents = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/events/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Add event
  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:5000/api/events/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, date, description }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Event added successfully!");
      setTitle(""); setDate(""); setDescription("");
      fetchEvents();
    } else setMessage(data.msg || "Failed to add event");
  };

  // Delete event
  const handleDelete = async (id) => {
    const res = await fetch(`http://127.0.0.1:5000/api/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) fetchEvents();
  };

  return (
    <div className="events-page">
      <h2>Manage Events</h2>

      <form onSubmit={handleAdd}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button type="submit">Add Event</button>
      </form>

      {message && <p>{message}</p>}

      <h3>All Events</h3>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <strong>{event.title}</strong> - {event.date} - {event.description}
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Events;
