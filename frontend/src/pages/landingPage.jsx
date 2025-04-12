import React from 'react';
import { 
  Calendar, 
  BookmarkPlus, 
  ShoppingCart, 
  Heart, 
  MapPin, 
  Brain,
  ChevronRight
} from 'lucide-react';

const styles = {
  nav: {
    backgroundColor: 'white',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  navContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '4rem',
  },
  navLogo: {
    display: 'flex',
    alignItems: 'center',
  },
  navLogoText: {
    marginLeft: '0.5rem',
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1a1a1a',
  },
  navButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    '&:hover': {
      backgroundColor: '#45a049',
    },
  },
  hero: {
    position: 'relative',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  heroContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '4rem 1rem',
    textAlign: 'center',
    '@media (min-width: 1024px)': {
      textAlign: 'left',
      padding: '6rem 1rem',
    },
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 800,
    lineHeight: 1.2,
    marginBottom: '1.5rem',
  },
  heroTitleSpan: {
    display: 'block',
  },
  heroTitleGreen: {
    display: 'block',
    color: '#4CAF50',
  },
  heroDescription: {
    fontSize: '1.125rem',
    color: '#666',
    maxWidth: '36rem',
    margin: '1.5rem auto',
    '@media (min-width: 1024px)': {
      margin: '1.5rem 0',
    },
  },
  features: {
    padding: '3rem 1rem',
    backgroundColor: '#f9fafb',
  },
  featuresContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  featuresHeader: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  featuresTitle: {
    fontSize: '2.25rem',
    fontWeight: 800,
    color: '#1a1a1a',
    marginBottom: '1rem',
  },
  featuresSubtitle: {
    fontSize: '1.125rem',
    color: '#666',
  },
  featuresGrid: {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: 'repeat(1, 1fr)',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  featureContent: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  featureIcon: {
    color: '#4CAF50',
    flexShrink: 0,
  },
  featureText: {
    marginLeft: '1rem',
  },
  featureTitle: {
    fontSize: '1.125rem',
    fontWeight: 500,
    color: '#1a1a1a',
    marginBottom: '0.5rem',
  },
  featureDescription: {
    fontSize: '0.875rem',
    color: '#666',
  },
  cta: {
    backgroundColor: '#4CAF50',
    padding: '4rem 1rem',
  },
  ctaContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
    '@media (min-width: 1024px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  ctaTitle: {
    fontSize: '2.25rem',
    fontWeight: 800,
    color: 'white',
    lineHeight: 1.2,
  },
  ctaSubtitle: {
    color: '#e8f5e9',
    marginTop: '0.5rem',
  },
  ctaButton: {
    backgroundColor: 'white',
    color: '#4CAF50',
    padding: '0.75rem 1.25rem',
    borderRadius: '0.5rem',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
};

function LandingPage() {
  return (
    <div>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div style={styles.navContent}>
            <div style={styles.navLogo}>
              <Calendar style={{ color: '#4CAF50', height: '2rem', width: '2rem' }} />
              <span style={styles.navLogoText}>MealPrep</span>
            </div>
            <div style={styles.navButtons}>
              <button style={styles.button}>Login</button>
              <button style={{ ...styles.button, ...styles.primaryButton }}>Sign Up</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContainer}>
          <h1 style={styles.heroTitle}>
            <span style={styles.heroTitleSpan}>Simplify your</span>
            <span style={styles.heroTitleGreen}>meal planning journey</span>
          </h1>
          <p style={styles.heroDescription}>
            Plan your meals, generate shopping lists, and eat healthy with our intuitive meal planning platform. Save time and stay organized.
          </p>
          <button style={{ ...styles.button, ...styles.primaryButton }}>
            Start Planning
            <ChevronRight style={{ marginLeft: '0.5rem', height: '1.25rem', width: '1.25rem' }} />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.features}>
        <div style={styles.featuresContainer}>
          <div style={styles.featuresHeader}>
            <h2 style={styles.featuresTitle}>Everything you need to plan your meals</h2>
            <p style={styles.featuresSubtitle}>A complete solution for your meal planning needs</p>
          </div>

          <div style={styles.featuresGrid}>
            {/* Meal Library */}
            <div style={styles.featureCard}>
              <div style={styles.featureContent}>
                <BookmarkPlus style={styles.featureIcon} />
                <div style={styles.featureText}>
                  <h3 style={styles.featureTitle}>Meal Library</h3>
                  <p style={styles.featureDescription}>
                    Save your favorite meals and their ingredients for easy future use.
                  </p>
                </div>
              </div>
            </div>

            {/* Weekly Meal Scheduler */}
            <div style={styles.featureCard}>
              <div style={styles.featureContent}>
                <Calendar style={styles.featureIcon} />
                <div style={styles.featureText}>
                  <h3 style={styles.featureTitle}>Weekly Meal Scheduler</h3>
                  <p style={styles.featureDescription}>
                    Drag and drop meals into a weekly calendar.
                  </p>
                </div>
              </div>
            </div>

            {/* Grocery List Generator */}
            <div style={styles.featureCard}>
              <div style={styles.featureContent}>
                <ShoppingCart style={styles.featureIcon} />
                <div style={styles.featureText}>
                  <h3 style={styles.featureTitle}>Grocery List Generator</h3>
                  <p style={styles.featureDescription}>
                    Automatically generate grocery lists each week.
                  </p>
                </div>
              </div>
            </div>

            {/* Diet Recommendations */}
            <div style={styles.featureCard}>
              <div style={styles.featureContent}>
                <Heart style={styles.featureIcon} />
                <div style={styles.featureText}>
                  <h3 style={styles.featureTitle}>Personalized Diet</h3>
                  <p style={styles.featureDescription}>
                    Get meal suggestions tailored to your goals.
                  </p>
                </div>
              </div>
            </div>

            {/* Store Locator */}
            <div style={styles.featureCard}>
              <div style={styles.featureContent}>
                <MapPin style={styles.featureIcon} />
                <div style={styles.featureText}>
                  <h3 style={styles.featureTitle}>Store Locator</h3>
                  <p style={styles.featureDescription}>
                    Find nearby stores with needed ingredients.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Meal Ideas */}
            <div style={styles.featureCard}>
              <div style={styles.featureContent}>
                <Brain style={styles.featureIcon} />
                <div style={styles.featureText}>
                  <h3 style={styles.featureTitle}>AI Meal Ideas</h3>
                  <p style={styles.featureDescription}>
                    Get creative meal inspiration powered by AI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={styles.cta}>
        <div style={styles.ctaContainer}>
          <h2 style={styles.ctaTitle}>
            <span>Ready to start planning?</span>
            <span style={styles.ctaSubtitle}>Join thousands of happy meal preppers today.</span>
          </h2>
          <button style={styles.ctaButton}>Get started</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;