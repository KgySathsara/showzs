import React from 'react';
import './features.css'
import Cinema from '../features/cinema1.jpg';

const Features = () => {
  return (
    <div className='main_f'>
        <h1>Theaters</h1>
        <p><span>❝</span>Modern cinema theaters have evolved into immersive entertainment hubs that cater to a diverse range of moviegoers. 
          These state-of-the-art venues offer cutting-edge technology, such as high-definition digital projection, crystal-clear
           surround sound systems, and even 3D and IMAX experiences, creating a visually and audibly captivating atmosphere. Comfort 
           is a top priority, with plush, reclining seats that often come with reserved seating options, ensuring a stress-free and 
           enjoyable viewing experience.<span>❞</span></p>

        <div className='container_f'>
          <div className="banner_f">
              <img src={Cinema} alt="" />
          </div>

          <div className="info_f">
              <h1>Cinema 1</h1>
              <h2>Walking through the new HYDE main entrance, on Colombo 1, takes you to the main lobby with the Box Office on the left 
                and Cinema 1 on the right. C1 is a state-of-art modern cinema showcasing an immersive, unparallel Dolby Atmos surround sound 
                experience coupled with ultra-bright 4K projection with 3D capability. C1 seats 135 viewers and prides itself in having seating 
                accessibility for wheelchairs.</h2>
          </div>
        </div>
    </div>
  )
}

export default Features;