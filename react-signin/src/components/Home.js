import React from 'react';
import Header from './Header';

const Home = () => {
  return (
    <>
    <Header/>
    <div className='row hero-page'>
      <div className='row'>
      <h2 className='green-text'>FootprintMate</h2>
      <p className='hero-paragraph'>"Together for a Greener Planet – Start Today with FootprintMate."</p>
      </div>
      <div className='row d-flex align-items-center justify-content-center'>
      <img src="/home.png" alt="Additional Image" className="home-img-01"/>
      </div>
    </div>

    <div className='row second-page'>
    <div className='second-paragraph'>
      Welcome to FootprintMate! Estimate your carbon footprint with our 
    quick quiz and get personalized insights. Track your progress and take actionable steps to 
    reduce your carbon footprint. Stay motivated with our gamified approach, embark on challenges, 
    earn awards, and join our eco-conscious community.
    </div>
    <div className='second-paragraph mt-4 mb-2'>
    Start your journey towards a greener future today with FootprintMate!
    </div>

    <div className='row d-flex align-items-center justify-content-center'>
    <button
    onClick={() => { window.location.href = "/dashboard"; }} className="btn-medium">Get Started
    </button>
    </div>
    </div>
    
    </>
  );
};

export default Home;
