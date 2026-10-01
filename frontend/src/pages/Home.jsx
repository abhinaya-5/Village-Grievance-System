import "./Home.css";

function Home({ goToSubmit, goToTrack }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Making Villages Better, Together
          </h1>

          <p className="hero-description">
            Report local problems easily and track their resolution
            through our Village Grievance System.
          </p>

          <button
  className="hero-button"
  onClick={goToSubmit}
>
  Report a Problem
</button>
<button
  className="hero-button track-home-button"
  onClick={goToTrack}
>
  Track Complaint
</button>
        </div>
      </section>
      <section className="categories">
  <h2>What Can You Report?</h2>

  <div className="category-grid">
    <div className="category-card">
      <div className="category-icon">💧</div>
      <h3>Water Problems</h3>
      <p>Report water supply and drinking water issues.</p>
    </div>

    <div className="category-card">
      <div className="category-icon">💡</div>
      <h3>Street Lights</h3>
      <p>Report damaged or non-working street lights.</p>
    </div>

    <div className="category-card">
      <div className="category-icon">🛣️</div>
      <h3>Roads</h3>
      <p>Report potholes and damaged village roads.</p>
    </div>

    <div className="category-card">
      <div className="category-icon">🗑️</div>
      <h3>Garbage</h3>
      <p>Report garbage collection and waste problems.</p>
    </div>

    <div className="category-card">
      <div className="category-icon">🚰</div>
      <h3>Drainage</h3>
      <p>Report blocked drains and drainage problems.</p>
    </div>

    <div className="category-card">
      <div className="category-icon">⚡</div>
      <h3>Electricity</h3>
      <p>Report electricity and power-related issues.</p>
    </div>
  </div>
</section>
    </main>
  );
}

export default Home;