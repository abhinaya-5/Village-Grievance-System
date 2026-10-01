import { useState } from "react";
import "./SubmitComplaint.css";

function SubmitComplaint() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [village, setVillage] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const complaint = {
      title,
      category,
      description,
      village,
      location
    };

    try {
      const response = await fetch("http://localhost:5000/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(complaint)
      });

      const data = await response.text();

      if (response.ok) {
        alert("Complaint submitted successfully!");

        console.log("Complaint saved:", data);

        setTitle("");
        setCategory("");
        setDescription("");
        setVillage("");
        setLocation("");
      } else {
        alert("Failed to submit complaint.");
        console.error(data);
      }

    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Cannot connect to the backend.");
    }
  };

  return (
    <main className="complaint-page">
      <div className="complaint-container">

        <h1>Submit a Complaint</h1>

        <p>
          Tell us about the problem in your village.
        </p>

        <form
          className="complaint-form"
          onSubmit={handleSubmit}
        >

          <label>Complaint Title</label>

          <input
            type="text"
            placeholder="Example: Large pothole near school"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />


          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="water">Water</option>
            <option value="street-light">Street Lights</option>
            <option value="roads">Roads</option>
            <option value="garbage">Garbage</option>
            <option value="drainage">Drainage</option>
            <option value="electricity">Electricity</option>
          </select>


          <label>Description</label>

          <textarea
            placeholder="Describe the problem..."
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>


          <label>Village</label>

          <input
            type="text"
            placeholder="Enter your village name"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            required
          />


          <label>Location</label>

          <input
            type="text"
            placeholder="Example: Near Government School"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />


          <button type="submit">
            Submit Complaint
          </button>

        </form>

      </div>
    </main>
  );
}

export default SubmitComplaint;