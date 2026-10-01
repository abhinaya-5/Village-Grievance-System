import "./Navbar.css";

function Navbar({ goToHome, goToRegister, goToLogin }) {
  return (
    <nav className="navbar">
      <h2 className="logo">VGS</h2>

      <div className="nav-links">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            goToHome();
          }}
        >
          Home
        </a>

        <a
          href="#login"
          onClick={(e) => {
            e.preventDefault();
            goToLogin();
          }}
        >
          Login
        </a>

        <a
          href="#register"
          onClick={(e) => {
            e.preventDefault();
            goToRegister();
          }}
        >
          Register
        </a>
      </div>
    </nav>
  );
}

export default Navbar;