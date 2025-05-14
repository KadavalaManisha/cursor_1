import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Symptoms from './pages/Symptoms';
import Treatments from './pages/Treatments';
import Lifestyle from './pages/Lifestyle';
import Resources from './pages/Resources';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/symptoms" element={<Symptoms />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/lifestyle" element={<Lifestyle />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          PCOS Awareness
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/symptoms" className="nav-link" onClick={toggleMenu}>
              Symptoms
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/treatments" className="nav-link" onClick={toggleMenu}>
              Treatments
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/lifestyle" className="nav-link" onClick={toggleMenu}>
              Lifestyle
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/resources" className="nav-link" onClick={toggleMenu}>
              Resources
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={toggleMenu}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
.navbar {
  background: linear-gradient(to right, #ff6b6b, #ff8e8e);
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
}

.navbar-logo {
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.nav-menu {
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -24px;
}

.nav-item {
  height: 80px;
  display: flex;
  align-items: center;
}

.nav-link {
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #ffd700;
  transform: translateY(-2px);
}

.menu-icon {
  display: none;
  color: #fff;
  font-size: 1.8rem;
  cursor: pointer;
}

@media screen and (max-width: 960px) {
  .nav-menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 80px;
    left: -100%;
    opacity: 1;
    transition: all 0.5s ease;
    background: linear-gradient(to right, #ff6b6b, #ff8e8e);
  }

  .nav-menu.active {
    left: 0;
    opacity: 1;
    transition: all 0.5s ease;
    z-index: 1;
  }

  .nav-item {
    height: 60px;
    width: 100%;
  }

  .nav-link {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;
  }

  .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffd700;
    transform: none;
  }

  .menu-icon {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
}
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Understanding PCOS</h1>
          <p>Empowering women with knowledge about Polycystic Ovary Syndrome</p>
          <Link to="/symptoms" className="cta-button">
            Learn More
          </Link>
        </div>
      </section>

      <section className="info-cards">
        <div className="card">
          <i className="fas fa-info-circle"></i>
          <h3>What is PCOS?</h3>
          <p>PCOS is a hormonal disorder common among women of reproductive age. Women with PCOS may have infrequent or prolonged menstrual periods or excess male hormone (androgen) levels.</p>
        </div>

        <div className="card">
          <i className="fas fa-exclamation-triangle"></i>
          <h3>Why It Matters</h3>
          <p>PCOS affects 8-13% of women worldwide and is a leading cause of infertility. Early diagnosis and treatment can reduce the risk of long-term complications.</p>
        </div>

        <div className="card">
          <i className="fas fa-heartbeat"></i>
          <h3>Health Impact</h3>
          <p>PCOS can lead to various health issues including type 2 diabetes, high blood pressure, heart problems, and endometrial cancer if left untreated.</p>
        </div>
      </section>

      <section className="key-features">
        <h2>Key Features of Our Platform</h2>
        <div className="features-grid">
          <div className="feature">
            <i className="fas fa-book-medical"></i>
            <h4>Comprehensive Information</h4>
            <p>Detailed guides about symptoms, diagnosis, and treatment options</p>
          </div>
          <div className="feature">
            <i className="fas fa-users"></i>
            <h4>Support Community</h4>
            <p>Connect with others who understand your journey</p>
          </div>
          <div className="feature">
            <i className="fas fa-utensils"></i>
            <h4>Lifestyle Tips</h4>
            <p>Diet and exercise recommendations for managing PCOS</p>
          </div>
          <div className="feature">
            <i className="fas fa-calendar-check"></i>
            <h4>Treatment Tracker</h4>
            <p>Tools to help you monitor your symptoms and progress</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Take Control of Your Health</h2>
        <p>Start your journey to better health today</p>
        <div className="cta-buttons">
          <Link to="/symptoms" className="cta-button">Learn About Symptoms</Link>
          <Link to="/treatments" className="cta-button secondary">Explore Treatments</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
.home {
  width: 100%;
  overflow-x: hidden;
}

/* Hero Section */
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('/images/hero-bg.jpg') center/cover no-repeat;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 0 20px;
}

.hero-content {
  max-width: 800px;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  animation: fadeInDown 1s ease;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease;
}

/* Info Cards Section */
.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  background-color: #f8f9fa;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  text-align: center;
}

.card:hover {
  transform: translateY(-5px);
}

.card i {
  font-size: 2.5rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
}

.card h3 {
  color: #333;
  margin-bottom: 1rem;
}

.card p {
  color: #666;
  line-height: 1.6;
}

/* Key Features Section */
.key-features {
  padding: 4rem 2rem;
  background-color: white;
}

.key-features h2 {
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature {
  text-align: center;
  padding: 2rem;
  border-radius: 10px;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
}

.feature:hover {
  background-color: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.feature i {
  font-size: 2rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
}

.feature h4 {
  color: #333;
  margin-bottom: 1rem;
}

.feature p {
  color: #666;
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(to right, #ff6b6b, #ff8e8e);
  color: white;
  text-align: center;
  padding: 4rem 2rem;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: white;
  color: #ff6b6b;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cta-button.secondary {
  background-color: transparent;
  border: 2px solid white;
  color: white;
}

/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media screen and (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1.2rem;
  }

  .info-cards {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .cta-button {
    width: 100%;
    text-align: center;
  }
}