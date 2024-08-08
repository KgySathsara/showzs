import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../container/header/Header'
import Stream from '../../components/stream/Stream'
import Events from '../../components/events/Events'
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <section>
            <Navbar/> 
            <Header/>
            <Stream/>
            <Events/>
            <Footer/>           
    </section>
  )
}

export default Home;