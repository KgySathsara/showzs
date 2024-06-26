import React from 'react';
import './header.css';
import people from '../../assest/people.png';
import ai from '../../assest/header.png';

const Header = () => {
  return (
    <div className='gpt3__header section__padding' id='home'>
      <div className='gpt3__header-content'>
        <h1 className='gradient_text'>Let's Enjoy Movies, Premiere Movie Destination</h1>
        
        <p>Welcome to HYDE, where cinematic magic meets modern comfort. 
          Our movie theater is more than just a place to watch films; it's an immersive entertainment 
          destination for movie lovers of all ages. </p>

        <div className='gpt3__header-content__people'>
          <img src={people} alt='people'/>
          <p>1600 people requested access a visit in 24 houres</p>
        </div>
      </div>
      
      <div className='gpt3__header-image'>
          <img src={ai} alt="ai" />
      </div>
    </div>
  )
}

export default Header