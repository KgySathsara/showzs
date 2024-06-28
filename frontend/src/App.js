import React from 'react';
import { Footer, Stream, Header , Events } from './containers';
import { Navbar } from './components';
import './App.css';

const App = () => {
  return (
    <div className='App'>
        <div className='gradient_bg'>
          <Navbar/>
          <Header/>
        </div>
        <Stream/>
        <Events/>
        <Footer/>
    </div>
  )
}

export default App