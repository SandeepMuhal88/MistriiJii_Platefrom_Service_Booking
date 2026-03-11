import { Link } from 'react-router-dom';
import SEOHead from '../admin/components/SEOHead';
import './Home.css';

const Home = () => (
    <main className="home">
        <SEOHead
            title="MistriJii - Demand your service now"
            description="Book home services like electrician, AC repair, mechanic, and more at your doorstep."
        />

        {/* Hero Section */}
        <section className="hero">
            <div className="container">
                <h1>MistriJii - Demand your service now</h1>
                <p>Get professional home services delivered to your door.</p>
                <Link to="/booking" className="btn btn-primary">Book Service</Link>
            </div>
        </section>

        {/* Services Section */}
        <section className="services">
            <div className="container">
                <h2>Our Services</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <h3>Electrician</h3>
                        <p>Expert electrical services</p>
                    </div>
                    <div className="service-card">
                        <h3>AC Service</h3>
                        <p>Air conditioning repair and maintenance</p>
                    </div>
                    <div className="service-card">
                        <h3>Mechanic</h3>
                        <p>General mechanical repairs</p>
                    </div>
                    <div className="service-card">
                        <h3>Plumber</h3>
                        <p>Plumbing services</p>
                    </div>
                </div>
            </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works">
            <div className="container">
                <h2>How It Works</h2>
                <div className="steps">
                    <div className="step">
                        <h3>1. Book Service</h3>
                        <p>Fill out the booking form with your details.</p>
                    </div>
                    <div className="step">
                        <h3>2. Choose Date</h3>
                        <p>Select your preferred date and time.</p>
                    </div>
                    <div className="step">
                        <h3>3. Service Delivered</h3>
                        <p>Our professional arrives at your location.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
);

export default Home;
