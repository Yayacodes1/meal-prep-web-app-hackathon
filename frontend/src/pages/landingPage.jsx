import React from 'react';
import '../styles/landingPage.css';

const LandingPage = () => {
  return (
    <div>
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-content">
            <div className="nav-logo">
              <span className="nav-logo-text">Meal Prep App</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h1 className="hero-title">
            Welcome to <span className="hero-title-green">Meal Prep App</span>
          </h1>
          <p className="hero-description">
            Simplify your meal planning with our easy-to-use app.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <header className="features-header">
            <h2 className="features-title">Features</h2>
            <p className="features-subtitle">Everything you need to plan meals efficiently.</p>
          </header>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-content">
                <div className="feature-icon">🍎</div>
                <div className="feature-text">
                  <h3 className="feature-title">Healthy Recipes</h3>
                  <p className="feature-description">Discover nutritious meal ideas.</p>
                </div>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-content">
                <div className="feature-icon">📅</div>
                <div className="feature-text">
                  <h3 className="feature-title">Meal Planner</h3>
                  <p className="feature-description">Plan your meals for the week.</p>
                </div>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-content">
                <div className="feature-icon">🛒</div>
                <div className="feature-text">
                  <h3 className="feature-title">Shopping List</h3>
                  <p className="feature-description">Generate a shopping list instantly.</p>
                </div>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-content">
                <div className="feature-icon">📊</div>
                <div className="feature-text">
                  <h3 className="feature-title">Nutrition Tracking</h3>
                  <p className="feature-description">Track your daily nutrition intake.</p>
                </div>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-content">
                <div className="feature-icon">⏱️</div>
                <div className="feature-text">
                  <h3 className="feature-title">Quick Recipes</h3>
                  <p className="feature-description">Find recipes ready in under 30 minutes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta">
        <div className="cta-container">
          <h2 className="cta-title">Get Started Today</h2>
          <p className="cta-subtitle">Join thousands of users planning meals effortlessly.</p>
          <button className="cta-button">Sign Up</button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;