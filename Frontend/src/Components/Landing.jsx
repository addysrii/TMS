import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';

const LandingPage = () => {
  const heroAnimation = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 } });
  const featureAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
    delay: 500,
  });
  const howItWorksAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
    delay: 1000,
  });
  const testimonialsAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
    delay: 1500,
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white text-center py-20">
        <animated.div style={heroAnimation}>
          <h1 className="text-4xl font-bold animate__animated animate__fadeIn">Welcome to EventMaster</h1>
          <p className="text-lg mt-4 animate__animated animate__fadeIn animate__delay-1s">
            Your all-in-one event ticket management solution.
          </p>
          <Link
            to="/register"
            className="bg-yellow-500 text-gray-800 px-6 py-3 mt-6 inline-block rounded shadow hover:bg-yellow-400 transition-transform transform hover:scale-105"
          >
            Get Started
          </Link>
        </animated.div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <animated.div style={featureAnimation}>
            <h2 className="text-3xl font-bold text-center mb-8 animate__animated animate__fadeIn">
              Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
                <h3 className="text-xl font-semibold mb-4">Easy Ticketing</h3>
                <p>Seamlessly manage and sell tickets for your events with our intuitive system.</p>
              </div>
              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
                <h3 className="text-xl font-semibold mb-4">Real-time Analytics</h3>
                <p>Get real-time insights and reports to track ticket sales and event performance.</p>
              </div>
              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
                <h3 className="text-xl font-semibold mb-4">Customizable Events</h3>
                <p>Customize your events with different ticket types, pricing, and more.</p>
              </div>
            </div>
          </animated.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-200 py-16 px-4">
        <div className="container mx-auto">
          <animated.div style={howItWorksAnimation}>
            <h2 className="text-3xl font-bold text-center mb-8 animate__animated animate__fadeIn">
              How It Works
            </h2>
            <div className="text-center">
              <p className="mb-4 animate__animated animate__fadeIn animate__delay-1s">
                Follow these simple steps to get started with EventMaster:
              </p>
              <ol className="list-decimal list-inside mx-auto text-left max-w-md">
                <li className="mb-2">Sign up for an account.</li>
                <li className="mb-2">Create and customize your events.</li>
                <li className="mb-2">Start selling tickets and manage your events.</li>
              </ol>
            </div>
          </animated.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <animated.div style={testimonialsAnimation}>
            <h2 className="text-3xl font-bold text-center mb-8 animate__animated animate__fadeIn">
              What Our Users Say
            </h2>
            <div className="text-center">
              <p className="italic mb-4 animate__animated animate__fadeIn animate__delay-1s">
                "EventMaster has transformed the way we manage our events. The system is user-friendly and efficient!"
              </p>
              <p>- Jane Doe, Event Organizer</p>
            </div>
          </animated.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-8 text-center">
        <p>&copy; 2024 EventMaster. All rights reserved.</p>
        <p>
          Follow us on <a href="#" className="underline">Social Media</a>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
