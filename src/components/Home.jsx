import React from 'react'
import GameStore from './GameStore/GameStore'
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const Home = () => {

  return (
    <div className="container">
        <Navbar />
        <GameStore />
        <Footer />
    </div>
  )
}

export default Home