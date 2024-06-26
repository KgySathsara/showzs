import React from 'react';
import { Footer, Features, WhatGPT3, Header } from './containers';
import { CTA, Brand, Navbar } from './components';
import './App.css';

const App = () => {
  return (
    <div className='App'>
        <div className='gradient_bg'>
          <Navbar/>
          <Header/>
        </div>

        <WhatGPT3/>
        <Features/>
        <Brand/>
        <CTA/>
        <Footer/>
    </div>
  )
}

export default App