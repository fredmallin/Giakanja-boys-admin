import React, { useState, useEffect } from "react";

function Gallery() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // Fetch all images
  const fetchImages = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/gallery/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Upload image
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Select a file first");

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://127.0.0.1:5000/api/gallery/", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Image uploaded successfully!");
      setFile(null);
      fetchImages();
    } else setMessage(data.msg || "Upload failed");
  };

  // Delete image
  const handleDelete = async (id) => {
    const res = await fetch(`http://127.0.0.1:5000/api/gallery/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) fetchImages();
  };

  return (
    <div className="gallery-page">
      <h2>Manage Gallery</h2>

      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      {message && <p>{message}</p>}

      <h3>All Images</h3>
      <div className="gallery-grid">
        {images.map((img) => (
          <div key={img.id} className="gallery-item">
            <img src={`http://127.0.0.1:5000/${img.file_path}`} alt={img.title || "Gallery"} />
            <button onClick={() => handleDelete(img.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
