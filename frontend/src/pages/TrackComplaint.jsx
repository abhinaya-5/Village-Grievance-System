import { useState } from "react";
import "./TrackComplaint.css";

function TrackComplaint() {
  const [complaintId, setComplaintId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!complaintId) {
      setError("Please enter a complaint ID.");
      setComplaint(null);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/complaints/${complaintId}`
      );

      const data = await response.json();

      if (response.ok) {
        setComplaint(data);
        setError("");
      } else {
        setComplaint(null);
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setComplaint(null);
      setError("Cannot connect to the backend.");
    }
  };

  return (
    <main className="track-page">
      <div className="track-container">

        <h1>Track Your Complaint</h1>

        <p className="track-description">
          Enter your complaint ID to check the current status.
        </p>

        <div className="track-input-area">

          <input
            className="track-input"
            type="number"
            placeholder="Enter Complaint ID"
            value={complaintId}
            onChange={(e) => setComplaintId(e.target.value)}
          />

          <button
            className="track-button"
            onClick={handleTrack}
          >
            Track Complaint
          </button>

        </div>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {complaint && (
          <div className="complaint-details">

            <h2>Complaint Details</h2>

            <div className="detail-row">
              <span className="detail-label">Complaint ID</span>
              <span className="detail-value">
                {complaint.id}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Title</span>
              <span className="detail-value">
                {complaint.title}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Category</span>
              <span className="detail-value">
                {complaint.category}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Description</span>
              <span className="detail-value">
                {complaint.description}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Village</span>
              <span className="detail-value">
                {complaint.village}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Location</span>
              <span className="detail-value">
                {complaint.location}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Status</span>

              <span className="detail-value status-pending">
                {complaint.status}
              </span>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}

export default TrackComplaint;