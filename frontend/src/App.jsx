
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SubmitComplaint from "./pages/SubmitComplaint";
import TrackComplaint from "./pages/TrackComplaint";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("home");
  };

  return (
    <div>
      <Navbar
        goToHome={() => setPage("home")}
        goToRegister={() => setPage("register")}
        goToLogin={() => setPage("login")}
      />

      {page === "home" && (
        <Home
          goToSubmit={() => setPage("submit")}
          goToTrack={() => setPage("track")}
        />
      )}

      {page === "register" && <Register />}

      {page === "login" && (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}

      {page === "dashboard" && user && (
        <UserDashboard
          user={user}
          goToSubmit={() => setPage("submit")}
          goToTrack={() => setPage("track")}
          onLogout={handleLogout}
        />
      )}

      {page === "submit" && (
        user ? (
          <SubmitComplaint user={user} />
        ) : (
          <div style={{ textAlign: "center", padding: "50px 20px" }}>
            <h2>Please log in to submit a complaint</h2>
            <p>Log in to your account before submitting a village complaint.</p>
            <button onClick={() => setPage("login")}>
              Login
            </button>
          </div>
        )
      )}

      {page === "track" && <TrackComplaint />}
    </div>
  );
}

export default App;