import React, { useState } from "react";

function Assignments() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filePath, setFilePath] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // JWT from login

    const res = await fetch("http://127.0.0.1:5000/api/assignments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // send JWT
      },
      body: JSON.stringify({ title, description, file_path: filePath }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Assignment added successfully!");
      setTitle("");
      setDescription("");
      setFilePath("");
    } else {
      setMessage(data.msg || "Failed to add assignment");
    }
  };

  return (
    <div className="assignments-page">
      <h2>Add Assignment</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="File Path (optional)"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
        />
        <button type="submit">Add Assignment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Assignments;
