import React, { useEffect, useState } from "react";

function Dashboard() {
  const [stats, setStats] = useState({ assignments: 0, events: 0, gallery: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:5000/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="card">Assignments: {stats.assignments}</div>
        <div className="card">Events: {stats.events}</div>
        <div className="card">Gallery: {stats.gallery}</div>
      </div>
    </div>
  );
}

export default Dashboard;
