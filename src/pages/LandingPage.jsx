import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden pt-20">
        {/* Background with floating circles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-red-500/20"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 5}s linear infinite`,
                animationDelay: `-${Math.random() * 5}s`,
              }}
            />
          ))}
          <style jsx>{`
            @keyframes float {
              0% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(100px, 100px) rotate(90deg); }
              50% { transform: translate(0, 200px) rotate(180deg); }
              75% { transform: translate(-100px, 100px) rotate(270deg); }
              100% { transform: translate(0, 0) rotate(360deg); }
            }
          `}</style>
        </div>
  
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text">
              Shorten URLs
            </span>
            <span className="text-gray-900"> with Flik.io</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create short, shareable links in seconds. Sign up today to manage and track your URLs for free forever.
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  };

export default LandingPage;