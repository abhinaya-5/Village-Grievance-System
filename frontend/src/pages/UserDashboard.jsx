
import "./UserDashboard.css";

function UserDashboard({ user, goToSubmit, goToTrack, onLogout }) {
  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <h1>
          Welcome, {user?.name || "User"}!
        </h1>

        <p className="dashboard-description">
          Welcome to your Village Grievance System dashboard.
          You can report village problems and track your complaints here.
        </p>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="dashboard-icon">📝</div>
            <h2>Submit Complaint</h2>
            <p>
              Report problems related to roads, water, garbage,
              street lights, and other village facilities.
            </p>
            <button onClick={goToSubmit}>
              Submit Complaint
            </button>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">🔎</div>
            <h2>Track Complaint</h2>
            <p>
              Check the current status of your submitted complaints.
            </p>
            <button onClick={goToTrack}>
              Track Complaint
            </button>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">👤</div>
            <h2>My Profile</h2>
            <p>
              View the account information associated with your login.
            </p>

            <div className="profile-info">
              <p><strong>Name:</strong> {user?.name || "User"}</p>
              <p><strong>Email:</strong> {user?.email || "Not available"}</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">🚪</div>
            <h2>Logout</h2>
            <p>
              Finish your session when you have completed your work.
            </p>
            <button className="logout-button" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UserDashboard;